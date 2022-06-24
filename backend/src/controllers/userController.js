import asyncHandler from "express-async-handler";
import userService from "../service/userService.js";

// @desc Get user profile
// @route GET /api/user/profile
// @access Protected
const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user?.id;

  const result = await userService.getProfileDetails(userId);

  if (result.success) {
    res.status(200).json(result.body);
  } else {
    throw result.error;
  }
});

// @desc Get list of users
// @route GET /api/user/?page=number&limit=number&nameDesc=boolean(0,1)
// @access Protected
const getUserList = asyncHandler(async (req, res) => {
  let { page, limit, nameDesc } = req.query;
  page = parseInt(page > 0 ? page : 1);
  limit = parseInt(limit > 0 ? limit : 12);
  nameDesc = parseInt(nameDesc) === 1;

  const result = await userService.getUserList(page, limit, nameDesc);

  if (result.success) {
    res.status(200).json(result.body);
  } else {
    throw result.error;
  }
});

// @desc Update user profile
// @route PATCH /api/user/profile
// @access Protected
// @needs password and fields to update
const updateUserProfile = asyncHandler(async (req, res) => {
  const id = req.user?.id;
  const { name, email, dateOfBirth, gender, password } = req.body;
  const profileImage = req.file?.filename;

  const result = await userService.updateProfile(
    id,
    password,
    name,
    email,
    gender,
    dateOfBirth,
    profileImage
  );

  if (result.success) {
    res.status(200).json(result.body);
  } else {
    throw result.error;
  }
});

// @desc Update user password
// @route PUT /api/user/profile
// @access Protected
// @needs oldPassword, newPassword
const updateUserPassword = asyncHandler(async (req, res) => {
  const id = req.user?.id;
  const { oldPassword, newPassword } = req.body;

  const result = await userService.updatePassword(id, oldPassword, newPassword);

  if (result.success) {
    res.status(200).json(result.body);
  } else {
    throw result.error;
  }
});

// @desc Get user profile
// @route GET /api/user/profile/:userId
// @access Protected
const getOtherUser = asyncHandler(async (req, res) => {
  const userId = req.params?.userId;

  const result = await userService.getProfileDetails(userId);

  if (result.success) {
    res.status(200).json(result.body);
  } else {
    throw result.error;
  }
});

export default {
  getUserProfile,
  getUserList,
  updateUserProfile,
  updateUserPassword,
  getOtherUser,
};
