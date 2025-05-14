
import React, { useRef, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Message, MessageType } from '@/types/chat';
import MessageContent from './MessageContent';

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
  getUserById: (userId: string) => any;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentUserId,
  getUserById,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => {
        const isCurrentUser = message.senderId === currentUserId;
        const isSystem = message.senderId === 'system';
        const messageUser = isCurrentUser 
          ? getUserById(currentUserId) 
          : (isSystem ? null : getUserById(message.senderId));
        
        if (isSystem) {
          return (
            <div key={message.id} className="flex justify-center">
              <div className="bg-zinc-800 rounded-md px-4 py-2 max-w-[80%]">
                <p className="text-sm text-zinc-400">{message.content}</p>
              </div>
            </div>
          );
        }
        
        return (
          <div
            key={message.id}
            className={`flex items-start gap-3 ${
              isCurrentUser ? "flex-row-reverse" : ""
            }`}
          >
            <Avatar className="mt-1">
              <AvatarImage 
                src={messageUser?.profilePic} 
                alt={messageUser?.name || 'User'} 
              />
              <AvatarFallback>
                {messageUser?.name?.[0] || 'U'}
              </AvatarFallback>
            </Avatar>
            
            <div
              className={`rounded-lg px-4 py-2 max-w-[70%] ${
                isCurrentUser
                  ? "bg-rose-500 text-white"
                  : "bg-zinc-800 text-white"
              }`}
            >
              <MessageContent message={message} />
              <div className="text-xs mt-1 opacity-70">
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
