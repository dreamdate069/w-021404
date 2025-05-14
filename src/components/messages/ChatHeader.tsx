
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Phone, VideoIcon } from 'lucide-react';
import { ChatParticipant } from '@/types/chat';
import DreamCoinBalance from '@/components/DreamCoinBalance';

interface ChatHeaderProps {
  participant: ChatParticipant;
  currentUserId: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  participant,
  currentUserId,
}) => {
  return (
    <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar>
            <AvatarImage src={participant.profilePic} alt={participant.name} />
            <AvatarFallback>{participant.name[0]}</AvatarFallback>
          </Avatar>
          
          {participant.online && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900" />
          )}
        </div>
        
        <div>
          <h2 className="font-medium text-white">{participant.name}</h2>
          <p className="text-xs text-zinc-400">
            {participant.online ? 'Online now' : participant.lastActive || 'Offline'}
          </p>
        </div>
      </div>
      
      <div className="flex gap-2 items-center">
        <DreamCoinBalance balance={getUserBalance(currentUserId)} className="mr-2" />
        <Button size="icon" variant="ghost">
          <Phone size={18} />
        </Button>
        <Button size="icon" variant="ghost">
          <VideoIcon size={18} />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
