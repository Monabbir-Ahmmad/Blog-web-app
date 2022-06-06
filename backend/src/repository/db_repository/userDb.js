import { Op } from "sequelize";
import User from "../../models/userModel.js";
import UserType from "../../models/userTypeModel.js";

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
    privilege: (await user.getUserType())?.privilege,
  };
};

const findUserById = async (id) => {
  const user = await User.findByPk(id, {
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

const emailInUse = async (email = "", id = null) => {
  return await User.findOne({
    where: { email: email, id: { [Op.not]: id } },
  });
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

export default {
  createUser,
  emailInUse,
  findUserById,
  findUserByEmail,
  updateProfile,
  updatePassword,
};
