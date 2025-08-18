import { Router } from 'express';
import { chatbotController } from '@/controllers/ChatbotController';

const router = Router();

router.post('/chatbot', chatbotController);



export { router };
