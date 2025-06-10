// src/utils/apiResponse.ts
import { Response } from 'express';
import { 
  ApiResponse,
  ApiSuccessResponse, 
  ApiErrorResponse 
} from '../types/api-response';
import { CustomError } from '../errors/CustomError';

export class ApiResponseHandler {
  static sendSuccess<T>(res: Response, data: T, statusCode = 200): void {
    const response: ApiSuccessResponse<T> = {
      success: true,
      data,
      timestamp: new Date().toISOString(),
      path: res.req.originalUrl,
    };

    res.status(statusCode).json(response);
  }

  static sendError(
    res: Response,
    code: string,
    message: string,
    statusCode = 400,
    details?: any
  ): void {
    const response: ApiErrorResponse = {
      success: false,
      error: {
        code,
        message,
        details,
      },
      timestamp: new Date().toISOString(),
      path: res.req.originalUrl,
    };

    res.status(statusCode).json(response);
  }

  static sendCustomError(res: Response, error: CustomError): void {
    this.sendError(
      res,
      error.code,
      error.message,
      error.statusCode,
      error.details
    );
  }
}