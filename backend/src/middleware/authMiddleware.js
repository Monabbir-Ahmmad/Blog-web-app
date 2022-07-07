import HttpError from "../utils/httpError.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import userCache from "../repository/cache_repository/userCache.js";
import userDb from "../repository/db_repository/userDb.js";

export const verifyToken = asyncHandler(async (req, res, next) => {
  let token;
  let user;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_KEY);

      user = await userCache.getUserById(
        decodedToken.id,
        async () => await userDb.findUserById(decodedToken.id)
      );

      if (user?.id) {
        req.user = {
          id: user.id,
          email: user.email,
          name: user.name,
          privilege: user.privilege,
        };
        next();
      } else {
        throw new HttpError(
          401,
          "Not authorized. Token failed. Could not find user."
        );
      }
    }
    if (!token) {
      throw new HttpError(401, "Not authorized. No token found.");
    }
  } catch (error) {
    console.log(error);
    if (error.statusCode) throw error;
    else throw new HttpError(401, "Not authorized. Token failed.");
  }
});
