import deleteUploadedFile from "../utils/deleteUploadedFile.js";

const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  error.statusCode = 404;

  next(error);
};

const errorHandler = (err, req, res, next) => {
  if (!err.statusCode) {
    console.error(err);
  }

  err.statusCode = err.statusCode || 500;

  if (req.file) {
    deleteUploadedFile(req.file.filename);
  }

  res.status(err.statusCode).json({
    statusCode: err.statusCode,
    message: err.message,
  });
};

export default { notFound, errorHandler };
