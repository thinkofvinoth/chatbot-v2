import React from 'react';
import { Bot, Moon, Sun, X } from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';
import { motion } from 'framer-motion';

export const Header = ({
  title = 'Gemini',
  subtitle = 'AI Assistant',
  onClose,
  theme = {
    primaryColor: 'text-gemini-accent',
    secondaryColor: 'text-gemini-secondary dark:text-gemini-dark-secondary',
  },
}) => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-10 border-b border-gemini-border dark:border-gemini-dark-border bg-gemini-surface/95 dark:bg-gemini-dark-surface/95 backdrop-blur-xl px-6 py-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gemini-accent"
          >
            <Bot className="h-6 w-6 text-white" />
          </motion.div>
          <div>
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-xl font-semibold ${theme.primaryColor}`}
            >
              {title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-sm ${theme.secondaryColor}`}
            >
              {subtitle}
            </motion.p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="rounded-full p-2 text-gemini-secondary hover:bg-gemini-bg dark:text-gemini-dark-secondary dark:hover:bg-gemini-dark-bg"
          >
            <motion.div
              initial={false}
              animate={{ rotate: isDarkMode ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </motion.div>
          </motion.button>
          
          {onClose && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="rounded-full p-2 text-gemini-secondary hover:bg-gemini-bg dark:text-gemini-dark-secondary dark:hover:bg-gemini-dark-bg"
            >
              <X className="h-5 w-5" />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};