import { Request, Response } from 'express';
import { CastMember } from '../types/Movie';
import { getMovieCast } from '../services/MovieService';

export const getMovieCastController = async (req: Request, res: Response) => {
  try {
    const movieId = parseInt(req.params.id, 10);

    if (isNaN(movieId)) {
      return res.status(400).json({ message: 'O ID do filme é inválido' });
    }

    const cast: CastMember[] | null = await getMovieCast(movieId);

    if (cast && cast.length > 0) {
      return res.status(200).json(cast);
    } else {
      return res
        .status(404)
        .json({ message: 'Elenco não encontrado para este filme' });
    }
  } catch (error) {
    console.error('Erro no controller ao buscar elenco do filme:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};
