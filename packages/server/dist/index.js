'use strict';
var __importDefault =
   (this && this.__importDefault) ||
   function (mod) {
      return mod && mod.__esModule ? mod : { default: mod };
   };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const dotenv_1 = __importDefault(require('dotenv'));
const cors_1 = __importDefault(require('cors'));
const route_1 = __importDefault(require('./route'));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(
   (0, cors_1.default)({
      origin: 'https://investing-guider.vercel.app',
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type'],
   })
);
app.use(express_1.default.json());
app.use(route_1.default);
if (process.env.NODE_ENV !== 'production') {
   const port = process.env.PORT || 3000;
   app.listen(port, () => {
      console.log(`Server is running on ${port}`);
   });
}
exports.default = app;
