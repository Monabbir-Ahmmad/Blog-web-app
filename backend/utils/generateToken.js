import jwt from "jsonwebtoken";

const generateToken = (id, name, email, privilege) => {
  return jwt.sign({ id, name, email, privilege }, process.env.JWT_KEY, {
    expiresIn: "30d",
  });
};

export default generateToken;
