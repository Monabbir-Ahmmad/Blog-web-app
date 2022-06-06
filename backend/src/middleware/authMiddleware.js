import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import HttpError from "../utils/httpError.js";

export const verifyToken = asyncHandler(async (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decodedToken = jwt.verify(token, process.env.JWT_KEY);

      req.user = {
        id: decodedToken.id,
        email: decodedToken.email,
        name: decodedToken.name,
        privilege: decodedToken.privilege,
      };

      next();
    } catch (error) {
      console.error(error);
      throw new HttpError(401, "Not authorized. Token failed.");
    }
  }

  if (!token) {
    throw new HttpError(401, "Not authorized. No token found.");
  }
});
