import asyncHandler from "express-async-handler";
import { Op } from "sequelize";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import { hashPassword, verifyPassword } from "../utils/passwordEncryption.js";
import UserType from "../models/userTypeModel.js";

// @desc Register user
// @route POST /api/v1/user/signup
// @access Public
// @needs name, email, dateOfBirth, gender, password, profileImage
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, dateOfBirth, gender, password } = req.body;

  const emailExists = await User.findOne({ where: { email } });

  if (emailExists) {
    res.status(409);
    throw new Error("Email is already in use");
  }

  const userType = await UserType.findOne({
    where: { privilege: "User" },
  });

  const user = await User.create({
    name,
    email,
    dateOfBirth,
    gender,
    password: await hashPassword(password),
    profileImage: req.file?.filename,
  });

  await user.setUserType(userType);

  user.privilege = (await user.getUserType()).privilege;

  res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
    profileImage: user.profileImage,
    privilege: user.privilege,
    token: generateToken(user.id, user.name, user.email, user.privilege),
  });
});

// @desc Auth user and get token
// @route POST /api/v1/user/signin
// @access Public
// @needs email, password
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email },
    include: {
      model: UserType,
      attributes: ["privilege"],
    },
  });

  if (user && (await verifyPassword(user.password, password))) {
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      privilege: user.userType.privilege,
      token: generateToken(
        user.id,
        user.name,
        user.email,
        user.userType.privilege
      ),
    });
  } else {
    res.status(401);
    throw Error("Invalid email and password");
  }
});

// @desc Get user profile
// @route GET /api/v1/user/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const id = req.user.id;

  const user = await User.findByPk(id, {
    attributes: [
      "id",
      "name",
      "email",
      "dateOfBirth",
      "gender",
      "profileImage",
    ],
  });
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Update user profile
// @route PATCH /api/user/profile
// @access Private
// @needs password and fields to update
const updateUserProfile = asyncHandler(async (req, res) => {
  const id = req.user.id;
  const { name, email, dateOfBirth, gender, password } = req.body;

  const user = await User.findByPk(id, {
    include: {
      model: UserType,
      attributes: ["privilege"],
    },
  });

  if (user && (await verifyPassword(user.password, password))) {
    user.name = name || user.name;
    user.email = email || user.email;
    user.dateOfBirth = dateOfBirth || user.dateOfBirth;
    user.gender = gender || user.gender;
    user.profileImage = req.file?.filename || user.profileImage;

    const emailExists = await User.findOne({
      where: { email: user.email, id: { [Op.not]: user.id } },
    });

    if (emailExists) {
      res.status(409);
      throw new Error("Email is already in use");
    }

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

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      profileImage: user.profileImage,
      privilege: user.userType.privilege,
      token: generateToken(
        user.id,
        user.name,
        user.email,
        user.userType.privilege
      ),
    });
  } else if (!user) {
    res.status(404);
    throw new Error("User not found");
  } else {
    res.status(401);
    throw new Error("Wrong password");
  }
});

// @desc Update user password
// @route PUT /api/user/profile
// @access Private
// @needs oldPassword, newPassword
const updateUserPassword = asyncHandler(async (req, res) => {
  const id = req.user.id;
  const { oldPassword, newPassword } = req.body;

  const user = await User.findByPk(id);
  const passwordVerified =
    user && (await verifyPassword(user.password, oldPassword));

  if (passwordVerified && oldPassword !== newPassword) {
    await User.update(
      { password: await hashPassword(newPassword) },
      { where: { id: user.id } }
    );

    res.status(204).json();
  } else if (!user) {
    res.status(404);
    throw new Error("User not found");
  } else if (!passwordVerified) {
    res.status(401);
    throw new Error("Wrong password");
  } else if (passwordVerified && oldPassword === newPassword) {
    res.status(406);
    throw new Error("New password can not be the same as old password");
  } else {
    res.status(400);
    throw new Error("Bad request");
  }
});

// @desc Get user profile
// @route GET /api/v1/user/profile/:id
// @access Private
const getOtherUser = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const user = await User.findByPk(id, {
    attributes: [
      "id",
      "name",
      "email",
      "dateOfBirth",
      "gender",
      "profileImage",
    ],
  });
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
  getOtherUser,
};
