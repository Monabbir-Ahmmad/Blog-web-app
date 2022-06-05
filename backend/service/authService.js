import generateToken from "../utils/generateToken.js";
import HttpError from "../utils/httpError.js";
import { hashPassword, verifyPassword } from "../utils/passwordEncryption.js";
import userCacheService from "./cache_service/userCacheService.js";
import userDbService from "./db_service/userDbService.js";

const signup = async (
  name,
  email,
  gender,
  dateOfBirth,
  password,
  profileImage
) => {
  if (await userDbService.emailInUse(email)) {
    return {
      success: false,
      error: new HttpError(409, "Email is already in use."),
    };
  }

  const user = await userDbService.createUser(
    name,
    email,
    dateOfBirth,
    gender,
    await hashPassword(password),
    profileImage
  );

  userCacheService.cacheUserById(user.id, {
    id: user.id,
    name: user.name,
    email: user.email,
    gender: user.gender,
    dateOfBirth: user.dateOfBirth,
    profileImage: user.profileImage,
    privilege: user.privilege,
  });

  return {
    success: true,
    body: {
      id: user.id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      privilege: user.privilege,
      token: generateToken(user.id, user.name, user.email, user.privilege),
    },
  };
};

const signin = async (email, password) => {
  const user = await userDbService.findUserByEmail(email);

  if (user?.id && (await verifyPassword(user?.password, password))) {
    userCacheService.cacheUserById(user.id, {
      id: user.id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
      profileImage: user.profileImage,
      privilege: user.privilege,
    });

    return {
      success: true,
      body: {
        id: user.id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        privilege: user.privilege,
        token: generateToken(user.id, user.name, user.email, user.privilege),
      },
    };
  } else {
    return {
      success: false,
      error: new HttpError(401, "Invalid credentials."),
    };
  }
};

export default { signup, signin };
