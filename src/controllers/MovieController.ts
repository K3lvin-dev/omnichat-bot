import { Request, Response, NextFunction } from 'express';
import { CastMember, Movie } from '@/types/Movie';
import { getMovieCast, getPopularMovies, searchMovieByName } from '@/services/MovieService';

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

export const getPopularMoviesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const movies: Movie[] = await getPopularMovies();
    return res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
};

export const searchMovieByNameController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { query } = req.query;
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ message: 'Query parameter is required' });
    }
    const movies: Movie[] = await searchMovieByName(query);
    return res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
};
