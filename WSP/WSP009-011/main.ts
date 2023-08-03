import { Client } from "pg";
import { env } from "./env";
import XLSX from "xlsx";
import "cast.ts";
import { object, optional, string } from "cast.ts";

let file = "./WSP009-exercise.xlsx";
let workbook = XLSX.readFile(file);

let userSheet = workbook.Sheets.user;
let userArray = XLSX.utils.sheet_to_json(userSheet);

let userParser = object({
  username: string(),
  password: string(),
});

let memoSheet = workbook.Sheets.memo;
let memoArray = XLSX.utils.sheet_to_json(memoSheet);

let memoParser = object({
  content: string(),
  image: optional(string()),
});

async function main() {
  const client = new Client({
    database: env.DB_NAME,
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
  });

  await client.connect();

  for (let object of userArray) {
    let user = userParser.parse(object);

    let result = await client.query(
      /* sql */ `
      select id
      from "users"
      where username = $1
    `,
      [user.username]
    );

    if (result.rowCount == 0) {
      await client.query(
        /* sql */ `
  insert into "users" (username, password) values ($1,$2)
  `,
        [user.username, user.password]
      );
    } else if (result.rowCount == 1) {
      await client.query(
        /* sql */ `
        update "users"
        set password = $1
        where id = $2
      `,
        [user.password, result.rows[0].id]
      );
    } else {
      console.log("duplicated users:", result.rows);
      throw new Error("duplicated user");
    }
  }

  await client.query(/* sql */ `
    delete from "memos"
  `);
  for (let object of memoArray) {
    let memo = memoParser.parse(object);
    await client.query(
      /* sql */ `
  insert into "memos" (content, image) values ($1,$2)
  `,
      [memo.content, memo.image]
    );
  }

  await client.end();
}
main().catch((e) => console.error(e));
