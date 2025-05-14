
import React, { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Conversation, ChatParticipant } from '@/types/chat';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onSelectConversation: (conversationId: string) => void;
  getOtherParticipant: (conversation: Conversation) => ChatParticipant | null;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  selectedConversationId,
  onSelectConversation,
  getOtherParticipant,
}) => {
  // Default to collapsed state
  const [isOpen, setIsOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <TooltipProvider>
      <div className={`h-full border-r border-zinc-800 flex flex-col transition-all duration-300 ${
        isOpen ? 'w-60 md:w-72' : 'w-14'
      }`}>
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          {isOpen && <h2 className="text-xl font-bold text-white">Messages</h2>}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                onClick={toggleSidebar} 
                variant="ghost" 
                size="icon"
                className={`${isOpen ? 'ml-auto' : 'mx-auto'}`}
              >
                {isOpen ? <ChevronLeft /> : <ChevronRight />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            </TooltipContent>
          </Tooltip>
        </div>
        
        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto scrollbar-none"
        >
          {conversations.map(conversation => {
            const otherUser = getOtherParticipant(conversation);
            if (!otherUser) return null;
            
            return (
              <div
                key={conversation.id}
                className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-zinc-800 transition-colors ${
                  selectedConversationId === conversation.id
                    ? "bg-zinc-800"
                    : ""
                }`}
                onClick={() => onSelectConversation(conversation.id)}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={otherUser.profilePic} alt={otherUser.name} />
                        <AvatarFallback>{otherUser.name[0]}</AvatarFallback>
                      </Avatar>
                      
                      {otherUser.online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900" />
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    {otherUser.name}
                    <div className="text-xs opacity-70">
                      {otherUser.online ? 'Online now' : otherUser.lastActive || 'Offline'}
                    </div>
                  </TooltipContent>
                </Tooltip>
                
                {isOpen && (
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-white truncate">
                        {otherUser.name}
                      </h3>
                      
                      {conversation.lastMessage && (
                        <span className="text-xs text-zinc-500">
                          {new Date(conversation.lastMessage.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      {conversation.lastMessage ? (
                        <p className="text-sm text-zinc-400 truncate">
                          {conversation.lastMessage.content}
                        </p>
                      ) : (
                        <p className="text-sm text-zinc-500 italic">No messages yet</p>
                      )}
                      
                      {conversation.unreadCount > 0 && (
                        <span className="bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-2">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default ConversationList;
