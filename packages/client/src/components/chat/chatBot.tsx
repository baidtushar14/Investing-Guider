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
      } catch (error) {
         console.error(error);
         setError('Something went wrong. Try again.');
      } finally {
         setIsBotType(false);
      }
   };

   return (
      <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center ">
         <div className="w-full h-full flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
               <h1 className="text-lg font-semibold text-white">
                  💰 Investing Guide
               </h1>
               <span className="text-xs text-gray-400">AI Assistant</span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 [scrollbar-width:none]">
               <ChatMessages messages={messages} />

               {isBotType && (
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                     <TypingIndicator />
                     <span>Analyzing...</span>
                  </div>
               )}

               {error && (
                  <p className="text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg text-sm">
                     {error}
                  </p>
               )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-white/5">
               <ChatInput onSubmit={onSubmit} />
            </div>
         </div>
      </div>
   );
};

export default ChatBot;
