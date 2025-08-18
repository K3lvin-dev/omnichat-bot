import { Request, Response, NextFunction } from 'express';
import { ApiError } from '@/errors/ApiError';

export const validateNumericId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  if (isNaN(parseInt(id, 10))) {
    return next(new ApiError('The ID in the URL must be a number', 400));
  }

  next();
};
