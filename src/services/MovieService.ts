import axios, { isAxiosError } from 'axios';
import dotenv from 'dotenv';
import {
  CastMember,
  MovieCreditsResponse,
  MovieApiResponse,
  Movie,
  MovieDetails,
} from '@/types/Movie';
import { ApiError } from '@/errors/ApiError';

dotenv.config();

const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.TMDB_API_KEY,
    language: 'pt-BR',
  },
});

export const getMovieCast = async (movieId: number): Promise<CastMember[]> => {
  try {
    const response = await tmdbApi.get<MovieCreditsResponse>(
      `/movie/${movieId}/credits`,
    );

    if (response.data.cast.length === 0) {
      throw new ApiError('Elenco não encontrado para este filme', 404);
    }

    return response.data.cast;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const statusCode = error.response.status;
      const message =
        error.response.data?.status_message ||
        'Error communicating with the movie API';
      throw new ApiError(message, statusCode);
    }
    throw new ApiError('Unexpected error fetching movie cast', 500);
  }
};

export const getPopularMovies = async (): Promise<Movie[]> => {
  try {
    const response = await tmdbApi.get<MovieApiResponse>('/movie/popular');
    if (response.data.results.length === 0) {
      throw new ApiError('Nenhum filme popular encontrado', 404);
    }
    return response.data.results;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const statusCode = error.response.status;
      const message =
        error.response.data?.status_message ||
        'Error communicating with the movie API';
      throw new ApiError(message, statusCode);
    }
    throw new ApiError('Unexpected error fetching popular movies', 500);
  }
};

export const searchMovieByName = async (query: string): Promise<Movie[]> => {
  try {
    const response = await tmdbApi.get<MovieApiResponse>('/search/movie', {
      params: { query },
    });
    if (response.data.results.length === 0) {
      throw new ApiError(`Nenhum filme encontrado para "${query}"`, 404);
    }
    return response.data.results.sort((a, b) => {
      const dateA = a.release_date ? new Date(a.release_date).getTime() : 0;
      const dateB = b.release_date ? new Date(b.release_date).getTime() : 0;
      return dateB - dateA;
    });
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const statusCode = error.response.status;
      const message =
        error.response.data?.status_message ||
        'Error communicating with the movie API';
      throw new ApiError(message, statusCode);
    }
    throw new ApiError('Unexpected error searching for movie', 500);
  }
};

export const getMovieDetails = async (
  movieId: number,
): Promise<MovieDetails> => {
  try {
    const response = await tmdbApi.get<MovieDetails>(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const statusCode = error.response.status;
      const message =
        error.response.data?.status_message ||
        'Error communicating with the movie API';
      throw new ApiError(message, statusCode);
    }
    throw new ApiError('Unexpected error fetching movie details', 500);
  }
};

export const getSimilarMovies = async (movieId: number): Promise<Movie[]> => {
  try {
    const response = await tmdbApi.get<MovieApiResponse>(
      `/movie/${movieId}/similar`,
    );
    if (response.data.results.length === 0) {
      throw new ApiError('Nenhum filme similar encontrado', 404);
    }
    return response.data.results;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const statusCode = error.response.status;
      const message =
        error.response.data?.status_message ||
        'Error communicating with the movie API';
      throw new ApiError(message, statusCode);
    }
    throw new ApiError('Unexpected error fetching similar movies', 500);
  }
};

export interface GenreListResponse {
  genres: { id: number; name: string }[];
}

export const getMovieGenres = async (): Promise<
  { id: number; name: string }[]
> => {
  try {
    const response = await tmdbApi.get<GenreListResponse>('/genre/movie/list');
    return response.data.genres;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const statusCode = error.response.status;
      const message =
        error.response.data?.status_message ||
        'Error communicating with the movie API';
      throw new ApiError(message, statusCode);
    }
    throw new ApiError('Unexpected error fetching movie genres', 500);
  }
};

export const getMoviesByGenre = async (genreId: number): Promise<Movie[]> => {
  try {
    const response = await tmdbApi.get<MovieApiResponse>('/discover/movie', {
      params: {
        with_genres: genreId,
      },
    });
    if (response.data.results.length === 0) {
      throw new ApiError('Nenhum filme encontrado para este gênero', 404);
    }
    return response.data.results;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const statusCode = error.response.status;
      const message =
        error.response.data?.status_message ||
        'Error communicating with the movie API';
      throw new ApiError(message, statusCode);
    }
    throw new ApiError('Unexpected error fetching movies by genre', 500);
  }
};
