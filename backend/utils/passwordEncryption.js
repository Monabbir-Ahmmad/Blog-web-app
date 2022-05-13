import bcryptjs from "bcryptjs";

const hashPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(password, salt);
};

const verifyPassword = async (hashedPassword, enteredPassword) => {
  return await bcryptjs.compare(enteredPassword, hashedPassword);
};

export { hashPassword, verifyPassword };
