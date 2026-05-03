import OpenAI from 'openai';
import { conversationRespository } from '../repositories/conversation.repo';
import fs from 'fs';
import path from 'path';

const getTemplate = () => {
   return fs.readFileSync(
      path.join(__dirname, '..', 'prompts', 'chatbot.txt'),
      'utf-8'
   );
};

const client = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
   baseURL: 'https://openrouter.ai/api/v1',
});
// const info=fs.readFileSync(path.join(__dirname,'..','prompts'),'utf-8')
const instruction = getTemplate();
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
         instructions: instruction,
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
