import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
async function moderateContent(text: string): Promise<boolean> {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return false;
    const response = await axios.post(
      'https://api.openai.com/v1/moderations',
      { input: text },
      { headers: { Authorization: `Bearer ${apiKey}` } },
    );
    return response.data.results[0].flagged;
  } catch {
    return false;
  }
}

async function isCinemaRelatedLLM(text: string): Promise<boolean> {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return true;
    const prompt = `Esse texto responde a uma pergunta sobre cinema, filmes, atores, gêneros, sinopse, avaliações, elenco, recomendações ou temas relacionados? Responda apenas "sim" ou "não". Texto: ${text}`;
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 3,
      },
      { headers: { Authorization: `Bearer ${apiKey}` } },
    );
    const answer = response.data.choices[0].message.content
      .trim()
      .toLowerCase();
    return answer === 'sim';
  } catch {
    return true;
  }
}

export async function guardrailsMiddleware(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const llmResponse = res.locals.llmResponse;

  if (typeof llmResponse === 'string') {
    const flagged = await moderateContent(llmResponse);
    if (flagged) {
      return res.status(403).json({
        error: 'Desculpe, não posso responder a essa solicitação.',
      });
    }
    const isCinema = await isCinemaRelatedLLM(llmResponse);
    if (isCinema) {
      return res.status(200).json({ response: llmResponse });
    } else {
      return res.status(403).json({
        error: 'Só posso responder perguntas sobre cinema.',
      });
    }
  }
}
