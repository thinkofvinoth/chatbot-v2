import React, { useState, useRef } from 'react';
import { Send, Smile, Paperclip, Mic } from 'lucide-react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { motion, AnimatePresence } from 'framer-motion';

export const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiButtonRef = useRef(null);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMessage((prev) => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  return (
    <div className="relative border-t border-gemini-border dark:border-gemini-dark-border">
      <div className="absolute inset-0 bg-gemini-surface/95 dark:bg-gemini-dark-surface/95 backdrop-blur-sm" />
      
      <div className="relative px-4 py-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative flex items-center gap-2"
        >
          <motion.button
            ref={emojiButtonRef}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="rounded-full p-2 text-gemini-secondary hover:bg-gemini-bg dark:text-gemini-dark-secondary dark:hover:bg-gemini-dark-bg transition-colors"
          >
            <Smile className="h-5 w-5" />
          </motion.button>

          <AnimatePresence>
            {showEmojiPicker && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-12 left-0 z-50"
              >
                <Picker
                  data={data}
                  onEmojiSelect={handleEmojiSelect}
                  theme={isDarkMode ? "dark" : "light"}
                  previewPosition="none"
                  skinTonePosition="none"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full p-2 text-gemini-secondary hover:bg-gemini-bg dark:text-gemini-dark-secondary dark:hover:bg-gemini-dark-bg transition-colors"
          >
            <Paperclip className="h-5 w-5" />
          </motion.button>

          <motion.input
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Message Gemini..."
            className="flex-1 rounded-xl border border-gemini-border bg-gemini-bg/50 px-4 py-3 
              text-gemini-primary placeholder-gemini-secondary shadow-sm transition-all duration-200 
              focus:border-gemini-accent focus:outline-none focus:ring-1 focus:ring-gemini-accent
              dark:border-gemini-dark-border dark:bg-gemini-dark-bg/50 dark:text-gemini-dark-primary 
              dark:placeholder-gemini-dark-secondary"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full p-2 text-gemini-secondary hover:bg-gemini-bg dark:text-gemini-dark-secondary dark:hover:bg-gemini-dark-bg transition-colors"
          >
            <Mic className="h-5 w-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={!message.trim()}
            className="flex h-11 w-11 items-center justify-center rounded-full 
              bg-gemini-accent text-white shadow-sm transition-all duration-200 
              hover:bg-gemini-accent/90
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};