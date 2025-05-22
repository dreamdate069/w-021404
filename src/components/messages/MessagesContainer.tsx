
import React from 'react';
import { Conversation, Message, ChatParticipant } from '@/types/chat';
import ProfileInfoColumn from '@/components/ProfileInfoColumn';
import ConversationList from '@/components/messages/ConversationList';
import ChatArea from '@/components/messages/ChatArea';
import SharedMediaColumn from '@/components/messages/SharedMediaColumn';
import SidebarNav from '@/components/SidebarNav';
import { useIsMobile } from '@/hooks/use-mobile';

interface MessagesContainerProps {
  selectedConversation: Conversation | undefined;
  conversations: Conversation[];
  messages: Message[];
  selectedConversationId: string | null;
  currentUserId: string;
  onSelectConversation: (conversationId: string) => void;
  getOtherParticipant: (conversation: Conversation) => ChatParticipant | null;
  otherParticipant: ChatParticipant | null;
  isFriend: boolean;
  onToggleFriend: () => void;
  onPoke: () => void;
  onSendMessage: (content: string) => void;
  showGiftSelector: boolean;
  setShowGiftSelector: (show: boolean) => void;
  showCoinTransfer: boolean;
  setShowCoinTransfer: (show: boolean) => void;
  showMediaUploader: boolean;
  setShowMediaUploader: (show: boolean) => void;
  handleGiftSelect: (giftId: string) => void;
  handleCoinTransfer: (amount: number) => void;
  handleFileSelect: (file: File) => void;
}

const MessagesContainer: React.FC<MessagesContainerProps> = ({
  selectedConversation,
  conversations,
  messages,
  selectedConversationId,
  currentUserId,
  onSelectConversation,
  getOtherParticipant,
  otherParticipant,
  isFriend,
  onToggleFriend,
  onPoke,
  onSendMessage,
  showGiftSelector,
  setShowGiftSelector,
  showCoinTransfer,
  setShowCoinTransfer,
  showMediaUploader,
  setShowMediaUploader,
  handleGiftSelect,
  handleCoinTransfer,
  handleFileSelect
}) => {
  const isMobile = useIsMobile();

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      {/* Navigation Sidebar */}
      <SidebarNav />
      
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Column 1: Profile Info - hidden on mobile */}
        {!isMobile && otherParticipant && (
          <div className="w-[220px] flex-shrink-0">
            <ProfileInfoColumn 
              participant={otherParticipant}
              isFriend={isFriend}
              onToggleFriend={onToggleFriend}
              onPoke={onPoke}
            />
          </div>
        )}
        
        {/* Column 2: Shared Media - hidden on mobile */}
        {!isMobile && selectedConversation && (
          <div className="w-[180px] flex-shrink-0">
            <SharedMediaColumn messages={messages} />
          </div>
        )}
        
        {/* Column 3: Chat Area */}
        <div className="flex-1 flex flex-col h-full">
          <ChatArea 
            selectedConversation={selectedConversation}
            otherParticipant={otherParticipant}
            messages={messages}
            currentUserId={currentUserId}
            onSendMessage={onSendMessage}
            showMediaUploader={showMediaUploader}
            setShowMediaUploader={setShowMediaUploader}
            showGiftSelector={showGiftSelector}
            setShowGiftSelector={setShowGiftSelector}
            showCoinTransfer={showCoinTransfer}
            setShowCoinTransfer={setShowCoinTransfer}
            handleFileSelect={handleFileSelect}
            handleGiftSelect={handleGiftSelect}
            handleCoinTransfer={handleCoinTransfer}
          />
        </div>
        
        {/* Column 4: Conversations List */}
        <ConversationList 
          conversations={conversations}
          selectedConversationId={selectedConversationId}
          onSelectConversation={onSelectConversation}
          getOtherParticipant={getOtherParticipant}
        />
      </div>
    </div>
  );
};

export default MessagesContainer;
