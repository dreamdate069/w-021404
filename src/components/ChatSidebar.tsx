
import React, { useState } from 'react';
import { Smile, Image, Gift, UserPlus, UserMinus, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";

interface ChatSidebarProps {
  isFriend: boolean;
  onToggleFriend: () => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  isFriend = false,
  onToggleFriend
}) => {
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleEmoji = () => {
    toast({
      title: "Emoji Picker",
      description: "Emoji picker would open here"
    });
  };

  const handleAttach = () => {
    toast({
      title: "Attach Media",
      description: "Media upload options would appear here"
    });
  };

  const handleGiftShop = () => {
    toast({
      title: "Gift Shop",
      description: "Gift shop would open here"
    });
  };

  const handleCoinTransfer = () => {
    toast({
      title: "Coin Transfer",
      description: "Coin transfer dialog would open here"
    });
  };

  return <div className="sticky top-0 right-0 h-screen flex flex-col items-center justify-end gap-6 py-8 relative" 
              onMouseEnter={() => setIsExpanded(true)} 
              onMouseLeave={() => setIsExpanded(false)} 
              onTouchStart={() => setIsExpanded(true)}>
      {/* Background element with opacity */}
      <div className={cn("absolute inset-0 bg-zinc-900 border-l border-zinc-800 transition-opacity duration-300 z-0", isExpanded ? "opacity-100" : "opacity-[0.13]")}></div>
      
      {/* Buttons with full opacity - Order reversed with Smile at bottom and Coins at top */}
      <div className="flex flex-col items-center justify-end gap-6 z-10 relative mt-auto">
        <Button variant="ghost" className="rounded-full p-3 bg-zinc-800 hover:bg-custom-pink transition-colors" onClick={handleEmoji}>
          <Smile size={24} className="text-white" />
        </Button>
        
        <Button variant="ghost" className="rounded-full p-3 bg-zinc-800 hover:bg-custom-pink transition-colors" onClick={handleAttach}>
          <Image size={24} className="text-white" />
        </Button>
        
        <Button variant="ghost" className="rounded-full p-3 bg-zinc-800 hover:bg-custom-pink transition-colors" onClick={handleGiftShop}>
          <Gift size={24} className="text-white" />
        </Button>
        
        <Button variant="ghost" className="rounded-full p-3 bg-zinc-800 hover:bg-custom-pink transition-colors" onClick={onToggleFriend}>
          {isFriend ? <UserMinus size={24} className="text-white" /> : <UserPlus size={24} className="text-white" />}
        </Button>
        
        <Button variant="ghost" className="rounded-full p-3 bg-zinc-800 hover:bg-custom-pink transition-colors" onClick={handleCoinTransfer}>
          <Coins size={24} className="text-white" />
        </Button>
      </div>
    </div>;
};

export default ChatSidebar;
