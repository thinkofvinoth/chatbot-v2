import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, ThumbsUp, Clock, User } from 'lucide-react';
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

export const ChatMessage = ({ message, isBot }) => {
  return (
    <motion.div
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={cn(
        'group flex items-end gap-2',
        isBot ? 'justify-start' : 'flex-row-reverse'
      )}
    >
      <Avatar sender={message.sender} />

      <div className="flex flex-col gap-1">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            'max-w-[280px] sm:max-w-[440px] rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed',
            isBot
              ? 'rounded-bl-sm bg-gemini-surface dark:bg-gemini-dark-surface border border-gemini-border dark:border-gemini-dark-border text-gemini-primary dark:text-gemini-dark-primary'
              : 'rounded-br-sm bg-gemini-accent text-white'
          )}
        >
          {message.content}
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