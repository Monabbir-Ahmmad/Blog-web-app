import Blog from "./blogModel.js";
import { DataTypes } from "sequelize";
import User from "./userModel.js";
import { database } from "../config/databaseConfig.js";

const Comment = database.define("comment", {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
});

User.hasMany(Comment, { onDelete: "CASCADE" });

Comment.belongsTo(User, { onDelete: "CASCADE" });

Blog.hasMany(Comment, { onDelete: "CASCADE" });

Comment.belongsTo(Blog, { onDelete: "CASCADE" });

Comment.hasMany(Comment, {
  as: "children",
  foreignKey: "parentId",
  onDelete: "CASCADE",
});

Comment.belongsTo(Comment, {
  as: "parent",
  foreignKey: "parentId",
  onDelete: "CASCADE",
});

await Comment.sync();

export default Comment;
