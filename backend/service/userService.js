import deleteUploadedFile from "../utils/deleteUploadedFile.js";
import generateToken from "../utils/generateToken.js";
import HttpError from "../utils/httpError.js";
import { hashPassword, verifyPassword } from "../utils/passwordEncryption.js";
import userCacheService from "./cache_service/userCacheService.js";
import userDbService from "./db_service/userDbService.js";

const getProfileDetails = async (userId) => {
  const user =
    userCacheService.getUserById(userId) ||
    (await userDbService.findUserById(userId));

  if (user?.id) {
    const userDetails = {
      id: user.id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
      profileImage: user.profileImage,
      privilege: user.privilege,
    };

    userCacheService.cacheUserById(userDetails.id, userDetails);

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
  profileImage
) => {
  const user = await userDbService.findUserById(userId);

  if (user?.id && (await verifyPassword(user?.password, password))) {
    if (await userDbService.emailInUse(email, userId)) {
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

    const updatedRecord = await userDbService.updateProfile(
      userId,
      name,
      email,
      gender,
      dateOfBirth,
      profileImage
    );

    if (updateProfile && profileImage !== user.profileImage)
      deleteUploadedFile(user.profileImage);

    const userDetails = {
      id: userId,
      name,
      email,
      gender,
      dateOfBirth,
      profileImage,
      privilege: user.privilege,
    };

    userCacheService.cacheUserById(userId, userDetails);

    return updatedRecord
      ? {
          success: true,
          body: {
            ...userDetails,
            token: generateToken(userId, name, email, user.privilege),
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
  const user = await userDbService.findUserById(userId);
  const passwordVerified =
    user?.id && (await verifyPassword(user?.password, oldPassword));

  if (passwordVerified && oldPassword !== newPassword) {
    await userDbService.updatePassword(userId, await hashPassword(newPassword));

    return {
      success: true,
      body: { message: "Password updated." },
    };
  } else if (!user?.id) {
    return { success: false, error: new HttpError(404, "User not found.") };
  } else if (!passwordVerified) {
    return { success: false, error: new HttpError(401, "Wrong password.") };
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

export default { getProfileDetails, updateProfile, updatePassword };
