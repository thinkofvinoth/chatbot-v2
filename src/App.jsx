import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { EmbeddedChat } from './components/EmbeddedChat';
import { Header } from './components/Header';
import { ChatContainer } from './components/ChatContainer';
import { useThemeStore } from './store/useThemeStore';

const initialMessages = [
  {
    id: '1',
    content: "Hi! I'm CSWynk, your AI assistant. How can I help you today?",
    sender: {
      id: 'bot',
      name: 'CSWynk',
      avatar: '',
      status: 'online'
    },
    timestamp: new Date(),
    read: true,
    reactions: [],
    attachments: [],
    edited: false,
  }
];

const userProfile = {
  id: 'user',
  name: 'You',
  avatar: '',
  status: 'online'
};

function App() {
  const { isDarkMode } = useThemeStore();
  const [mainMessages, setMainMessages] = useState(initialMessages);

  const handleMainChatMessage = async (content) => {
    const newMessage = {
      id: Date.now().toString(),
      content,
      sender: userProfile,
      timestamp: new Date(),
      read: true,
      reactions: [],
      attachments: [],
      edited: false,
    };

    setMainMessages((prev) => [...prev, newMessage]);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const botResponse = {
      id: (Date.now() + 1).toString(),
      content: `I received your message: "${content}". How can I help you further?`,
      sender: {
        id: 'bot',
        name: 'CSWynk',
        avatar: '',
        status: 'online'
      },
      timestamp: new Date(),
      read: true,
      reactions: [],
      attachments: [],
      edited: false,
    };
    
    setMainMessages((prev) => [...prev, botResponse]);
  };

  const handleEmbeddedChatMessage = async (message) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return `I received your message: "${message}". How can I help you further?`;
  };

  return (
    <div className={`relative min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-light-gradient dark:bg-gemini-dark-bg transition-colors duration-500 animate-gradient" />
        <div className="absolute inset-0 bg-light-noise dark:bg-dark-gradient dark:bg-dark-noise mix-blend-overlay" />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto max-w-[80%] px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gemini-primary dark:text-gemini-dark-primary">
              CSWynk Chat
            </h1>
            <p className="mt-2 text-lg text-gemini-secondary dark:text-gemini-dark-secondary">
              Experience AI conversations in a familiar interface
            </p>
          </div>

          <div className="rounded-2xl bg-white/80 dark:bg-gemini-dark-surface shadow-xl overflow-hidden border border-gemini-border dark:border-gemini-dark-border backdrop-blur-lg">
            <Header
              title="CSWynk"
              subtitle="AI Assistant"
              theme={{
                primaryColor: 'text-gemini-accent dark:text-gemini-dark-accent',
                secondaryColor: 'text-gemini-secondary dark:text-gemini-dark-secondary',
              }}
            />
            <ChatContainer
              messages={mainMessages}
              onSendMessage={handleMainChatMessage}
            />
          </div>
        </div>
      </div>

      <EmbeddedChat
        initialMessages={initialMessages}
        position="bottom-right"
        buttonIcon={<MessageCircle className="h-6 w-6" />}
        title="CSWynk Quick Chat"
        subtitle="Get instant help"
        theme={{
          primaryColor: 'text-gemini-accent dark:text-gemini-dark-accent',
          secondaryColor: 'text-gemini-secondary dark:text-gemini-dark-secondary',
          buttonColor: 'bg-gemini-accent hover:bg-gemini-accent/90'
        }}
        onSendMessage={handleEmbeddedChatMessage}
      />
    </div>
  );
}

export default App;