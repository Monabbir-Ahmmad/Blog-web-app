import { database } from "../config/databaseConfig.js";
import { DataTypes } from "sequelize";
import User from "./userModel.js";
import Blog from "./blogModel.js";

const Like = database.define("like");

Blog.hasMany(Like, { onDelete: "CASCADE" });

Like.belongsTo(Blog, { onDelete: "CASCADE" });

User.hasMany(Like, { onDelete: "CASCADE" });

Like.belongsTo(User, { onDelete: "CASCADE" });

await Like.sync();

export default Like;
