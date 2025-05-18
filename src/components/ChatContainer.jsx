import React, { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { QuickActions } from './QuickActions';

export const ChatContainer = ({ messages, onSendMessage }) => {
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQuickAction = (content) => {
    onSendMessage(content);
  };

  return (
    <div className="flex h-[calc(100vh-12rem)] max-h-[600px] flex-col sm:h-[600px]">
      <div 
        ref={chatContainerRef}
        className="chat-container flex-1 overflow-y-auto bg-transparent px-4 sm:px-6"
      >
        {messages.map((message) => (
          <div key={message.id} className="py-4">
            <ChatMessage
              message={message}
              isBot={message.sender.id === 'bot'}
              actions={message.sender.id === 'bot' ? [
                {
                  label: '👍 Thanks!',
                  onClick: () => handleQuickAction("Thanks for the help!"),
                },
                {
                  label: '❓ Tell me more',
                  onClick: () => handleQuickAction("Can you tell me more about this?"),
                }
              ] : undefined}
            />
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <QuickActions onAction={handleQuickAction} messages={messages} />
      <ChatInput onSendMessage={onSendMessage} />
    </div>
  );
};