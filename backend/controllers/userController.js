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
    profileImage: req.file.filename,
  });

  user.setUserType(userType);

  user.privilege = (await user.getUserType()).privilege;

  res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
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
// @route GET /api/v1/user/profile/:id
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id);
  if (user) {
    res.json({
      name: user.name,
      email: user.email,
      dateOfBirth: new Date(user.dateOfBirth).getTime(),
      gender: user.gender,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Update user profile
// @route PATCH /api/user/profile/:id
// @access Private
// @needs password and fields to update
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    include: {
      model: UserType,
      attributes: ["privilege"],
    },
  });

  if (user && (await verifyPassword(user.password, req.body.password))) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.dateOfBirth = req.body.dateOfBirth || user.dateOfBirth;
    user.gender = req.body.gender || user.gender;

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
      },
      { where: { id: user.id } }
    );

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
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
// @route PUT /api/user/profile/:id
// @access Private
// @needs oldPassword, newPassword
const updateUserPassword = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id);
  const passwordVerified =
    user && (await verifyPassword(user.password, req.body.oldPassword));

  if (passwordVerified && req.body.oldPassword !== req.body.newPassword) {
    await User.update(
      { password: await hashPassword(req.body.newPassword) },
      { where: { id: user.id } }
    );

    res.status(204).json();
  } else if (!user) {
    res.status(404);
    throw new Error("User not found");
  } else if (!passwordVerified) {
    res.status(401);
    throw new Error("Wrong password");
  } else if (
    passwordVerified &&
    req.body.oldPassword === req.body.newPassword
  ) {
    res.status(406);
    throw new Error("New password can not be the same as old password");
  } else {
    res.status(400);
    throw new Error("Bad request");
  }
});

export {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
};
