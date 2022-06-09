import mysql from "mysql2/promise.js";
import { config } from "./databaseConfig.js";

const initDatabase = async () => {
  const connection = await mysql.createConnection({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
  });

  return await connection.query(
    `CREATE DATABASE IF NOT EXISTS ${config.databaseName};`
  );
};

try {
  await initDatabase();
  console.log("Database created");
} catch (error) {
  console.error(error);
}

process.exit();
