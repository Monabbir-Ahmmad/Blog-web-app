import asyncHandler from "express-async-handler";
import authService from "../service/authService.js";

// @desc Register new user
// @route POST /api/auth/signup
// @access Public
// @needs name, email, dateOfBirth, gender, password, ?profileImage
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, dateOfBirth, gender, password } = req.body;
  const profileImage = req.file?.filename;

  const result = await authService.signup(
    name,
    email,
    gender,
    dateOfBirth,
    password,
    profileImage
  );

  if (result.success) {
    res.status(201).json(result.body);
  } else {
    throw result.error;
  }
});

// @desc Login user and get token
// @route POST /api/auth/signin
// @access Public
// @needs email, password
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const result = await authService.signin(email, password);

  if (result.success) {
    res.status(201).json(result.body);
  } else {
    throw result.error;
  }
});

// @desc Login user and get token
// @route POST /api/auth/refreshtoken
// @access Public
// @needs refreshToken
const refreshAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  const result = await authService.refreshAccessToken(refreshToken);

  if (result.success) {
    res.status(201).json(result.body);
  } else {
    throw result.error;
  }
});

export default { registerUser, loginUser, refreshAccessToken };
