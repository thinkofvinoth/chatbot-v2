import React, { useState } from 'react';
import { Bot, ThumbsUp, Clock, User } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../utils/cn';

const Avatar = ({ sender, size = 'default' }) => {
  const sizeClasses = {
    default: 'avatar-default',
    small: 'avatar-small',
  };

  if (sender.id === 'bot') {
    return (
      <div className={`avatar avatar-bot ${sizeClasses[size]}`}>
        <Bot className="avatar-icon" />
      </div>
    );
  }

  if (sender.avatar) {
    return (
      <img
        src={sender.avatar}
        alt={sender.name}
        className={`avatar ${sizeClasses[size]}`}
      />
    );
  }

  return (
    <div className={`avatar avatar-user ${sizeClasses[size]}`}>
      <User className="avatar-icon" />
    </div>
  );
};

export const ChatMessage = ({ message, isBot, onReaction, actions = [] }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onReaction?.();
  };

  return (
    <div className={cn('message', isBot ? 'bot' : 'user', 'slide-up')}>
      <div className="message-avatar-container">
        <Avatar sender={message.sender} />
        <button
          onClick={handleLike}
          className={cn('reaction-button', isLiked && 'liked')}
        >
          <ThumbsUp className="reaction-icon" />
        </button>
      </div>

      <div className="message-content-wrapper">
        <div className={cn('message-bubble', isBot ? 'bot' : 'user')}>
          {message.content}
        </div>

        <div className="message-meta">
          <Clock className="meta-icon" />
          <span className="meta-time">
            {format(message.timestamp, 'h:mm a')}
          </span>
        </div>

        {actions.length > 0 && (
          <div className="message-actions">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className="action-button"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};