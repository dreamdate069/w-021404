
import React from 'react';
import { Message, MessageType } from '@/types/chat';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileImage, FileVideo, User } from 'lucide-react';

interface SharedMediaColumnProps {
  messages: Message[];
}

const SharedMediaColumn: React.FC<SharedMediaColumnProps> = ({ messages }) => {
  // Extract media from messages
  const mediaMessages = messages.filter(message => message.type === MessageType.MEDIA && message.mediaUrl);
  
  return (
    <div className="w-full h-full border-r border-zinc-800 bg-zinc-900/50 flex flex-col">
      <div className="p-4 border-b border-zinc-800">
        <h3 className="font-medium text-zinc-200 text-center">Shared Media</h3>
      </div>
      
      <div className="p-4 flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          {mediaMessages.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {mediaMessages.map(message => (
                <div key={message.id} className="aspect-square rounded-md overflow-hidden bg-zinc-800 relative group cursor-pointer">
                  {message.mediaType === 'image' && message.mediaUrl && <div className="relative h-full w-full">
                      <img src={message.mediaUrl} alt="Shared media" className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                        <FileImage className="text-white" size={24} />
                      </div>
                    </div>}
                  
                  {message.mediaType === 'video' && message.mediaUrl && <div className="relative h-full w-full">
                      <img src={message.mediaUrl} alt="Video thumbnail" className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <FileVideo className="text-white" size={24} />
                      </div>
                    </div>}
                  
                  {(!message.mediaUrl || message.mediaType === 'audio') && <div className="h-full w-full flex items-center justify-center">
                      <FileImage className="text-zinc-500" size={24} />
                    </div>}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="mb-4 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                  <User className="text-zinc-600" size={24} />
                </div>
              </div>
              <p className="text-zinc-500 text-sm">No media shared yet</p>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};

export default SharedMediaColumn;
