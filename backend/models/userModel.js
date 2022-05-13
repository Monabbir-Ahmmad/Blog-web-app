import { database } from "../config/database.js";
import { DataTypes } from "sequelize";
import UserType from "./userTypeModel.js";

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

UserType.hasMany(User);

User.belongsTo(UserType);

await User.sync();

export default User;
