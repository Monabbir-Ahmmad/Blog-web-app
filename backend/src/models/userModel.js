import { DataTypes } from "sequelize";
import UserType from "./userTypeModel.js";
import { database } from "../config/databaseConfig.js";

const User = database.define("user", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { notEmpty: true },
  },
  dateOfBirth: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: { notEmpty: true },
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  profileImage: {
    type: DataTypes.STRING,
  },
});

UserType.hasMany(User, { onDelete: "CASCADE" });

User.belongsTo(UserType, { onDelete: "CASCADE" });

await User.sync();

export default User;
