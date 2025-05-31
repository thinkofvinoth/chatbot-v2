import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X } from 'lucide-react';
import { Header } from './Header';
import { ChatContainer } from './ChatContainer';
import { useThemeStore } from '../store/useThemeStore';

const defaultTheme = {
  primaryColor: 'text-gemini-accent dark:text-gemini-dark-accent',
  secondaryColor: 'text-gemini-secondary dark:text-gemini-dark-secondary',
  buttonColor: 'bg-gemini-accent hover:bg-gemini-accent/90',
};

const chatWindowVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.95,
    y: 20 
  },
  visible: { 
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  exit: { 
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.2
    }
  }
};

const buttonVariants = {
  initial: { scale: 0 },
  animate: { 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30
    }
  },
  hover: { 
    scale: 1.1,
    transition: {
      duration: 0.2
    }
  },
  tap: { scale: 0.9 }
};

export const EmbeddedChat = ({
  initialMessages = [],
  position = 'bottom-right',
  buttonIcon,
  title = 'CSWynk',
  subtitle = 'AI Assistant',
  theme = defaultTheme,
  onSendMessage,
  isEmbedded = false,
}) => {
  const [isOpen, setIsOpen] = useState(isEmbedded);
  const [messages, setMessages] = useState(initialMessages);
  const { isDarkMode } = useThemeStore();

  const handleSendMessage = async (content) => {
    const newMessage = {
      id: Date.now().toString(),
      content,
      sender: {
        id: 'user',
        name: 'User',
        avatar: '',
        status: 'online'
      },
      timestamp: new Date(),
      read: true,
      reactions: [],
      attachments: [],
      edited: false,
    };

    setMessages((prev) => [...prev, newMessage]);

    if (onSendMessage) {
      try {
        const response = await onSendMessage(content);
        const botResponse = {
          id: (Date.now() + 1).toString(),
          content: response,
          sender: {
            id: 'bot',
            name: title,
            avatar: '',
            status: 'online'
          },
          timestamp: new Date(),
          read: true,
          reactions: [],
          attachments: [],
          edited: false,
        };
        setMessages((prev) => [...prev, botResponse]);
      } catch (error) {
        console.error('Error getting response:', error);
      }
    }
  };

  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  };

  const ChatWindow = () => (
    <motion.div
      variants={chatWindowVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`overflow-hidden rounded-2xl bg-gemini-surface dark:bg-gemini-dark-surface backdrop-blur-sm border border-gemini-border dark:border-gemini-dark-border shadow-2xl ${isDarkMode ? 'dark' : ''}`}
    >
      <Header 
        title={title}
        subtitle={subtitle}
        onClose={isEmbedded ? undefined : () => setIsOpen(false)}
        theme={theme}
      />
      <ChatContainer
        messages={messages}
        onSendMessage={handleSendMessage}
      />
    </motion.div>
  );

  if (isEmbedded) {
    return <ChatWindow />;
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className={`fixed ${positionClasses[position]} z-50 w-[380px] sm:w-[440px]`}>
            <ChatWindow />
          </div>
        )}
      </AnimatePresence>

      <motion.button
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed ${positionClasses[position]} z-50 flex h-14 w-14 items-center justify-center rounded-full ${theme.buttonColor} text-white shadow-lg`}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            buttonIcon || <MessageSquare className="h-6 w-6" />
          )}
        </motion.div>
      </motion.button>
    </>
  );
};