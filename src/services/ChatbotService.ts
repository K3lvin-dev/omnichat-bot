import { ChatOpenAI } from '@langchain/openai';
import { AgentExecutor, initializeAgentExecutorWithOptions } from 'langchain/agents';
import { movieTools } from '@/tools/movieTools';

const model: ChatOpenAI = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0,
});

let executor: AgentExecutor | null = null;

const initializeExecutor = async () => {
  if (!executor) {
    try {
      executor = await initializeAgentExecutorWithOptions(movieTools, model, {
        agentType: 'openai-functions',
      });
    } catch (error) {
      console.error('Failed to initialize LangChain executor:', error);
      throw new Error('Failed to initialize chatbot service.');
    }
  }
};

export const handleChatQuery = async (query: string): Promise<string> => {
  await initializeExecutor();
  try {
    const result = await executor!.run(query);
    return result;
  } catch (e: unknown) {
    let errorMessage = 'Desculpe, ocorreu um erro ao processar sua solicitação.';
    if (e instanceof Error) {
      errorMessage = `Erro ao executar o agente LangChain: ${e.message}`;
    } else {
      errorMessage = `Erro ao executar o agente LangChain: ${String(e)}`;
    }
    return errorMessage;
  }
};
