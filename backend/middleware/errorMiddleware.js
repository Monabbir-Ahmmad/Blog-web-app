import deleteFile from "../utils/deleteFile.js";

const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);

  res.status(404);

  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  if (req.file) {
    deleteFile(req.file);
  }

  res.status(statusCode);

  res.json({
    message: err.message,
  });
};

export { notFound, errorHandler };
