import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Clock, User, Download, Camera } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../utils/cn';

const messageVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, x: -10 }
};

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

  const initials = sender.name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={cn(
        "flex items-center justify-center rounded-full bg-gemini-secondary text-white font-medium",
        sizeClasses[size]
      )}
    >
      {initials || <User className="h-6 w-6" />}
    </motion.div>
  );
};

const MessageActions = ({ isBot }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="absolute right-0 top-0 hidden group-hover:flex gap-2 p-2"
  >
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="p-1.5 rounded-full bg-gemini-surface/80 dark:bg-gemini-dark-surface/80 
        text-gemini-secondary dark:text-gemini-dark-secondary hover:text-gemini-accent 
        dark:hover:text-gemini-accent backdrop-blur-sm border border-gemini-border/50 
        dark:border-gemini-dark-border/50"
    >
      <Camera className="h-4 w-4" />
    </motion.button>
  </motion.div>
);

const ThinkingIndicator = () => (
  <div className="flex items-center gap-2 p-4">
    <div className="flex gap-1">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: 0
        }}
        className="h-2 w-2 rounded-full bg-gemini-accent"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: 0.2
        }}
        className="h-2 w-2 rounded-full bg-gemini-accent"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: 0.4
        }}
        className="h-2 w-2 rounded-full bg-gemini-accent"
      />
    </div>
    <span className="text-sm text-gemini-secondary dark:text-gemini-dark-secondary">
      Thinking...
    </span>
  </div>
);

export const ChatMessage = ({ message, isBot, isThinking }) => {
  if (isThinking) {
    return <ThinkingIndicator />;
  }

  return (
    <motion.div
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={cn(
        'group relative flex items-end gap-2 px-4',
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
          <MessageActions isBot={isBot} />
        </motion.div>

        <div className="flex items-center gap-2 px-1">
          <Clock className="h-3.5 w-3.5 text-gemini-secondary dark:text-gemini-dark-secondary" />
          <span className="text-xs text-gemini-secondary dark:text-gemini-dark-secondary">
            {format(message.timestamp, 'h:mm a')}
          </span>
        </div>
      </div>
    </motion.div>
  );
};