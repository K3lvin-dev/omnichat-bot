import { Router } from 'express';
import {
  getMovieCastController,
} from './controllers/MovieController';

const router = Router();

router.get('/movie/:id/cast', getMovieCastController);

export { router };
