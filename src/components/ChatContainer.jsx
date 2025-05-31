import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { QuickActions } from './QuickActions';

export const ChatContainer = ({ messages, onSendMessage }) => {
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [isThinking, setIsThinking] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQuickAction = (content) => {
    onSendMessage(content);
  };

  const handleSendMessage = async (content) => {
    setIsThinking(true);
    await onSendMessage(content);
    setIsThinking(false);
  };

  return (
    <div className="flex h-[calc(100vh-12rem)] max-h-[600px] flex-col sm:h-[600px]">
      <div 
        ref={chatContainerRef}
        className="chat-container flex-1 overflow-y-auto py-4"
      >
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-4"
            >
              <ChatMessage
                message={message}
                isBot={message.sender.id === 'bot'}
              />
            </motion.div>
          ))}
          {isThinking && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ChatMessage isThinking={true} />
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <QuickActions onAction={handleQuickAction} messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};