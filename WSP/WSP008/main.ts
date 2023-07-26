import express from "express";
import { print } from "listening-on";
// import expressSession from "express-session";
// import crypto from "crypto";
// import dayjs from "dayjs";
// import path from "path";
// import formidable from "formidable";
// import { mkdirSync } from "fs";
import jsonfile from "jsonfile";

let app = express();

app.use(express.urlencoded());
app.use("/public", express.static("public"));

app.get("/", (req, res) => {
  res.redirect("/public");
});

let memos = jsonfile.readFileSync("memos.json");

// try {
//   memos = jsonfile.readFileSync("memos.json");
// } catch (error) {}

app.get("/memos.js", (req, res) => {
  res.end(`let memos = ${JSON.stringify(memos)}`);
});

app.listen(8080, () => {
  print(8080);
});
