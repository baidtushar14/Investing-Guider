import express, { type Request, type Response } from 'express';
import { chatController } from './controller/chat.controller';

const router = express.Router();
router.use(express.json());
router.get('/', (req: Request, res: Response) => {
   res.send('Hello World!');
});

router.get('/api/hello', (req: Request, res: Response) => {
   res.json({ message: 'Hello World!' });
});

router.post('/api/chat', chatController.sendMessage);

export default router;
