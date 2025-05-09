
import React from 'react';
import { MessageType, Message } from '@/utils/chatUtils';
import { cn } from '@/lib/utils';
import { Coins, Gift } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isCurrentUser }) => {
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Determine bubble position and styling
  const bubbleClass = cn(
    "max-w-[70%] rounded-lg p-3 animate-fade-in", 
    isCurrentUser ? "bg-custom-pink text-white" : "bg-zinc-800 text-white"
  );
  
  // Determine time stamp styling
  const timeClass = cn(
    "text-xs block mt-1", 
    isCurrentUser ? "text-custom-pink/70" : "text-zinc-400"
  );
  
  // Render different message types
  const renderMessageContent = () => {
    switch (message.type) {
      case MessageType.TEXT:
        return <p>{message.content}</p>;
        
      case MessageType.IMAGE:
        return (
          <div className="space-y-2">
            <div className="relative">
              <img 
                src={message.attachment?.url || ''} 
                alt="Attachment" 
                className="rounded max-h-[240px] w-auto object-contain cursor-pointer"
                onClick={() => window.open(message.attachment?.url, '_blank')}
              />
            </div>
            {message.content && <p>{message.content}</p>}
          </div>
        );
        
      case MessageType.VIDEO:
        return (
          <div className="space-y-2">
            <video 
              src={message.attachment?.url || ''} 
              controls 
              className="rounded max-h-[240px] w-auto object-contain"
            />
            {message.content && <p>{message.content}</p>}
          </div>
        );
        
      case MessageType.AUDIO:
        return (
          <div className="space-y-2">
            <audio 
              src={message.attachment?.url || ''} 
              controls 
              className="w-full"
            />
            {message.content && <p>{message.content}</p>}
          </div>
        );
        
      case MessageType.GIFT:
        return (
          <div className="text-center space-y-3">
            <div className="bg-zinc-900/50 p-4 rounded-lg inline-block">
              <div className="flex justify-center">
                <img 
                  src={message.gift?.imageUrl || ''} 
                  alt={message.gift?.name || 'Gift'}
                  className="h-24 w-auto object-contain"
                />
              </div>
              <p className="mt-2 font-medium text-custom-pink flex items-center justify-center gap-1">
                <Gift size={14} />
                {message.gift?.name}
              </p>
              {message.content && <p className="mt-1 text-sm">{message.content}</p>}
            </div>
          </div>
        );
        
      case MessageType.COINS:
        return (
          <div className="text-center space-y-3">
            <div className="bg-zinc-900/50 p-4 rounded-lg">
              <div className="flex items-center justify-center gap-2 text-custom-pink font-bold">
                <Coins size={18} />
                <span>{message.coinTransfer?.amount.toLocaleString()} DreamCoins</span>
              </div>
              <p className="text-sm mt-1">
                {isCurrentUser 
                  ? `You sent ${message.coinTransfer?.amount.toLocaleString()} DreamCoins`
                  : `You received ${(message.coinTransfer?.amount || 0) - (message.coinTransfer?.fee || 0)} DreamCoins`
                }
              </p>
              {message.content && <p className="mt-2 text-sm italic">"{message.content}"</p>}
            </div>
          </div>
        );
        
      case MessageType.SYSTEM:
        return (
          <div className="text-center text-zinc-400">
            <p>{message.content}</p>
          </div>
        );
        
      default:
        return <p>{message.content}</p>;
    }
  };
  
  // For system messages, render centered with different styling
  if (message.type === MessageType.SYSTEM) {
    return (
      <div className="flex justify-center my-4">
        <div className="bg-zinc-900/50 text-zinc-400 text-xs py-1 px-3 rounded-full">
          {message.content}
        </div>
      </div>
    );
  }
  
  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div className={bubbleClass}>
        {renderMessageContent()}
        <span className={timeClass}>
          {formatTimestamp(message.timestamp)}
          {message.isSending && <span className="ml-2 italic text-zinc-400">Sending...</span>}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;
