import { Sequelize } from "sequelize";

export const config = {
  host: "localhost",
  port: "3306",
  user: "root",
  password: "",
  databaseName: "blog_database",
  databaseDialect: "mysql",
};

export const database = new Sequelize(
  config.databaseName,
  config.user,
  config.password,
  {
    dialect: config.databaseDialect,
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
