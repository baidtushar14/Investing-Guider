const conversation = new Map<string, string>();

export const conversationRespository = {
   getLastResponseId(conversationId: string) {
      return conversation.get(conversationId);
   },
   setLastResponseId(conversationId: string, responseId: string) {
      return conversation.set(conversationId, responseId);
   },
};
