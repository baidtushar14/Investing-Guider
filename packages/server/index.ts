import express from 'express';
import dotenv from 'dotenv';
import router from './route';

dotenv.config();

const app = express();
app.use(express.json());
app.use(router);

// Only listen locally, not on Vercel
if (process.env.NODE_ENV !== 'production') {
   const port = process.env.PORT || 3000;
   app.listen(port, () => {
      console.log(`Server is running on ${port}`);
   });
}

export default app;
