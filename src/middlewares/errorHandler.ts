import { Request, Response, NextFunction } from 'express';
import { ApiError } from '@/errors/ApiError'; // 1. Importar a nossa classe

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
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
    message: 'Ocorreu um erro inesperado no servidor.',
  });
};
