import { ErrorRequestHandler } from 'express';
import { ApiResponseHandler } from '../utils/apiResponse';
import { CustomError } from '../errors/CustomError';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    ApiResponseHandler.sendCustomError(res, err);
  } else {
    ApiResponseHandler.sendError(
      res,
      'SERVER_ERROR',
      'Internal server error',
      500,
      process.env.NODE_ENV === 'development' ? err.stack : undefined
    );
  }
};