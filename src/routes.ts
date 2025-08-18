import { Router } from 'express';
import {
  getMovieCastController,
  getPopularMoviesController,
  searchMovieByNameController,
} from '@/controllers/MovieController';
import { chatbotController } from '@/controllers/ChatbotController';
import { validateNumericId } from '@/middlewares/validationMiddleware';

const router = Router();

router.post('/chatbot', chatbotController);

router.get('/movie/:id/cast', validateNumericId, getMovieCastController);
router.get('/movies/popular', getPopularMoviesController);
router.get('/movies/search', searchMovieByNameController);

export { router };