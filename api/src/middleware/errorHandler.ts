import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CustomApiError } from '../errors/customApiError';

export const errorHandlerMiddleware = (
  err: CustomApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);

  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something went wrong',
  };

  res.status(customError.statusCode).json({ message: customError.message });
};
