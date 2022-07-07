import dotenv from "dotenv";
import mysql from "mysql2/promise.js";

dotenv.config();

const initDatabase = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_POST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  const [result] = await connection.query(
    `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`
  );

  console.log(
    result.affectedRows ? "Database created" : "Database already exists"
  );
};

try {
  await initDatabase();
} catch (error) {
  console.error(error);
}

process.exit();
