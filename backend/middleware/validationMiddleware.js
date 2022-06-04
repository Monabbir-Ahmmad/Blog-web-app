import { validationResult } from "express-validator";
import HttpError from "../utils/httpError.js";

export const validationCheck = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError(
      400,
      errors
        .array()
        .map((e) => e.msg)
        .join(" ")
    );
  }

  next();
};
