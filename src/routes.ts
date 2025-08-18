import { Router } from 'express';
import {
  getMovieCastController,
  getPopularMoviesController,
  searchMovieByNameController,
  getMovieDetailsController,
  getSimilarMoviesController,
  getMoviesByGenreController,
} from '@/controllers/MovieController';
import { chatbotController } from '@/controllers/ChatbotController';
import { validateNumericId } from '@/middlewares/validationMiddleware';

const router = Router();

router.post('/chatbot', chatbotController);

router.get('/movie/:id/cast', validateNumericId, getMovieCastController);
router.get('/movies/popular', getPopularMoviesController);
router.get('/movies/search', searchMovieByNameController);

router.get('/movie/:id', validateNumericId, getMovieDetailsController);
router.get('/movie/:id/similar', validateNumericId, getSimilarMoviesController);
router.get('/movies/genre', getMoviesByGenreController);

export { router };
