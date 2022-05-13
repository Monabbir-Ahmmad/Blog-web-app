import { database } from "../config/database.js";
import { DataTypes } from "sequelize";

const UserType = database.define("userType", {
  privilege: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
});

await UserType.sync();

export default UserType;
