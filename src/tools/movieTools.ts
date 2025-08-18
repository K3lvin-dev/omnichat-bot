import { DynamicTool, Tool } from '@langchain/core/tools';

import {
  getPopularMovies,
  searchMovieByName,
  getMovieCast,
} from '@/services/MovieService';

// Define as ferramentas que o agente pode usar.
export const movieTools: Tool[] = [
  new DynamicTool({
    name: 'getPopularMovies',
    description:
      'Retorna uma lista de filmes que estão populares no momento. Use esta ferramenta quando o usuário perguntar sobre filmes populares.',
    func: async () => {
      try {
        const movies = await getPopularMovies();
        // Retorna um resumo em string dos 5 filmes mais populares.
        return JSON.stringify(
          movies
            .slice(0, 5)
            .map((m) => ({ title: m.title, overview: m.overview, vote_average: m.vote_average})),
        );
      } catch (error: unknown) {
        let errorMessage = 'Erro ao buscar filmes populares.';
        if (error instanceof Error) {
          errorMessage = `Erro ao buscar filmes populares: ${error.message}`;
        } else {
          errorMessage = `Erro ao buscar filmes populares: ${String(error)}`;
        }
        return errorMessage;
      }
    },
  }),
  new DynamicTool({
    name: 'searchMovieByName',
    description:
      'Pesquisa filmes pelo nome e retorna uma lista de filmes correspondentes, incluindo seus IDs. Use esta ferramenta quando o usuário perguntar sobre um filme específico pelo nome e você precisar do ID do filme para outras operações.',
    func: async (query: string) => {
      try {
        const movies = await searchMovieByName(query);
        return JSON.stringify(
          movies.map((m) => ({ id: m.id, title: m.title, overview: m.overview })),
        );
      } catch (error: unknown) {
        let errorMessage = 'Erro ao pesquisar filme.';
        if (error instanceof Error) {
          errorMessage = `Erro ao pesquisar filme: ${error.message}`;
        } else {
          errorMessage = `Erro ao pesquisar filme: ${String(error)}`;
        }
        return errorMessage;
      }
    },
  }),
  new DynamicTool({
    name: 'getMovieCast',
    description:
      'Retorna o elenco de um filme dado o ID numérico do filme. Este ID deve ser obtido previamente usando a ferramenta searchMovieByName. Use esta ferramenta quando o usuário perguntar sobre o elenco de um filme e você tiver o ID do filme.',
    func: async (movieId: string) => {
      try {
        const cast = await getMovieCast(parseInt(movieId, 10));
        return JSON.stringify(
          cast.map((member) => ({ name: member.name, character: member.character })),
        );
      } catch (error: unknown) {
        let errorMessage = 'Erro ao buscar elenco do filme.';
        if (error instanceof Error) {
          errorMessage = `Erro ao buscar elenco do filme: ${error.message}`;
        } else {
          errorMessage = `Erro ao buscar elenco do filme: ${String(error)}`;
        }
        return errorMessage;
      }
    },
  }),
];
