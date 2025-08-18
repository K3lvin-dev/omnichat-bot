import { Request, Response, NextFunction } from 'express';
import { handleChatQuery } from '@/services/ChatbotService';

export const chatbotController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { query } = req.body;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ message: 'Query parameter is required' });
    }

    const result = await handleChatQuery(query);

    let cleanedResult = result.replace(/\n/g, ' ');
    cleanedResult = cleanedResult.replace(/"/g, '');
    cleanedResult = cleanedResult.replace(/\s+/g, ' ').trim();

    res.locals.llmResponse = cleanedResult;
    next();
  } catch (error) {
    next(error);
  }
};
