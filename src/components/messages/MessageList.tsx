
import React, { useRef, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Message, MessageType } from '@/types/chat';
import MessageContent from './MessageContent';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
  getUserById: (userId: string) => any;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentUserId,
  getUserById
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [messages]);

  return (
    <ScrollArea className="h-full w-full">
      <div className="p-4 space-y-4">
        <TooltipProvider>
          {messages.map(message => {
            const isCurrentUser = message.senderId === currentUserId;
            const isSystem = message.senderId === 'system';
            const messageUser = isCurrentUser ? getUserById(currentUserId) : isSystem ? null : getUserById(message.senderId);
            
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
                className={`flex items-start gap-3 ${isCurrentUser ? "flex-row-reverse" : ""}`}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Avatar className="mt-1">
                      <AvatarImage src={messageUser?.profilePic} alt={messageUser?.name || 'User'} />
                      <AvatarFallback>
                        {messageUser?.name?.[0] || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    {messageUser?.name || 'User'}
                  </TooltipContent>
                </Tooltip>
                
                <div className={`${isCurrentUser ? "items-end" : "items-start"} flex flex-col`}>
                  <div className={`${isCurrentUser ? "bg-custom-pink" : "bg-zinc-800"} px-4 py-2 rounded-lg`}>
                    <MessageContent message={message} />
                  </div>
                  <div className="text-xs mt-1 text-zinc-400">
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
        </TooltipProvider>
      </div>
    </ScrollArea>
  );
};

export default MessageList;
