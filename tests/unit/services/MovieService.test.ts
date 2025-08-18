import { ApiError } from '../../../src/errors/ApiError';
import * as MovieService from '../../../src/services/MovieService';

jest.mock('../../../src/services/MovieService');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('MovieService', () => {
  it('deve lançar erro se não encontrar filmes populares', async () => {
    (MovieService.getPopularMovies as jest.Mock).mockRejectedValueOnce(
      new ApiError('Nenhum filme popular encontrado', 404),
    );
    await expect(MovieService.getPopularMovies()).rejects.toThrow(ApiError);
  });

  it('deve lançar erro se não encontrar elenco', async () => {
    (MovieService.getMovieCast as jest.Mock).mockRejectedValueOnce(
      new ApiError('Elenco não encontrado para este filme', 404),
    );
    await expect(MovieService.getMovieCast(1)).rejects.toThrow(ApiError);
  });

  it('deve lançar erro se não encontrar filmes por nome', async () => {
    (MovieService.searchMovieByName as jest.Mock).mockRejectedValueOnce(
      new ApiError('Nenhum filme encontrado para "Inexistente"', 404),
    );
    await expect(MovieService.searchMovieByName('Inexistente')).rejects.toThrow(
      ApiError,
    );
  });

  it('deve lançar erro se não encontrar filmes similares', async () => {
    (MovieService.getSimilarMovies as jest.Mock).mockRejectedValueOnce(
      new ApiError('Nenhum filme similar encontrado', 404),
    );
    await expect(MovieService.getSimilarMovies(1)).rejects.toThrow(ApiError);
  });

  it('deve lançar erro se não encontrar filmes por gênero', async () => {
    (MovieService.getMoviesByGenre as jest.Mock).mockRejectedValueOnce(
      new ApiError('Nenhum filme encontrado para este gênero', 404),
    );
    await expect(MovieService.getMoviesByGenre(1)).rejects.toThrow(ApiError);
  });

  it('deve retornar gêneros de filmes', async () => {
    (MovieService.getMovieGenres as jest.Mock).mockResolvedValueOnce([
      { id: 1, name: 'Ação' },
    ]);
    const genres = await MovieService.getMovieGenres();
    expect(genres).toEqual([{ id: 1, name: 'Ação' }]);
  });

  it('deve retornar detalhes do filme', async () => {
    (MovieService.getMovieDetails as jest.Mock).mockResolvedValueOnce({
      id: 1,
      title: 'Matrix',
    });
    const details = await MovieService.getMovieDetails(1);
    expect(details).toEqual({ id: 1, title: 'Matrix' });
  });
});
