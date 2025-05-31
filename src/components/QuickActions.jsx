import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, HelpCircle, FileText, Settings, ThumbsUp, Repeat, PlusCircle, Search } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const QuickActions = ({ onAction, messages = [] }) => {
  const lastMessage = messages[messages.length - 1];
  const isLastMessageFromBot = lastMessage?.sender.id === 'bot';

  const quickActions = useMemo(() => {
    const defaultActions = [
      {
        icon: <MessageSquare className="h-4 w-4" />,
        label: "New Topic",
        content: "I'd like to start a new topic.",
      },
      {
        icon: <HelpCircle className="h-4 w-4" />,
        label: "Help",
        content: "I need help with something.",
      },
    ];

    if (isLastMessageFromBot) {
      return [
        {
          icon: <ThumbsUp className="h-4 w-4" />,
          label: "Thanks!",
          content: "Thank you, that was helpful!",
        },
        {
          icon: <Repeat className="h-4 w-4" />,
          label: "Explain More",
          content: "Could you explain that in more detail?",
        },
        {
          icon: <PlusCircle className="h-4 w-4" />,
          label: "Examples",
          content: "Can you provide some examples?",
        },
        {
          icon: <Search className="h-4 w-4" />,
          label: "Related",
          content: "What other related topics should I know about?",
        },
      ];
    }

    return defaultActions;
  }, [isLastMessageFromBot, lastMessage]);

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="border-t border-gemini-border dark:border-gemini-dark-border bg-gemini-surface/95 dark:bg-gemini-dark-surface/95 px-4 py-3"
    >
      <div className="flex flex-wrap gap-2 justify-center">
        {quickActions.map((action, index) => (
          <motion.button
            key={index}
            variants={item}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAction(action.content)}
            className="inline-flex items-center gap-2 rounded-lg bg-gemini-bg px-3 py-2 text-sm 
              text-gemini-primary shadow-sm border border-gemini-border transition-colors 
              hover:bg-gemini-bg/70 dark:bg-gemini-dark-bg dark:text-gemini-dark-primary 
              dark:border-gemini-dark-border dark:hover:bg-gemini-dark-bg/70"
          >
            {action.icon}
            {action.label}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};