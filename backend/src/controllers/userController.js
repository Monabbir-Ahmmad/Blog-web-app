import asyncHandler from "express-async-handler";
import userService from "../service/userService.js";

// @desc Get user profile
// @route GET /api/v1/user/profile
// @access Protected
const getUserProfile = asyncHandler(async (req, res) => {
  const id = req.user.id;

  const result = await userService.getProfileDetails(id);

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
  const id = req.user.id;
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
  const id = req.user.id;
  const { oldPassword, newPassword } = req.body;

  const result = await userService.updatePassword(id, oldPassword, newPassword);

  if (result.success) {
    res.status(200).json(result.body);
  } else {
    throw result.error;
  }
});

// @desc Get user profile
// @route GET /api/v1/user/profile/:id
// @access Protected
const getOtherUser = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const result = await userService.getProfileDetails(id);

  if (result.success) {
    res.status(200).json(result.body);
  } else {
    throw result.error;
  }
});

export default {
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
  getOtherUser,
};
