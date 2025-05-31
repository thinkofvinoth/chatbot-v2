import React, { useState, useRef } from 'react';
import { Send, Smile, Paperclip, Mic, X, Image, FileText, Film, Music } from 'lucide-react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore } from '../store/useThemeStore';

const AttachmentMenu = ({ onClose }) => {
  const attachmentTypes = [
    { icon: <Image className="h-5 w-5" />, label: 'Image', type: 'image/*' },
    { icon: <FileText className="h-5 w-5" />, label: 'Document', type: '.pdf,.doc,.docx,.txt' },
    { icon: <Film className="h-5 w-5" />, label: 'Video', type: 'video/*' },
    { icon: <Music className="h-5 w-5" />, label: 'Audio', type: 'audio/*' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute bottom-16 left-0 bg-gemini-surface dark:bg-gemini-dark-surface rounded-lg shadow-lg border border-gemini-border dark:border-gemini-dark-border p-2"
    >
      <div className="flex flex-col gap-1">
        {attachmentTypes.map((type, index) => (
          <motion.label
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-gemini-bg dark:hover:bg-gemini-dark-bg"
          >
            <input
              type="file"
              accept={type.type}
              className="hidden"
              onChange={(e) => {
                console.log('File selected:', e.target.files[0]);
                onClose();
              }}
            />
            <span className="text-gemini-secondary dark:text-gemini-dark-secondary">{type.icon}</span>
            <span className="text-sm text-gemini-primary dark:text-gemini-dark-primary">{type.label}</span>
          </motion.label>
        ))}
      </div>
    </motion.div>
  );
};

const RecentEmojis = ({ onSelect }) => {
  const recentEmojis = ['😊', '👍', '❤️', '🎉', '🤔', '👏', '🙌', '✨'];
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex gap-1 px-2 py-1 bg-gemini-bg dark:bg-gemini-dark-bg rounded-full border border-gemini-border dark:border-gemini-dark-border"
    >
      {recentEmojis.map((emoji, index) => (
        <motion.button
          key={index}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="text-lg hover:bg-gemini-surface dark:hover:bg-gemini-dark-surface p-1 rounded-full"
          onClick={() => onSelect({ native: emoji })}
        >
          {emoji}
        </motion.button>
      ))}
    </motion.div>
  );
};

export const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showRecentEmojis, setShowRecentEmojis] = useState(false);
  const emojiButtonRef = useRef(null);
  const { isDarkMode } = useThemeStore();

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
    setShowRecentEmojis(false);
  };

  return (
    <div className="relative border-t border-gemini-border dark:border-gemini-dark-border">
      <div className="absolute inset-0 bg-gemini-surface/95 dark:bg-gemini-dark-surface/95 backdrop-blur-sm" />
      
      <div className="relative px-4 py-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative flex flex-col gap-2"
        >
          <div className="relative flex items-center gap-2">
            <motion.div
              onHoverStart={() => setShowRecentEmojis(true)}
              onHoverEnd={() => !showEmojiPicker && setShowRecentEmojis(false)}
              className="relative"
            >
              <motion.button
                ref={emojiButtonRef}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowEmojiPicker(!showEmojiPicker);
                  setShowAttachMenu(false);
                }}
                className="rounded-full p-2 text-gemini-secondary hover:bg-gemini-bg dark:text-gemini-dark-secondary dark:hover:bg-gemini-dark-bg transition-colors"
              >
                <Smile className="h-5 w-5" />
              </motion.button>

              <AnimatePresence>
                {showRecentEmojis && !showEmojiPicker && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-12 left-0 z-50"
                  >
                    <RecentEmojis onSelect={handleEmojiSelect} />
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {showEmojiPicker && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-16 left-0 z-50"
                  >
                    <div className="relative">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowEmojiPicker(false)}
                        className="absolute -right-2 -top-2 p-1 rounded-full bg-gemini-surface dark:bg-gemini-dark-surface border border-gemini-border dark:border-gemini-dark-border text-gemini-secondary dark:text-gemini-dark-secondary z-10"
                      >
                        <X className="h-4 w-4" />
                      </motion.button>
                      <Picker
                        data={data}
                        onEmojiSelect={handleEmojiSelect}
                        theme={isDarkMode ? "dark" : "light"}
                        previewPosition="none"
                        skinTonePosition="none"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowAttachMenu(!showAttachMenu);
                setShowEmojiPicker(false);
              }}
              className="rounded-full p-2 text-gemini-secondary hover:bg-gemini-bg dark:text-gemini-dark-secondary dark:hover:bg-gemini-dark-bg transition-colors"
            >
              <Paperclip className="h-5 w-5" />
            </motion.button>

            <AnimatePresence>
              {showAttachMenu && (
                <AttachmentMenu onClose={() => setShowAttachMenu(false)} />
              )}
            </AnimatePresence>

            <motion.input
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Message CSWynk..."
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
              className={`flex h-11 w-11 items-center justify-center rounded-full 
                shadow-sm transition-all duration-200 
                ${message.trim() 
                  ? 'bg-gemini-accent text-white hover:bg-gemini-accent/90' 
                  : 'bg-gemini-bg text-gemini-secondary dark:bg-gemini-dark-bg dark:text-gemini-dark-secondary'
                }
                disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <Send className="h-5 w-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};