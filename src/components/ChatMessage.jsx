import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Clock, User, ThumbsUp, ThumbsDown, Share2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../utils/cn';

const ThinkingIndicator = () => (
  <div className="flex items-center gap-3 px-4">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center rounded-full bg-gemini-accent text-white h-10 w-10"
    >
      <Bot className="h-6 w-6" />
    </motion.div>
    
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-2 max-w-[80%]"
    >
      <div className="flex items-center gap-2 bg-gemini-surface dark:bg-gemini-dark-surface rounded-2xl p-4 border border-gemini-border dark:border-gemini-dark-border">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2
              }}
              className="h-2 w-2 rounded-full bg-gemini-accent"
            />
          ))}
        </div>
        <span className="text-sm text-gemini-secondary dark:text-gemini-dark-secondary font-medium">
          Thinking...
        </span>
      </div>
    </motion.div>
  </div>
);

const Avatar = ({ sender, size = 'default' }) => {
  const sizeClasses = {
    default: 'h-10 w-10',
    small: 'h-8 w-8',
  };

  if (sender.id === 'bot') {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={cn(
          "flex items-center justify-center rounded-full bg-gemini-accent text-white",
          sizeClasses[size]
        )}
      >
        <Bot className="h-6 w-6" />
      </motion.div>
    );
  }

  if (sender.avatar) {
    return (
      <motion.img
        whileHover={{ scale: 1.05 }}
        src={sender.avatar}
        alt={sender.name}
        className={cn(
          "rounded-full object-cover",
          sizeClasses[size]
        )}
      />
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={cn(
        "flex items-center justify-center rounded-full bg-gemini-secondary text-white font-medium",
        sizeClasses[size]
      )}
    >
      <User className="h-6 w-6" />
    </motion.div>
  );
};

const MessageActions = ({ isBot, message }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex items-center gap-2 mt-2"
  >
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="p-1.5 rounded-full bg-gemini-surface dark:bg-gemini-dark-surface 
        text-gemini-secondary dark:text-gemini-dark-secondary hover:text-gemini-accent 
        dark:hover:text-gemini-accent border border-gemini-border 
        dark:border-gemini-dark-border transition-colors"
    >
      <ThumbsUp className="h-4 w-4" />
    </motion.button>
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="p-1.5 rounded-full bg-gemini-surface dark:bg-gemini-dark-surface 
        text-gemini-secondary dark:text-gemini-dark-secondary hover:text-gemini-accent 
        dark:hover:text-gemini-accent border border-gemini-border 
        dark:border-gemini-dark-border transition-colors"
    >
      <ThumbsDown className="h-4 w-4" />
    </motion.button>
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="p-1.5 rounded-full bg-gemini-surface dark:bg-gemini-dark-surface 
        text-gemini-secondary dark:text-gemini-dark-secondary hover:text-gemini-accent 
        dark:hover:text-gemini-accent border border-gemini-border 
        dark:border-gemini-dark-border transition-colors"
    >
      <Share2 className="h-4 w-4" />
    </motion.button>
    <div className="flex items-center gap-1 ml-2">
      <Clock className="h-3.5 w-3.5 text-gemini-secondary dark:text-gemini-dark-secondary" />
      <span className="text-xs text-gemini-secondary dark:text-gemini-dark-secondary">
        {format(message.timestamp, 'h:mm a')}
      </span>
    </div>
  </motion.div>
);

export const ChatMessage = ({ message, isBot, isThinking }) => {
  if (isThinking) {
    return <ThinkingIndicator />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn(
        'relative flex items-start gap-2 px-4',
        isBot ? 'justify-start' : 'flex-row-reverse'
      )}
    >
      <Avatar sender={message.sender} />

      <div className="flex flex-col gap-1 max-w-[80%]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            'relative rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed',
            isBot
              ? 'rounded-bl-sm bg-gemini-surface dark:bg-gemini-dark-surface border border-gemini-border dark:border-gemini-dark-border text-gemini-primary dark:text-gemini-dark-primary'
              : 'rounded-br-sm bg-gemini-accent text-white'
          )}
        >
          {message.content}
        </motion.div>
        <MessageActions isBot={isBot} message={message} />
      </div>
    </motion.div>
  );
};