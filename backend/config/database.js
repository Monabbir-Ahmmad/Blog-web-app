import { Sequelize } from "sequelize";

const database = new Sequelize("blog_database", "root", "", {
  dialect: "mysql",
  logging: false,
});

export { database };
