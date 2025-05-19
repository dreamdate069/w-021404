
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
    <div className="w-full h-full border-r border-zinc-800 bg-zinc-900/50 flex flex-col sticky top-0 max-h-screen overflow-hidden">
      <TooltipProvider>
        {/* Profile section */}
        <div className="p-6 border-b border-zinc-800">
          <div className="flex flex-col items-center w-full">
            <Avatar className="h-48 w-48 mb-5 rounded-md">
              <AvatarImage src={participant.profilePic} alt={participant.name} className="rounded-md" />
              <AvatarFallback className="text-3xl rounded-md">{participant.name[0]}</AvatarFallback>
            </Avatar>
            
            <h2 className="text-2xl font-bold text-white mb-2">{participant.name}</h2>
            
            <div className="flex items-center justify-center gap-1 text-sm text-zinc-400 mb-4">
              <span className={`w-2 h-2 rounded-full ${participant.online ? 'bg-green-500' : 'bg-zinc-500'}`}></span>
              <span>{participant.online ? 'Online now' : participant.lastActive || 'Offline'}</span>
            </div>
            
            <div className="flex gap-2 w-full">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" onClick={onToggleFriend} className="flex-1">
                    {isFriend ? <>
                        <UserX className="mr-2 h-4 w-4" />
                        <span>Unfriend</span>
                      </> : <>
                        <UserPlus className="mr-2 h-4 w-4" />
                        <span>Add Friend</span>
                      </>}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {isFriend ? 'Remove from friends' : 'Add to friends'}
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" onClick={onPoke} className="flex-1">
                    <MessageSquareHeart className="mr-2 h-4 w-4" />
                    <span>Poke</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Send a poke notification
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
        
        {/* About section */}
        <div className="flex-1 p-4">
          <h3 className="font-medium text-zinc-200 mb-2">About</h3>
          <p className="text-sm text-zinc-400">
            {participant.bio || "No information available"}
          </p>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default ProfileInfoColumn;
