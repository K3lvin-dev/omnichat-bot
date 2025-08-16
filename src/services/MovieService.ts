import axios, { isAxiosError } from 'axios';
import dotenv from 'dotenv';
import { CastMember, MovieCreditsResponse } from '@/types/Movie';
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
      const message = error.response.data?.status_message || 'Error communicating with the movie API';
      throw new ApiError(message, statusCode);
    }
    throw new ApiError('Unexpected error fetching movie cast', 500);
  }
};
