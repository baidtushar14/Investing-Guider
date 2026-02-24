import { useMemo, useState } from 'react';
import axios from 'axios';
import TypingIndicator from './typingIndicator';
import ChatMessages, { type Message } from './ChatMessages';
import ChatInput, { type formData } from './ChatInput';
type ChatResponse = {
   message: string;
};
const ChatBot = () => {
   const conversationId = useMemo(() => crypto.randomUUID(), []);
   const [messages, setMessages] = useState<Message[]>([]);
   const [isBotType, setIsBotType] = useState(false);
   const [error, setError] = useState('');
   const onSubmit = async ({ prompt }: formData) => {
      try {
         setError('');
         setMessages((prev) => [...prev, { content: prompt, role: 'user' }]);
         setIsBotType(true);
         const { data } = await axios.post<ChatResponse>('/api/chat', {
            prompt,
            conversationId,
         });
         setMessages((prev) => [
            ...prev,
            { content: data.message, role: 'bot' },
         ]);
         setIsBotType(false);
      } catch (error) {
         console.error(error);
         setError('Something went wrong. Try after sometime.');
      } finally {
         setIsBotType(false);
      }
   };

   return (
      <div className="flex flex-col h-full">
         <div className="flex flex-col gap-3 mb-10 flex-1 overflow-y-auto">
            <ChatMessages messages={messages} />
            {isBotType && <TypingIndicator />}
            {error && <p className="text-red-500">{error}</p>}
         </div>
         <ChatInput onSubmit={onSubmit} />
      </div>
   );
};

export default ChatBot;
