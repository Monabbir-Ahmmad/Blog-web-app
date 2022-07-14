import asyncHandler from "express-async-handler";
import { sortTypes } from "../utils/sortTypes.js";
import userService from "../service/userService.js";

// @desc Get user profile details
// @route GET /api/user/profile/:userId
// @access Protected
const getUserDetails = asyncHandler(async (req, res) => {
  const userId = req.params?.userId;

  const result = await userService.getProfileDetails(userId);

  if (result.success) {
    res.status(200).json(result.body);
  } else {
    throw result.error;
  }
});

// @desc Get list of users
// @route GET /api/user/users?page=Number&limit=Number&sort=Number&keyword=String
// @access Protected
const getUserList = asyncHandler(async (req, res) => {
  let { page, limit, sort, keyword = "" } = req.query;
  page = parseInt(page > 0 ? page : 1);
  limit = parseInt(limit > 0 ? limit : 12);
  sort = parseInt(sort >= 0 && sort < sortTypes.length ? sort : 0);

  const result = await userService.getUserList(page, limit, sort, keyword);

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
  const removeProfileImage =
    !profileImage && parseInt(req.body.removeProfileImage) === 1;

  const result = await userService.updateProfile(
    id,
    password,
    name,
    email,
    gender,
    dateOfBirth,
    profileImage,
    removeProfileImage
  );

  if (result.success) {
    res.status(200).json(result.body);
  } else {
    throw result.error;
  }
});

// @desc Update user password
// @route PUT /api/user/password
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

export default {
  getUserDetails,
  getUserList,
  updateUserProfile,
  updateUserPassword,
};
