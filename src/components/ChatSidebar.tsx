
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Gift, DollarSign, Image, Smile } from 'lucide-react';
import EmojiPicker from './EmojiPicker';
import { getUserBalance } from '@/utils/dreamCoinUtils';

interface ChatSidebarProps {
  isFriend: boolean;
  onToggleFriend: () => void;
  onEmojiSelect: (emoji: string) => void;
  onImageAttach: () => void;
  onGiftSelect: () => void;
  onCoinTransfer: () => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  isFriend,
  onToggleFriend,
  onEmojiSelect,
  onImageAttach,
  onGiftSelect,
  onCoinTransfer
}) => {
  const [activeTab, setActiveTab] = useState<string>('emojis');
  const [showEmojis, setShowEmojis] = useState(false);
  
  return (
    <div className="w-16 border-l border-zinc-800 flex flex-col items-center py-4 bg-zinc-900">
      <Tabs 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full flex flex-col items-center"
      >
        <TabsList className="flex flex-col gap-2 bg-transparent">
          <TabsTrigger 
            value="emojis"
            className={`rounded-full p-2 ${activeTab === 'emojis' ? 'bg-zinc-800' : ''}`}
            onClick={() => setShowEmojis(!showEmojis)}
          >
            <Smile size={20} />
          </TabsTrigger>
          <TabsTrigger 
            value="images" 
            className={`rounded-full p-2 ${activeTab === 'images' ? 'bg-zinc-800' : ''}`}
            onClick={() => {
              onImageAttach();
              // Don't actually switch tabs - just trigger the image attach action
              setActiveTab('emojis');
            }}
          >
            <Image size={20} />
          </TabsTrigger>
          <TabsTrigger 
            value="gifts" 
            className={`rounded-full p-2 ${activeTab === 'gifts' ? 'bg-zinc-800' : ''}`}
            onClick={() => {
              onGiftSelect();
              // Don't actually switch tabs - just trigger the gift select action
              setActiveTab('emojis');
            }}
          >
            <Gift size={20} />
          </TabsTrigger>
          <TabsTrigger 
            value="coins" 
            className={`rounded-full p-2 ${activeTab === 'coins' ? 'bg-zinc-800' : ''}`}
            onClick={() => {
              onCoinTransfer();
              // Don't actually switch tabs - just trigger the coin transfer action
              setActiveTab('emojis');
            }}
          >
            <DollarSign size={20} />
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="mt-auto">
        <Button 
          variant="ghost"
          size="icon"
          onClick={onToggleFriend}
          className={`rounded-full ${isFriend ? 'text-rose-500' : 'text-zinc-400'}`}
        >
          <Heart size={20} fill={isFriend ? 'currentColor' : 'none'} />
        </Button>
      </div>
      
      {showEmojis && (
        <div className="absolute right-16 bottom-20 z-10">
          <EmojiPicker onEmojiSelect={(emoji: string) => {
            onEmojiSelect(emoji);
            setShowEmojis(false);
          }}>
            <div className="emoji-container"></div>
          </EmojiPicker>
        </div>
      )}
    </div>
  );
};

export default ChatSidebar;
