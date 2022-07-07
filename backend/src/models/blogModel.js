import { DataTypes } from "sequelize";
import User from "./userModel.js";
import { database } from "../config/databaseConfig.js";

const Blog = database.define("blog", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: { notEmpty: true },
  },
  coverImage: {
    type: DataTypes.STRING,
  },
});

User.hasMany(Blog, { onDelete: "CASCADE" });

Blog.belongsTo(User, { onDelete: "CASCADE" });

await Blog.sync();

export default Blog;
