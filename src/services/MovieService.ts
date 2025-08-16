import axios, { isAxiosError } from 'axios';
import dotenv from 'dotenv';
import { CastMember, MovieCreditsResponse } from '../types/Movie';

dotenv.config();

const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.TMDB_API_KEY,
    language: 'pt-BR',
  },
});

export const getMovieCast = async (
  movieId: number,
): Promise<CastMember[] | null> => {
  try {
    const response = await tmdbApi.get<MovieCreditsResponse>(
      `/movie/${movieId}/credits`,
    );

    return response.data.cast;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(
        'Erro do Axios ao buscar elenco do filme:',
        error.response?.data,
      );
    } else {
      console.error('Erro inesperado ao buscar elenco do filme:', error);
    }
    return null;
  }
};
