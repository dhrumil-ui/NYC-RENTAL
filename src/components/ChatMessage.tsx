import React from 'react';
import { Bot, User, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';

interface ChatMessageProps {
  message: {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
  };
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
  };

  return (
    <div className={`flex gap-4 p-6 ${isUser ? 'bg-transparent' : 'bg-gray-50'} hover:bg-gray-50/50 transition-colors duration-200`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser ? 'bg-blue-600' : 'bg-emerald-600'
      }`}>
        {isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Bot className="w-4 h-4 text-white" />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-gray-900">
            {isUser ? 'You' : 'DhrumilAI'}
          </span>
          <span className="text-xs text-gray-500">
            {message.timestamp.toLocaleTimeString()}
          </span>
        </div>
        
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>
        
        {!isUser && (
          <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={copyToClipboard}
              className="p-1.5 rounded-md hover:bg-gray-200 transition-colors"
              title="Copy message"
            >
              <Copy className="w-4 h-4 text-gray-500" />
            </button>
            <button
              className="p-1.5 rounded-md hover:bg-gray-200 transition-colors"
              title="Good response"
            >
              <ThumbsUp className="w-4 h-4 text-gray-500" />
            </button>
            <button
              className="p-1.5 rounded-md hover:bg-gray-200 transition-colors"
              title="Bad response"
            >
              <ThumbsDown className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};