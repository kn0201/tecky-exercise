import express from "express";
import { print } from "listening-on";
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

app.listen(8080, () => {
  // console.log('ready')
  // console.log('listening on port 8080')
  // console.log('you can connect to this server at http://localhost:8080')
  print(8080);
});
