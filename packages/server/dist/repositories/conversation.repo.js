'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.conversationRespository = void 0;
const conversation = new Map();
exports.conversationRespository = {
   getLastResponseId(conversationId) {
      return conversation.get(conversationId);
   },
   setLastResponseId(conversationId, responseId) {
      return conversation.set(conversationId, responseId);
   },
};
