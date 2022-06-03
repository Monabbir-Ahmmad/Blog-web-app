import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import { hashPassword, verifyPassword } from "../utils/passwordEncryption.js";
import {
  authUser,
  changeUserPassword,
  createUser,
  emailInUse,
  findUserById,
  findUserDetails,
  updateUser,
} from "../service/userDbService.js";

// @desc Register user
// @route POST /api/v1/user/signup
// @access Public
// @needs name, email, dateOfBirth, gender, password, ?profileImage
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, dateOfBirth, gender, password } = req.body;
  const profileImage = req.file?.filename;

  if (await emailInUse(email)) {
    res.status(409);
    throw new Error("Email is already in use");
  }

  const user = await createUser(
    name,
    email,
    dateOfBirth,
    gender,
    await hashPassword(password),
    profileImage
  );

  res.status(201).json({
    ...user,
    token: generateToken(user.id, user.name, user.email, user.privilege),
  });
});

// @desc Auth user and get token
// @route POST /api/v1/user/signin
// @access Public
// @needs email, password
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await authUser(email);

  if (user?.id && (await verifyPassword(user.password, password))) {
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      privilege: user.privilege,
      token: generateToken(user.id, user.name, user.email, user.privilege),
    });
  } else {
    res.status(401);
    throw Error("Invalid email and password");
  }
});

// @desc Get user profile
// @route GET /api/v1/user/profile
// @access Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const id = req.user.id;

  const user = await findUserDetails(id);

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
export const updateUserProfile = asyncHandler(async (req, res) => {
  const id = req.user.id;
  const { name, email, dateOfBirth, gender, password } = req.body;
  const profileImage = req.file?.filename;

  const user = await findUserById(id);

  if (user?.id && (await verifyPassword(user.password, password))) {
    if (await emailInUse(email, id)) {
      res.status(409);
      throw new Error("Email is already in use");
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.dateOfBirth = dateOfBirth || user.dateOfBirth;
    user.gender = gender || user.gender;
    user.profileImage = profileImage || user.profileImage;

    const updatedUser = await updateUser(user);

    res.status(200).json({
      ...updatedUser,
      token: generateToken(
        updatedUser.id,
        updatedUser.name,
        updatedUser.email,
        updatedUser.privilege
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
export const updateUserPassword = asyncHandler(async (req, res) => {
  const id = req.user.id;
  const { oldPassword, newPassword } = req.body;

  const user = await findUserById(id);
  const passwordVerified =
    user?.id && (await verifyPassword(user?.password, oldPassword));

  if (passwordVerified && oldPassword !== newPassword) {
    await changeUserPassword(user.id, await hashPassword(newPassword));

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
export const getOtherUser = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const user = await findUserDetails(id);

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
