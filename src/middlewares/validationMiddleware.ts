import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../errors/ApiError';

export const validateNumericId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  if (isNaN(parseInt(id, 10))) {
    return next(new ApiError('O ID na URL deve ser um número', 400));
  }

  next();
};
