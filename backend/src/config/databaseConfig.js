import { Sequelize } from "sequelize";

export const database = new Sequelize("blog_database", "root", "", {
  dialect: "mysql",
  logging: false,
});

export const databaseConnect = () => {
  database
    .authenticate()
    .then(() => console.log("Connected to database..."))
    .catch((error) =>
      console.error("Unable to connect to the database:", error)
    );
};
