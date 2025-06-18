import { useState, useCallback } from 'react';
import { aiService } from '../services/aiService';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  timestamp: Date;
}

export const useChat = () => {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      title: 'Welcome to DhrumilAI',
      messages: [
        {
          id: '1',
          content: aiService.isApiConfigured() 
            ? "Hello! I'm DhrumilAI, your advanced AI assistant powered by OpenAI's ChatGPT. I'm here to help you with coding, creative projects, analysis, problem-solving, and much more. What would you like to explore today?"
            : "Hello! I'm DhrumilAI, your AI assistant. I'm currently running in demo mode. To unlock my full capabilities with OpenAI's ChatGPT, please configure your API key. What would you like to explore today?",
          role: 'assistant',
          timestamp: new Date(),
        },
      ],
      timestamp: new Date(),
    },
  ]);
  
  const [activeConversationId, setActiveConversationId] = useState('1');
  const [isLoading, setIsLoading] = useState(false);

  const activeConversation = conversations.find(c => c.id === activeConversationId);

  const sendMessage = useCallback(async (content: string) => {
    if (!activeConversation) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    // Add user message immediately
    setConversations(prev => prev.map(conv => 
      conv.id === activeConversationId 
        ? { ...conv, messages: [...conv.messages, userMessage] }
        : conv
    ));

    setIsLoading(true);

    try {
      // Convert conversation history to the format expected by aiService
      const conversationHistory = activeConversation.messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await aiService.generateResponse(content, conversationHistory);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
      };

      setConversations(prev => prev.map(conv => 
        conv.id === activeConversationId 
          ? { 
              ...conv, 
              messages: [...conv.messages, assistantMessage],
              title: conv.messages.length === 1 ? content.slice(0, 50) + (content.length > 50 ? '...' : '') : conv.title
            }
          : conv
      ));
    } catch (error) {
      console.error('Error generating response:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'I apologize, but I encountered an error while processing your request. Please try again or check your API configuration.',
        role: 'assistant',
        timestamp: new Date(),
      };

      setConversations(prev => prev.map(conv => 
        conv.id === activeConversationId 
          ? { ...conv, messages: [...conv.messages, errorMessage] }
          : conv
      ));
    } finally {
      setIsLoading(false);
    }
  }, [activeConversationId, activeConversation]);

  const createNewConversation = useCallback(() => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      timestamp: new Date(),
    };

    setConversations(prev => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
  }, []);

  const selectConversation = useCallback((id: string) => {
    setActiveConversationId(id);
  }, []);

  const deleteConversation = useCallback((id: string) => {
    setConversations(prev => {
      const filtered = prev.filter(conv => conv.id !== id);
      if (filtered.length === 0) {
        // Create a new conversation if all are deleted
        const newConv: Conversation = {
          id: Date.now().toString(),
          title: 'New Chat',
          messages: [],
          timestamp: new Date(),
        };
        setActiveConversationId(newConv.id);
        return [newConv];
      }
      
      if (id === activeConversationId) {
        setActiveConversationId(filtered[0].id);
      }
      
      return filtered;
    });
  }, [activeConversationId]);

  return {
    conversations,
    activeConversation,
    activeConversationId,
    isLoading,
    sendMessage,
    createNewConversation,
    selectConversation,
    deleteConversation,
  };
};