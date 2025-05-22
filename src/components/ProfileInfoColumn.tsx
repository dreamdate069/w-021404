
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ChatParticipant } from '@/types/chat';
import { User, UserPlus, UserX, MessageSquareHeart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ProfileInfoColumnProps {
  participant: ChatParticipant;
  isFriend?: boolean;
  onToggleFriend?: () => void;
  onPoke?: () => void;
}

const ProfileInfoColumn = ({
  participant,
  isFriend = false,
  onToggleFriend = () => {},
  onPoke = () => {}
}: ProfileInfoColumnProps) => {
  return (
    <div className="h-full border-r border-zinc-800 bg-zinc-900/50 flex flex-col sticky top-0 max-h-screen overflow-hidden">
      <TooltipProvider>
        {/* Profile section */}
        <div className="p-4 border-b border-zinc-800">
          <div className="flex flex-col items-center w-full">
            <Avatar className="h-24 w-24 mb-3 rounded-md">
              <AvatarImage src={participant.profilePic} alt={participant.name} className="rounded-md object-cover" />
              <AvatarFallback className="text-xl rounded-md">{participant.name[0]}</AvatarFallback>
            </Avatar>
            
            <h2 className="text-lg font-bold text-white mb-1">{participant.name}</h2>
            
            <div className="flex items-center justify-center gap-1 text-xs text-zinc-400 mb-3">
              <span className={`w-2 h-2 rounded-full ${participant.online ? 'bg-green-500' : 'bg-zinc-500'}`}></span>
              <span>{participant.online ? 'Online now' : participant.lastActive || 'Offline'}</span>
            </div>
            
            <div className="flex gap-2 w-full">
              <Button variant="outline" onClick={onToggleFriend} className="flex-1 bg-zinc-800 border-zinc-700 h-8 px-2 text-xs">
                {isFriend ? <>
                    <UserX className="mr-1 h-3 w-3" />
                    <span>Remove</span>
                  </> : <>
                    <UserPlus className="mr-1 h-3 w-3" />
                    <span>Add</span>
                  </>}
              </Button>
              
              <Button variant="outline" onClick={onPoke} className="flex-1 bg-zinc-800 border-zinc-700 h-8 px-2 text-xs">
                <MessageSquareHeart className="mr-1 h-3 w-3" />
                <span>Message</span>
              </Button>
            </div>
          </div>
        </div>
        
        {/* About section */}
        <div className="p-3 flex-1 overflow-y-auto">
          <h3 className="font-medium text-zinc-200 text-sm mb-1">About</h3>
          <p className="text-xs text-zinc-400">
            {participant.bio || "No information available"}
          </p>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default ProfileInfoColumn;
