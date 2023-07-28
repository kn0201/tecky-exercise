import express from "express";
import { print } from "listening-on";
// import jsonfile from "jsonfile";
// import fs from "fs/promises";

const app = express();

app.use(express.urlencoded());

type Memo = {
  id: number;
  content: string;
  postTime: number;
  comments: string[];
};

let memos: Memo[] = [];
let i = 1;

// async function loadMemo(): Promise<Memo[]> {
//   let files = await fs.readdir(".");
//   if (files.includes("memos.json")) {
//     let json = await jsonfile.readFile("memos.json");
//     return json;
//   }
//   return [];
// }

// async function saveMemos(memos: Memo[]) {
//   await jsonfile.writeFile("memos.json", memos);
// }

// async function main() {
//   let memos: Memo[] = await loadMemo();
//   let nextId = memos.length + 1;
// }
// main().catch((e) => console.error(e));

app.get("/memos", (req, res) => {
  res.json(
    memos
      .filter((memo) => memo)
      .map((memo) => ({
        id: memo.id,
        content: memo.content.slice(0, 20),
      }))
  );
});

app.post("/memos", (req, res) => {
  console.log("post memo: ", req.body);
  memos.push({
    id: i,
    content: req.body.content,
    postTime: Date.now(),
    comments: [],
  });
  res.end("saved new memos");
  i++;
});

app.patch("/memos/:id", (req, res) => {
  console.log("update memo: ", {
    params: req.params,
    body: req.body,
  });
  let id = +req.params.id;
  let memo = memos[id - 1];
  if (!memo) {
    res.status(404);
    res.end("this memo is already deleted");
  }
  memo.content = req.body.content;
  res.end("updated memo");
});

app.delete("/memos/:id", (req, res) => {
  let id = +req.params.id;
  delete memos[id - 1];
  res.end("deleted memo");
});

app.listen(8080, () => {
  // console.log('ready')
  // console.log('listening on port 8080')
  // console.log('you can connect to this server at http://localhost:8080')
  print(8080);
});
