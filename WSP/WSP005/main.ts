import express from "express";
// import { Request, Response } from "express";
import { print } from "listening-on";
import expressSession from "express-session";
import crypto from "crypto";
import dayjs from "dayjs";
import path from "path";

const app = express();

// app.use(express.static("public"));
// app.listen(8080, () => {
//   console.log("Ready");
//   console.log(`http://localhost:8080`);
// });

app.use(
  expressSession({
    resave: false,
    secret: crypto.randomBytes(32).toString("hex"),
    saveUninitialized: false,
  })
);

declare module "express-session" {
  interface SessionData {
    counter: number;
  }
}

app.use((req, res, next) => {
  let counter = req.session.counter || 0;
  counter++;
  req.session.counter = counter;
  let timestamp = dayjs().format("YYYY-MM-DD HH:mm:ss");
  console.log(`[${timestamp}] Request ${req.url} (${counter})`);
  next();
});

app.get("/", (req, res) => {
  res.redirect("/public");
});

app.use("/public", express.static("public"));

app.use((req, res) => {
  // res.redirect('/public/404.html')
  res.sendFile(path.resolve("public", "404.html"));
});

type Memo = {
  // id: number;
  content: string;
  postTime: number;
};

let memos: Memo[] = [];

app.get("/memos", (req, res) => {
  res.json(memos);
});

app.post("/memos", (req, res) => {
  memos.push({ content: "?", postTime: Date.now() });
});

app.listen(8080, () => {
  // console.log('ready')
  // console.log('listening on port 8080')
  // console.log('you can connect to this server at http://localhost:8080')
  print(8080);
});
