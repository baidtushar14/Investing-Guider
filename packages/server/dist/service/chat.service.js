'use strict';
var __importDefault =
   (this && this.__importDefault) ||
   function (mod) {
      return mod && mod.__esModule ? mod : { default: mod };
   };
Object.defineProperty(exports, '__esModule', { value: true });
exports.chatService = void 0;
const openai_1 = __importDefault(require('openai'));
const conversation_repo_1 = require('../repositories/conversation.repo');
const chatbot_1 = require('../prompts/chatbot');
const client = new openai_1.default({
   apiKey: process.env.OPENAI_API_KEY,
   baseURL: 'https://openrouter.ai/api/v1',
});
// const info=fs.readFileSync(path.join(__dirname,'..','prompts'),'utf-8')
const instruction = chatbot_1.CHATBOT_PROMPT;
exports.chatService = {
   async sendMessage(prompt, conversationId) {
      const response = await client.chat.completions.create({
         model: 'openai/gpt-4o-mini', // use a reliable OpenRouter model
         messages: [
            { role: 'system', content: chatbot_1.CHATBOT_PROMPT },
            { role: 'user', content: prompt },
         ],
         temperature: 0.2,
      });
      const messageContent = response.choices[0]?.message.content ?? '';
      const responseId = response.id;
      conversation_repo_1.conversationRespository.setLastResponseId(
         conversationId,
         responseId
      );
      return {
         id: responseId,
         message: messageContent,
      };
   },
};
