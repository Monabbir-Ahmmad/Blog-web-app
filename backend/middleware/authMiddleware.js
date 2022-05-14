import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

const verifyToken = asyncHandler(async (req, res, next) => {
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
      res.status(401);
      throw new Error("Not authorized. Token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized. No token found");
  }
});
export { verifyToken };
