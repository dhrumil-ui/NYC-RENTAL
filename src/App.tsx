import React from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { TypingIndicator } from './components/TypingIndicator';
import { useChat } from './hooks/useChat';

function App() {
  const {
    conversations,
    activeConversation,
    activeConversationId,
    isLoading,
    sendMessage,
    createNewConversation,
    selectConversation,
    deleteConversation,
  } = useChat();

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <Sidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onNewConversation={createNewConversation}
        onSelectConversation={selectConversation}
        onDeleteConversation={deleteConversation}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto">
          {activeConversation?.messages.map((message) => (
            <div key={message.id} className="group">
              <ChatMessage message={message} />
            </div>
          ))}
          
          {isLoading && <TypingIndicator />}
          
          {/* Empty state */}
          {!activeConversation?.messages.length && !isLoading && (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center max-w-md">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to DhrumilAI</h2>
                <p className="text-gray-600 mb-6">
                  I'm your advanced AI assistant, powered by cutting-edge machine learning models. 
                  I can help you with coding, creative writing, analysis, problem-solving, and much more.
                </p>
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="bg-gray-50 rounded-lg p-3 text-left">
                    <div className="font-medium text-gray-900 mb-1">💻 Code & Development</div>
                    <div className="text-gray-600">Write, debug, and optimize code in any language</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-left">
                    <div className="font-medium text-gray-900 mb-1">✍️ Creative Writing</div>
                    <div className="text-gray-600">Generate content, stories, and professional documents</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-left">
                    <div className="font-medium text-gray-900 mb-1">🧠 Analysis & Research</div>
                    <div className="text-gray-600">Analyze data, research topics, and solve complex problems</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default App;