import OpenAI from 'openai';
import { conversationRespository } from '../repositories/conversation.repo';

const client = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
   baseURL: 'https://openrouter.ai/api/v1',
});
type chatResponse = {
   id: string;
   message: string;
};
export const chatService = {
   async sendMessage(
      prompt: string,
      conversationId: string
   ): Promise<chatResponse> {
      const response = await client.responses.create({
         model: 'openai/gpt-oss-120b:free',
         input: prompt,
         temperature: 0.2,
         previous_response_id:
            conversationRespository.getLastResponseId(conversationId),
      });
      conversationRespository.setLastResponseId(conversationId, response.id);
      return {
         id: response.id,
         message: response.output_text,
      };
   },
};
