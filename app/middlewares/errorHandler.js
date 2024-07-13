import { INTERNAL_SERVER_ERROR } from '../constants/errors.js';

const ErrorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || INTERNAL_SERVER_ERROR;

  res.status(status).json({
    message,
  });
};

export default ErrorHandler;
