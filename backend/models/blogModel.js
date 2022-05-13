import { database } from "../config/database.js";
import { DataTypes } from "sequelize";
import User from "./userModel.js";

const Blog = database.define("blog", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { notEmpty: true },
  },
});

User.hasMany(Blog);

Blog.belongsTo(User);

await Blog.sync();

export default Blog;
