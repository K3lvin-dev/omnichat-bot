import { Request, Response, NextFunction } from 'express';
import { CastMember } from '@/types/Movie';
import { getMovieCast } from '@/services/MovieService';

export const getMovieCastController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const movieId = parseInt(req.params.id, 10);
    const cast: CastMember[] | null = await getMovieCast(movieId);
    return res.status(200).json(cast);
  } catch (error) {
    next(error);
  }
};