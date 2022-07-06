import { Op } from "sequelize";
import Blog from "../../models/blogModel.js";
import User from "../../models/userModel.js";
import UserType from "../../models/userTypeModel.js";
import { sortTypes } from "../../utils/sortTypes.js";

const createUser = async (
  name,
  email,
  dateOfBirth,
  gender,
  password,
  profileImage
) => {
  const userType = await UserType.findOne({
    where: { privilege: "Normal" },
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
    id: user?.id,
    name: user?.name,
    email: user?.email,
    gender: user?.gender,
    dateOfBirth: user?.dateOfBirth,
    profileImage: user?.profileImage,
    password: user?.password,
    privilege: userType.privilege,
  };
};

const emailInUse = async (email = "", id = null) => {
  return await User.findOne({
    where: { email: email, id: { [Op.not]: id } },
  });
};

const findAllUsers = async (page = 1, limit = 12, sort = 1, keyword = "") => {
  const { count, rows } = await User.findAndCountAll({
    include: [
      {
        model: UserType,
        attributes: ["privilege"],
      },
      {
        model: Blog,
        attributes: ["id"],
      },
    ],
    where: { name: { [Op.substring]: keyword } },
    offset: limit * (page - 1),
    limit: limit,
    order: [[sortTypes[sort].sortBy, sortTypes[sort].sortOrder]],
  });

  return rows.map((user) => ({
    id: user?.id,
    name: user?.name,
    email: user?.email,
    gender: user?.gender,
    dateOfBirth: user?.dateOfBirth,
    profileImage: user?.profileImage,
    privilege: user?.userType?.privilege,
    blogCount: user?.blogs?.length,
  }));
};

const findUserById = async (id) => {
  const user = await User.findByPk(id, {
    include: [
      {
        model: UserType,
        attributes: ["privilege"],
      },
      {
        model: Blog,
        attributes: ["id"],
      },
    ],
  });

  return {
    id: user?.id,
    name: user?.name,
    email: user?.email,
    gender: user?.gender,
    dateOfBirth: user?.dateOfBirth,
    profileImage: user?.profileImage,
    password: user?.password,
    privilege: user?.userType?.privilege,
    blogCount: user?.blogs?.length,
  };
};

const findUserByEmail = async (email) => {
  const user = await User.findOne({
    where: { email },
    include: {
      model: UserType,
      attributes: ["privilege"],
    },
  });

  return {
    id: user?.id,
    name: user?.name,
    email: user?.email,
    gender: user?.gender,
    dateOfBirth: user?.dateOfBirth,
    profileImage: user?.profileImage,
    password: user?.password,
    privilege: user?.userType?.privilege,
  };
};

const updateProfile = async (
  id,
  name,
  email,
  gender,
  dateOfBirth,
  profileImage
) => {
  return await User.update(
    {
      name,
      email,
      dateOfBirth,
      gender,
      profileImage,
    },
    { where: { id } }
  );
};

const updatePassword = async (userId, newPassword) => {
  return await User.update(
    { password: newPassword },
    { where: { id: userId } }
  );
};

const countUsers = async (keyword) => {
  return await User.count({ where: { name: { [Op.substring]: keyword } } });
};

export default {
  createUser,
  emailInUse,
  findAllUsers,
  findUserById,
  findUserByEmail,
  updateProfile,
  updatePassword,
  countUsers,
};
