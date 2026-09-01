import { config } from "dotenv";

import pkg from "pg";
config({
  path: "./config/config.env",
});
const { Client } = pkg;

const database = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

try {
  await database.connect();
  console.log("the database is connected");
} catch (error) {
  console.log("the error in the connecting in the database");
  console.log(error);
  process.exit(1);
}

export default database;
