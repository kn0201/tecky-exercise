import express from "express";
import { print } from "listening-on";
import expressSession from "express-session";
import crypto from "crypto";
import dayjs from "dayjs";
import path from "path";
import formidable from "formidable";
import { mkdirSync } from "fs";
import jsonfile from "jsonfile";
import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const client = new Client({
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});
client.connect();

const app = express();
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.redirect("/public");
});

app.use("/public", express.static("public"));
app.use("/uploads", express.static("uploads"));

let uploadDir = "uploads";
mkdirSync(uploadDir, { recursive: true });

// Counter Session

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
    username: string;
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

// POSTING MEMO

let memos = [
  { id: 1, content: "網上連儂牆" },
  { id: 2, content: "香港加油" },
  {
    id: 3,
    content: "yukimin",
    filename: "ebe1b6c4-08a3-4b2b-9058-d2c58ca9ee80.jpeg",
  },
];

try {
  memos = jsonfile.readFileSync("memos.json");
} catch (error) {}

app.get("/memos.js", (req, res) => {
  res.end(`let memos = ${JSON.stringify(memos)}`);
});

let id: number = 4;
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
      id,
      content,
      filename,
    });
    id++;

    await jsonfile.writeFile("memos.json", memos);

    // res.json({ content, filename });
    res.redirect("/");
  });
});

function toArray<T>(field: T[] | T | undefined): T[] {
  return Array.isArray(field) ? field : field ? [field] : [];
}

// LOGIN as admin

type User = {
  username: string;
  password: string;
};
let users: User[] = jsonfile.readFileSync("users.json");

app.post("/login", (req, res) => {
  let { login_id, password } = req.body;
  if (!login_id) {
    res.status(400);
    res.json({ error: "missing login_id" });
    return;
  }
  if (!password) {
    res.status(400);
    res.json({ error: "missing password" });
    return;
  }
  for (let user of users) {
    if (user.username == login_id && user.password == password) {
      req.session.username = login_id;
      // res.end('login successfully')
      res.redirect("/");
      return;
    }
  }
  res.status(401);
  res.end("wrong username or password");
  return;
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(502);
      res.json({ error: "failed to destroy session" });
      return;
    }
    // res.end('logout successfully')
    res.redirect("/");
  });
});

app.get("/role.js", (req, res) => {
  res.end(`let login_id = ${JSON.stringify(req.session.username)}`);
});

const adminOnly = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.session?.username) {
    next();
  } else {
    // res.redirect('/')
    res.status(403);
    res.end("This page is only for admin");
  }
};

// admin.html should be inside protected
app.use("/admin", adminOnly, express.static("protected"));

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
