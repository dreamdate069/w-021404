
import React from 'react';
import { Message, MessageType } from '@/types/chat';

interface MessageContentProps {
  message: Message;
}

const MessageContent: React.FC<MessageContentProps> = ({ message }) => {
  switch (message.type) {
    case MessageType.TEXT:
      return <p>{message.content}</p>;
    
    case MessageType.MEDIA:
      if (message.mediaType === 'image') {
        return (
          <div className="mt-2">
            <img 
              src={message.mediaUrl} 
              alt="Image" 
              className="max-w-[200px] rounded-lg" 
            />
          </div>
        );
      } else if (message.mediaType === 'video') {
        return (
          <div className="mt-2">
            <video 
              src={message.mediaUrl} 
              controls 
              className="max-w-[200px] rounded-lg" 
            />
          </div>
        );
      } else if (message.mediaType === 'audio') {
        return (
          <div className="mt-2">
            <audio 
              src={message.mediaUrl} 
              controls 
              className="max-w-[200px]" 
            />
          </div>
        );
      }
      return <p>{message.content}</p>;
    
    case MessageType.GIFT:
      return (
        <div className="mt-2 flex flex-col items-center">
          <p>{message.content}</p>
          <img 
            src="/user-uploads/gifts/heart.png" 
            alt="Gift" 
            className="w-24 h-24 mt-2" 
          />
        </div>
      );
    
    case MessageType.COIN_TRANSFER:
      return (
        <div className="mt-2">
          <p className="font-medium">{message.content}</p>
          <p className="text-sm text-zinc-400">
            Transaction ID: {message.id.slice(0, 8)}...
          </p>
        </div>
      );
    
    case MessageType.NOTIFICATION:
    case MessageType.SYSTEM:
      return <p className="text-sm text-zinc-400">{message.content}</p>;
    
    default:
      return <p>{message.content}</p>;
  }
};

export default MessageContent;
