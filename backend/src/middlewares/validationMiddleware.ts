import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { CustomError } from '../errors/CustomError';
import { ErrorTypes } from '../errors/ErrorTypes';

export const validate = (schema: AnyZodObject) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const firstError = error.errors[0];
        throw new CustomError(
          ErrorTypes.VALIDATION_ERROR,
          firstError.message,
          422
        );
      }
      next(error);
    }
  };