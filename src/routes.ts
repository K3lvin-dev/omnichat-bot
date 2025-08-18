import { Router } from 'express';
import { chatbotController } from '@/controllers/ChatbotController';

const router = Router();

import { guardrailsMiddleware } from '@/middlewares/guardrailsMiddleware';

router.post('/chatbot', chatbotController, guardrailsMiddleware);

export { router };
