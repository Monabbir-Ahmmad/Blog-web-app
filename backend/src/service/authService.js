import generateToken from "../utils/generateToken.js";
import HttpError from "../utils/httpError.js";
import { hashPassword, verifyPassword } from "../utils/passwordEncryption.js";
import userDb from "../repository/db_repository/userDb.js";

const signup = async (
  name,
  email,
  gender,
  dateOfBirth,
  password,
  profileImage
) => {
  if (await userDb.emailInUse(email)) {
    return {
      success: false,
      error: new HttpError(409, "Email is already in use."),
    };
  }

  const user = await userDb.createUser(
    name,
    email,
    dateOfBirth,
    gender,
    await hashPassword(password),
    profileImage
  );

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
  const user = await userDb.findUserByEmail(email);

  if (user?.id && (await verifyPassword(user?.password, password))) {
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
