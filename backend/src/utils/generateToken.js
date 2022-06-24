import jwt from "jsonwebtoken";

export const generateRefreshToken = (id, name, email, privilege) => {
  return jwt.sign({ id, name, email, privilege }, process.env.JWT_REFRESH_KEY, {
    expiresIn: "30d",
  });
};

export const generateAccessToken = (id, name, email, privilege) => {
  return jwt.sign({ id, name, email, privilege }, process.env.JWT_ACCESS_KEY, {
    expiresIn: 60 * 10,
  });
};
