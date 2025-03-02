import { StatusCodes } from 'http-status-codes';

export class CustomApiError extends Error {
  statusCode?: StatusCodes;

  constructor(message: string, statusCode?: StatusCodes) {
    super(message);
    this.statusCode = statusCode;
  }
}
