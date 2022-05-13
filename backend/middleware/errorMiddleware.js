const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);

  console.error(error);

  res.status(404);

  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  console.error(err);

  res.status(statusCode);

  res.json({
    message: err.message,
  });
};

export { notFound, errorHandler };
