'use strict';
var __importDefault =
   (this && this.__importDefault) ||
   function (mod) {
      return mod && mod.__esModule ? mod : { default: mod };
   };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const chat_controller_1 = require('./controller/chat.controller');
const router = express_1.default.Router();
router.use(express_1.default.json());
router.get('/', (req, res) => {
   res.send('Hello World!');
});
router.get('/api/hello', (req, res) => {
   res.json({ message: 'Hello World!' });
});
router.post('/api/chat', chat_controller_1.chatController.sendMessage);
exports.default = router;
