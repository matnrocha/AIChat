import { Request, Response, NextFunction } from 'express';
import { ApiResponseHandler } from '../utils/apiResponse';

export const apiWrapper = (handler: (req: Request, res: Response) => Promise<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res);
    } catch (error) {
      next(error);
    }
  };
};