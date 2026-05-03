import OpenAI from 'openai';
import { conversationRespository } from '../repositories/conversation.repo';
import { CHATBOT_PROMPT } from '../prompts/chatbot';

const client = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
   baseURL: 'https://openrouter.ai/api/v1',
});
// const info=fs.readFileSync(path.join(__dirname,'..','prompts'),'utf-8')
const instruction = CHATBOT_PROMPT;
type chatResponse = {
   id: string;
   message: string;
};
export const chatService = {
   async sendMessage(
      prompt: string,
      conversationId: string
   ): Promise<chatResponse> {
      const response = await client.chat.completions.create({
         model: 'openai/gpt-4o-mini', // use a reliable OpenRouter model
         messages: [
            { role: 'system', content: CHATBOT_PROMPT },
            { role: 'user', content: prompt },
         ],
         temperature: 0.2,
      });

      const messageContent = response.choices[0]?.message.content ?? '';
      const responseId = response.id;

      conversationRespository.setLastResponseId(conversationId, responseId);

      return {
         id: responseId,
         message: messageContent,
      };
   },
};
