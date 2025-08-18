import { Request, Response, NextFunction } from 'express';
import { ApiError } from '@/errors/ApiError';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error('Erro capturado pelo Middleware:', err.stack);
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'An unexpected server error occurred.',
  });
};
