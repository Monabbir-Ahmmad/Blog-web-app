import { DataTypes } from "sequelize";
import { database } from "../config/databaseConfig.js";

const UserType = database.define("userType", {
  privilege: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { notEmpty: true },
  },
});

await UserType.sync();

export default UserType;
