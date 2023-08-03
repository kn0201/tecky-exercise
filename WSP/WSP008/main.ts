import express from "express";
import { print } from "listening-on";
import expressSession from "express-session";
import crypto from "crypto";
// import path from "path";
// import formidable from "formidable";
// import { mkdirSync } from "fs";
import jsonfile from "jsonfile";

// Basic Set UP
let app = express();
app.use(express.urlencoded());
app.use("/public", express.static("public"));

app.get("/", (req, res) => {
  res.redirect("/public");
});
// /

// #Serrion
declare module "express-session" {
  interface SessionData {
    counter: number;
  }
}
app.use(
  expressSession({
    resave: false,
    secret: crypto.randomBytes(32).toString("hex"),
    saveUninitialized: false,
  })
);
// /

app.use((req, res, next) => {
  let counter = req.session.counter || 0;
  counter++;
  req.session.counter = counter;
  console.log(`Request ${req.url}(${counter})`);
  next();
});

let memos = jsonfile.readFileSync("memos.json");

// try {
//   memos = jsonfile.readFileSync("memos.json");
// } catch (error) {}

app.get("/memos.js", (req, res) => {
  res.end(`let memos = ${JSON.stringify(memos)}`);
});

// /
app.listen(8080, () => {
  print(8080);
});
