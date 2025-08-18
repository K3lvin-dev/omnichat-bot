import { Request, Response, NextFunction } from 'express';
import { handleChatQuery } from '@/services/ChatbotService';
import { ApiError } from '@/errors/ApiError';

const cleanLlmResponse = (response: string): string => {
  let cleanedResult = response.replace(/\n/g, ' ');
  cleanedResult = cleanedResult.replace(/"/g, '');
  cleanedResult = cleanedResult.replace(/\s+/g, ' ').trim();
  return cleanedResult;
};

export const chatbotController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { query } = req.body;

    if (!query || typeof query !== 'string') {
      throw new ApiError('Query parameter is required', 400);
    }

    const result = await handleChatQuery(query);
    res.locals.llmResponse = cleanLlmResponse(result);
    next();
  } catch (error) {
    next(error);
  }
};

