import { Request, Response, NextFunction } from 'express';
import { CastMember, Movie } from '@/types/Movie';
import { getMovieCast, getPopularMovies, searchMovieByName, getMovieDetails, getSimilarMovies, getMovieGenres, getMoviesByGenre } from '@/services/MovieService';
import { ApiError } from '@/errors/ApiError';

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
      throw new ApiError('Query parameter is required', 400);
    }
    const movies: Movie[] = await searchMovieByName(query);
    return res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
};

export const getMovieDetailsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const movieId = parseInt(req.params.id, 10);
    const movieDetails = await getMovieDetails(movieId);
    return res.status(200).json(movieDetails);
  } catch (error) {
    next(error);
  }
};

export const getSimilarMoviesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const movieId = parseInt(req.params.id, 10);
    const similarMovies = await getSimilarMovies(movieId);
    return res.status(200).json(similarMovies);
  } catch (error) {
    next(error);
  }
};

export const getMoviesByGenreController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { genre } = req.query;
    if (!genre || typeof genre !== 'string') {
      throw new ApiError('Genre query parameter is required', 400);
    }

    const genres = await getMovieGenres();
    const targetGenre = genres.find(g => g.name.toLowerCase() === genre.toLowerCase());

    if (!targetGenre) {
      throw new ApiError(`Genre "${genre}" not found`, 404);
    }

    const movies = await getMoviesByGenre(targetGenre.id);
    return res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
};
