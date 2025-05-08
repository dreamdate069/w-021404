
import React from 'react';
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

  const handleEmoji = () => {
    toast({
      title: "Emoji Picker",
      description: "Emoji picker would open here",
    });
  };

  const handleAttach = () => {
    toast({
      title: "Attach Media",
      description: "Media upload options would appear here",
    });
  };

  const handleGiftShop = () => {
    toast({
      title: "Gift Shop",
      description: "Gift shop would open here",
    });
  };

  const handleCoinTransfer = () => {
    toast({
      title: "Coin Transfer",
      description: "Coin transfer dialog would open here",
    });
  };

  return (
    <div className="sticky top-0 right-0 h-screen w-[60px] flex flex-col items-center justify-end gap-6 bg-zinc-900 border-l border-zinc-800 py-8">
      <Button 
        variant="ghost" 
        className="rounded-full p-3 bg-zinc-800 hover:bg-custom-pink transition-colors" 
        onClick={handleEmoji}
      >
        <Smile size={24} className="text-white" />
      </Button>
      
      <Button 
        variant="ghost" 
        className="rounded-full p-3 bg-zinc-800 hover:bg-custom-pink transition-colors" 
        onClick={handleAttach}
      >
        <Image size={24} className="text-white" />
      </Button>
      
      <Button 
        variant="ghost" 
        className="rounded-full p-3 bg-zinc-800 hover:bg-custom-pink transition-colors" 
        onClick={handleGiftShop}
      >
        <Gift size={24} className="text-white" />
      </Button>
      
      <Button 
        variant="ghost" 
        className={cn(
          "rounded-full p-3 transition-colors", 
          isFriend ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
        )} 
        onClick={onToggleFriend}
      >
        {isFriend ? (
          <UserMinus size={24} className="text-white" />
        ) : (
          <UserPlus size={24} className="text-white" />
        )}
      </Button>
      
      <Button 
        variant="ghost" 
        className="rounded-full p-3 bg-yellow-600 hover:bg-yellow-700 transition-colors" 
        onClick={handleCoinTransfer}
      >
        <Coins size={24} className="text-white" />
      </Button>
    </div>
  );
};

export default ChatSidebar;
