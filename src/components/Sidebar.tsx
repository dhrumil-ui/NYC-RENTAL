import React from 'react';
import { Plus, MessageSquare, Settings, HelpCircle, Bot, Trash2 } from 'lucide-react';
import { ApiStatus } from './ApiStatus';

interface SidebarProps {
  conversations: Array<{
    id: string;
    title: string;
    timestamp: Date;
  }>;
  activeConversationId: string;
  onNewConversation: () => void;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  activeConversationId,
  onNewConversation,
  onSelectConversation,
  onDeleteConversation,
}) => {
  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            DhrumilAI
          </h1>
        </div>
        
        <button
          onClick={onNewConversation}
          className="w-full flex items-center gap-3 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors mb-3"
        >
          <Plus className="w-4 h-4" />
          <span>New Chat</span>
        </button>

        <ApiStatus />
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`group flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                conversation.id === activeConversationId
                  ? 'bg-gray-700'
                  : 'hover:bg-gray-800'
              }`}
              onClick={() => onSelectConversation(conversation.id)}
            >
              <MessageSquare className="w-4 h-4 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate">{conversation.title}</p>
                <p className="text-xs text-gray-400">
                  {conversation.timestamp.toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteConversation(conversation.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-600 rounded transition-all"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700 space-y-2">
        <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-800 rounded-lg transition-colors text-sm">
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-800 rounded-lg transition-colors text-sm">
          <HelpCircle className="w-4 h-4" />
          <span>Help & FAQ</span>
        </button>
      </div>
    </div>
  );
};