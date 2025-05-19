
import React from 'react';
import { Conversation, Message, ChatParticipant } from '@/types/chat';
import ChatHeader from '@/components/messages/ChatHeader';
import MessageList from '@/components/messages/MessageList';
import MessageInput from '@/components/messages/MessageInput';
import EmptyMessages from '@/components/messages/EmptyMessages';
import MediaUploader from '@/components/MediaUploader';
import GiftSelector from '@/components/GiftSelector';
import CoinTransfer from '@/components/CoinTransfer';
import { Button } from '@/components/ui/button';
import { getUserById } from '@/utils/chatUtils';
import { getUserBalance } from '@/utils/dreamCoinUtils';

interface ChatAreaProps {
  selectedConversation: Conversation | undefined;
  otherParticipant: ChatParticipant | null;
  messages: Message[];
  currentUserId: string;
  onSendMessage: (content: string) => void;
  showMediaUploader: boolean;
  setShowMediaUploader: (show: boolean) => void;
  showGiftSelector: boolean;
  setShowGiftSelector: (show: boolean) => void;
  showCoinTransfer: boolean;
  setShowCoinTransfer: (show: boolean) => void;
  handleFileSelect: (file: File) => void;
  handleGiftSelect: (giftId: string) => void;
  handleCoinTransfer: (amount: number) => void;
}

const ChatArea: React.FC<ChatAreaProps> = ({
  selectedConversation,
  otherParticipant,
  messages,
  currentUserId,
  onSendMessage,
  showMediaUploader,
  setShowMediaUploader,
  showGiftSelector,
  setShowGiftSelector,
  showCoinTransfer,
  setShowCoinTransfer,
  handleFileSelect,
  handleGiftSelect,
  handleCoinTransfer
}) => {
  if (!selectedConversation || !otherParticipant) {
    return <EmptyMessages />;
  }

  return (
    <>
      {/* Chat header */}
      <ChatHeader 
        participant={otherParticipant} 
        currentUserId={currentUserId} 
      />
      
      {/* Messages with independent scrolling */}
      <div className="flex-1 relative overflow-hidden">
        <MessageList
          messages={messages}
          currentUserId={currentUserId}
          getUserById={getUserById}
        />
      
        {/* Message input - sticky to bottom */}
        <MessageInput onSendMessage={onSendMessage} />
      </div>
      
      {/* Overlay components */}
      {showMediaUploader && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10">
          <div className="bg-zinc-900 p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Upload Media</h3>
            <MediaUploader 
              onFileSelect={handleFileSelect}
              accept="image/*,video/*,audio/*"
              maxSize={10 * 1024 * 1024} // 10MB
            />
            <div className="mt-4 flex justify-end">
              <Button 
                variant="outline" 
                onClick={() => setShowMediaUploader(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Gift selector overlay */}
      {showGiftSelector && (
        <GiftSelector
          open={showGiftSelector}
          onOpenChange={setShowGiftSelector}
          onGiftSelect={handleGiftSelect}
          balance={getUserBalance(currentUserId)}
          recipientName={otherParticipant.name}
        />
      )}
      
      {/* Coin transfer overlay */}
      {showCoinTransfer && (
        <CoinTransfer
          open={showCoinTransfer}
          onOpenChange={setShowCoinTransfer}
          balance={getUserBalance(currentUserId)}
          recipientName={otherParticipant.name}
          onTransfer={handleCoinTransfer}
        />
      )}
    </>
  );
};

export default ChatArea;
