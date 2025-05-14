
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ChatParticipant, Message, MessageType } from '@/types/chat';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileImage, FileVideo, User } from 'lucide-react';

interface ProfileInfoColumnProps {
  participant: ChatParticipant;
  messages: Message[];
}

const ProfileInfoColumn = ({ participant, messages }: ProfileInfoColumnProps) => {
  // Extract media from messages
  const mediaMessages = messages.filter(
    (message) => message.type === MessageType.MEDIA && message.mediaUrl
  );
  
  return (
    <div className="w-full h-full border-r border-zinc-800 bg-zinc-900/50 flex flex-col">
      {/* Profile section */}
      <div className="p-6 border-b border-zinc-800">
        <div className="flex flex-col items-center w-full">
          <Avatar className="w-full max-w-[240px] aspect-square mb-5 rounded-md">
            <AvatarImage src={participant.profilePic} alt={participant.name} className="rounded-md object-cover" />
            <AvatarFallback className="text-3xl rounded-md">{participant.name[0]}</AvatarFallback>
          </Avatar>
          
          <h2 className="text-2xl font-bold text-white mb-2">{participant.name}</h2>
          
          <div className="flex items-center justify-center gap-1 text-sm text-zinc-400 mb-4">
            <span className={`w-2 h-2 rounded-full ${participant.online ? 'bg-green-500' : 'bg-zinc-500'}`}></span>
            <span>{participant.online ? 'Online now' : participant.lastActive || 'Offline'}</span>
          </div>
        </div>
      </div>
      
      {/* Shared Media */}
      <div className="p-4 border-b border-zinc-800 flex-1 min-h-0">
        <h3 className="font-medium text-zinc-200 mb-3">Shared Media</h3>
        <ScrollArea className="h-full max-h-[300px]">
          {mediaMessages.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {mediaMessages.map((message) => (
                <div 
                  key={message.id}
                  className="aspect-square rounded-md overflow-hidden bg-zinc-800 relative group cursor-pointer"
                >
                  {message.mediaType === 'image' && message.mediaUrl && (
                    <div className="relative h-full w-full">
                      <img src={message.mediaUrl} alt="Shared media" className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <FileImage className="text-white" size={24} />
                      </div>
                    </div>
                  )}
                  
                  {message.mediaType === 'video' && message.mediaUrl && (
                    <div className="relative h-full w-full">
                      <img src={message.mediaUrl} alt="Video thumbnail" className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <FileVideo className="text-white" size={24} />
                      </div>
                    </div>
                  )}
                  
                  {(!message.mediaUrl || message.mediaType === 'audio') && (
                    <div className="h-full w-full flex items-center justify-center">
                      <FileImage className="text-zinc-500" size={24} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <User className="mx-auto text-zinc-600 mb-2" size={24} />
              <p className="text-zinc-500 text-sm">No media shared yet</p>
            </div>
          )}
        </ScrollArea>
      </div>
      
      {/* About section */}
      <div className="p-4 border-t border-zinc-800">
        <h3 className="font-medium text-zinc-200 mb-2">About</h3>
        <p className="text-sm text-zinc-400">
          {participant.bio || "No information available"}
        </p>
      </div>
    </div>
  );
};

export default ProfileInfoColumn;
