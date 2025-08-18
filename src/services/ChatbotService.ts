import { ChatOpenAI } from '@langchain/openai';
import { AgentExecutor, initializeAgentExecutorWithOptions } from 'langchain/agents';

import { movieTools } from '@/tools/movieTools';

// Inicializa o modelo da OpenAI.
const model: ChatOpenAI = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0,
});

// Singleton para o executor do agente para evitar reinicialização a cada chamada.
let executor: AgentExecutor | null = null;

const initializeExecutor = async () => {
  if (!executor) {
    executor = await initializeAgentExecutorWithOptions(movieTools, model, {
      agentType: 'openai-functions',
      verbose: true, // Defina como false em produção
    });
  }
};

// A função principal que lida com a consulta do chatbot.
export const handleChatQuery = async (query: string): Promise<string> => {
  await initializeExecutor();
  try {
    console.log(`Executando agente com a consulta: ${query}`);
    const result = await executor!.run(query);
    return result;
  } catch (e: unknown) {
    let errorMessage = 'Desculpe, ocorreu um erro ao processar sua solicitação.';
    if (e instanceof Error) {
      errorMessage = `Erro ao executar o agente LangChain: ${e.message}`;
    } else {
      errorMessage = `Erro ao executar o agente LangChain: ${String(e)}`;
    }
    console.error(errorMessage);
    return errorMessage;
  }
};
