import express from "express";
// import { Request, Response } from 'express'
import { print } from "listening-on";
import expressSession from "express-session";
import crypto from "crypto";
import dayjs from "dayjs";
import path from "path";
import formidable from "formidable";
import { mkdirSync } from "fs";
import jsonfile from "jsonfile";

const app = express();
app.use(express.urlencoded());

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
app.use("/uploads", express.static("uploads"));

let uploadDir = "uploads";
mkdirSync(uploadDir, { recursive: true });

let memos = [
  { content: "網上連儂牆" },
  { content: "香港加油" },
  { content: "yukimin", filename: "ebe1b6c4-08a3-4b2b-9058-d2c58ca9ee80.jpeg" },
];

try {
  memos = jsonfile.readFileSync("memos.json");
} catch (error) {}

let contact = [{ id: 0, email: "admin@admin", password: "admin" }];

try {
  contact = jsonfile.readFileSync("contact.json");
} catch (error) {}

app.get("/memos.js", (req, res) => {
  res.end(`let memos = ${JSON.stringify(memos)}`);
});

app.get("/contact.js", (req, res) => {
  res.end(`let contact = ${JSON.stringify(contact)}`);
});
let i = 1;
app.post("/contact", async (req, res) => {
  console.log("saving contact: ", req.body);
  contact.push({
    id: i,
    email: req.body.email,
    password: req.body.password,
  });
  await jsonfile.writeFile("contact.json", contact);
  res.redirect("/");
});

app.post("/memos", (req, res) => {
  let form = formidable({
    uploadDir,
    maxFileSize: 300 * 1024,
    allowEmptyFiles: false,
    filter(part) {
      return part.mimetype?.startsWith("image/") || false;
    },
    filename(name, ext, part, form) {
      return crypto.randomUUID() + "." + part.mimetype?.split("/").pop();
    },
  });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(400);
      res.json({ error: String(err) });
      return;
    }
    let image = toArray(files.image)[0];
    let filename = image?.newFilename;

    let content = toArray(fields.content)[0];
    if (!content) {
      res.json({ error: "missing content" });
      res.status(400);
      return;
    }

    memos.push({
      content,
      filename,
    });

    await jsonfile.writeFile("memos.json", memos);

    // res.json({ content, filename });
    res.redirect("/");
  });
});

function toArray<T>(field: T[] | T | undefined): T[] {
  return Array.isArray(field) ? field : field ? [field] : [];
}

app.use((req, res) => {
  // res.redirect('/public/404.html')
  res.status(404);
  res.sendFile(path.resolve("public", "404.html"));
});

app.listen(8080, () => {
  // console.log('ready')
  // console.log('listening on port 8080')
  // console.log('you can connect to this server at http://localhost:8080')
  print(8080);
});
