import { Op } from "sequelize";
import User from "../models/userModel.js";
import UserType from "../models/userTypeModel.js";

export const findUserById = async (id) => {
  return await User.findByPk(id, {
    include: {
      model: UserType,
      attributes: ["privilege"],
    },
  });
};

export const emailInUse = async (email = "", id = null) => {
  return await User.findOne({
    where: { email: email, id: { [Op.not]: id } },
  });
};

export const createUser = async (
  name,
  email,
  dateOfBirth,
  gender,
  password,
  profileImage
) => {
  const userType = await UserType.findOne({
    where: { privilege: "User" },
  });

  const user = await User.create({
    name,
    email,
    dateOfBirth,
    gender,
    password,
    profileImage,
  });

  await user.setUserType(userType);

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    profileImage: user.profileImage,
    privilege: (await user.getUserType()).privilege,
  };
};

export const authUser = async (email) => {
  const user = await User.findOne({
    where: { email },
    attributes: ["id", "name", "email", "password", "profileImage"],
    include: {
      model: UserType,
      attributes: ["privilege"],
    },
  });

  return {
    id: user?.id,
    name: user?.name,
    email: user?.email,
    profileImage: user?.profileImage,
    password: user?.password,
    privilege: user?.userType?.privilege,
  };
};

export const findUserDetails = async (id) => {
  return await User.findByPk(id, {
    attributes: [
      "id",
      "name",
      "email",
      "dateOfBirth",
      "gender",
      "profileImage",
    ],
  });
};

export const updateUser = async (user) => {
  await User.update(
    {
      name: user.name,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      profileImage: user.profileImage,
    },
    { where: { id: user.id } }
  );

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    dateOfBirth: user.dateOfBirth,
    gender: user.gender,
    profileImage: user.profileImage,
    privilege: user.userType.privilege,
  };
};

export const changeUserPassword = async (userId, newPassword) => {
  return await User.update(
    { password: newPassword },
    { where: { id: userId } }
  );
};
