import { AppError } from '../utils/errors.js';

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      code: err.statusCode
    });
  }

  // Handle unexpected errors
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    code: 500
  });
};