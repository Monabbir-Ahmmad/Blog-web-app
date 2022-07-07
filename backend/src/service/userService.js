import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";
import { hashPassword, verifyPassword } from "../utils/passwordEncryption.js";

import HttpError from "../utils/httpError.js";
import deleteUploadedFile from "../utils/deleteUploadedFile.js";
import userCache from "../repository/cache_repository/userCache.js";
import userDb from "../repository/db_repository/userDb.js";

const getUserList = async (page, limit, sort, keyword) => {
  const userList = await userCache.getUserList(
    page,
    limit,
    sort,
    keyword,
    async () => await userDb.findAllUsers(page, limit, sort, keyword)
  );

  const pageCount = Math.ceil((await userDb.countUsers(keyword)) / limit);

  return {
    success: true,
    body: { userList, pageCount },
  };
};

const getProfileDetails = async (userId) => {
  const user = await userCache.getUserById(
    userId,
    async () => await userDb.findUserById(userId)
  );

  if (user?.id) {
    const userDetails = {
      id: user.id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
      profileImage: user.profileImage,
      privilege: user.privilege,
      blogCount: user.blogCount,
    };

    return {
      success: true,
      body: userDetails,
    };
  } else {
    return {
      success: false,
      error: new HttpError(404, "User not found."),
    };
  }
};

const updateProfile = async (
  userId,
  password,
  name,
  email,
  gender,
  dateOfBirth,
  profileImage,
  removeProfileImage
) => {
  const user = await userDb.findUserById(userId);

  if (user?.id && (await verifyPassword(user?.password, password))) {
    if (await userDb.emailInUse(email, userId)) {
      return {
        success: false,
        error: new HttpError(409, "Email is already in use."),
      };
    }

    name = name || user.name;
    email = email || user.email;
    dateOfBirth = dateOfBirth || user.dateOfBirth;
    gender = gender || user.gender;
    profileImage = profileImage || user.profileImage;

    if (removeProfileImage) profileImage = null;

    const updatedRecord = await userDb.updateProfile(
      userId,
      name,
      email,
      gender,
      dateOfBirth,
      profileImage
    );

    if (
      updateProfile &&
      user?.profileImage &&
      profileImage !== user?.profileImage
    )
      deleteUploadedFile(user?.profileImage);

    const userDetails = {
      id: user.id,
      name,
      email,
      gender,
      dateOfBirth,
      profileImage,
      privilege: user.privilege,
      blogCount: user.blogCount,
    };

    updatedRecord && userCache.cacheUserById(userId, userDetails);

    return updatedRecord
      ? {
          success: true,
          body: {
            ...userDetails,
            refreshToken: generateRefreshToken(
              user.id,
              name,
              email,
              user.privilege
            ),
            accessToken: generateAccessToken(
              user.id,
              name,
              email,
              user.privilege
            ),
          },
        }
      : { success: false, error: new HttpError(400, "Unable to update.") };
  } else if (!user?.id) {
    return { success: false, error: new HttpError(404, "User not found.") };
  } else {
    return { success: false, error: new HttpError(403, "Wrong password.") };
  }
};

const updatePassword = async (userId, oldPassword, newPassword) => {
  const user = await userDb.findUserById(userId);
  const passwordVerified =
    user?.id && (await verifyPassword(user?.password, oldPassword));

  if (passwordVerified && oldPassword !== newPassword) {
    await userDb.updatePassword(userId, await hashPassword(newPassword));

    return {
      success: true,
      body: { message: "Password updated." },
    };
  } else if (!user?.id) {
    return { success: false, error: new HttpError(404, "User not found.") };
  } else if (!passwordVerified) {
    return { success: false, error: new HttpError(403, "Wrong password.") };
  } else if (passwordVerified && oldPassword === newPassword) {
    return {
      success: false,
      error: new HttpError(
        406,
        "New password can not be the same as old password."
      ),
    };
  } else {
    return {
      success: false,
      error: new HttpError(400, "Bad request."),
    };
  }
};

export default {
  getUserList,
  getProfileDetails,
  updateProfile,
  updatePassword,
};
