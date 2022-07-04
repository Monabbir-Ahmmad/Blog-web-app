import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const database = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: process.env.DB_DIALECT,
    logging: false,
  }
);

export const databaseConnect = () => {
  database
    .authenticate()
    .then(() => console.log("Connected to database..."))
    .catch((error) =>
      console.error("Unable to connect to the database:", error)
    );
};
