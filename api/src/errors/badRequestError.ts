import { StatusCodes } from 'http-status-codes';
import { CustomApiError } from './customApiError';

export class BadRequestError extends CustomApiError {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
