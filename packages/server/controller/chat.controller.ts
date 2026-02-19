import type { Request, Response } from 'express';
import { chatService } from '../service/chat.service';
import z from 'zod';

const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'prompt is required')
      .max(1000, 'Prompt is too long'),
   conversationId: z.string().uuid(),
});

export const chatController = {
   async sendMessage(req: Request, res: Response) {
      const parse = chatSchema.safeParse(req.body);
      if (!parse.success) {
         res.status(400).json(parse.error.format());
         return;
      }
      try {
         const { prompt, conversationId } = req.body;
         const response = await chatService.sendMessage(prompt, conversationId);
         res.json({ message: response.message });
      } catch (error) {
         res.status(500).json({ error: 'Failed to generate the response' });
      }
   },
};
