
import React from 'react';
import { Conversation, Message, ChatParticipant } from '@/types/chat';
import ProfileInfoColumn from '@/components/ProfileInfoColumn';
import ConversationList from '@/components/messages/ConversationList';
import ChatArea from '@/components/messages/ChatArea';

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
  return (
    <div className="h-screen flex overflow-hidden">
      {/* Column 1: Profile Info */}
      {selectedConversation && otherParticipant ? (
        <div className="w-1/3 border-r border-zinc-800">
          <ProfileInfoColumn 
            participant={otherParticipant}
            messages={messages}
            isFriend={isFriend}
            onToggleFriend={onToggleFriend}
            onPoke={onPoke}
          />
        </div>
      ) : (
        <div className="w-1/3 border-r border-zinc-800 bg-zinc-900"></div>
      )}
      
      {/* Column 2: Chat Area */}
      <div className="flex-1 w-1/3 flex flex-col h-full border-r border-zinc-800">
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
      
      {/* Column 3: Conversations List */}
      <div className="w-1/3">
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
