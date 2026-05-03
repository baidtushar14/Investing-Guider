'use strict';
var __importDefault =
   (this && this.__importDefault) ||
   function (mod) {
      return mod && mod.__esModule ? mod : { default: mod };
   };
Object.defineProperty(exports, '__esModule', { value: true });
exports.chatController = void 0;
const chat_service_1 = require('../service/chat.service');
const zod_1 = __importDefault(require('zod'));
const chatSchema = zod_1.default.object({
   prompt: zod_1.default
      .string()
      .trim()
      .min(1, 'prompt is required')
      .max(1000, 'Prompt is too long'),
   conversationId: zod_1.default.string().uuid(),
});
exports.chatController = {
   async sendMessage(req, res) {
      const parse = chatSchema.safeParse(req.body);
      if (!parse.success) {
         res.status(400).json(parse.error.format());
         return;
      }
      try {
         const { prompt, conversationId } = req.body;
         const response = await chat_service_1.chatService.sendMessage(
            prompt,
            conversationId
         );
         res.json({ message: response.message });
      } catch (error) {
         res.status(500).json({ error: 'Failed to generate the response' });
      }
   },
};
