import { Router } from 'express';
import {
  getMovieCastController,
} from '@/controllers/MovieController';
import { validateNumericId } from '@/middlewares/validationMiddleware'; 

const router = Router();

router.get('/movie/:id/cast', validateNumericId, getMovieCastController);

export { router };
