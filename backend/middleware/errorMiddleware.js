const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404); // Set the response status code and send the error message
  next(error);
};

const errorHandler = (err, req, res, next) => {
  // Set the status code to 500 if the status code is not already set
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode); // Send the error message in the response

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }

  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };
