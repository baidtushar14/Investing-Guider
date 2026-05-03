import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './route';

dotenv.config();

const app = express();

app.use(
   cors({
      origin: 'https://investing-guider.vercel.app',
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type'],
   })
);

app.use(express.json());
app.use(router);

if (process.env.NODE_ENV !== 'production') {
   const port = process.env.PORT || 3000;
   app.listen(port, () => {
      console.log(`Server is running on ${port}`);
   });
}

export default app;
