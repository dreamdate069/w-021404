
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { useChat } from '@/hooks/useChat';
import { getUserById } from '@/utils/chatUtils';
import ConversationList from '@/components/messages/ConversationList';
import ProfileInfoColumn from '@/components/ProfileInfoColumn';
import ChatLayout from '@/components/messages/ChatLayout';
import ChatOverlays from '@/components/messages/ChatOverlays';

const MessagesPage = () => {
  const { toast } = useToast();
  const {
    conversations,
    selectedConversationId,
    messages,
    currentUserId,
    showGiftSelector,
    showCoinTransfer,
    showMediaUploader,
    isFriend,
    selectedConversation,
    otherParticipant,
    setSelectedConversationId,
    setShowGiftSelector,
    setShowCoinTransfer,
    setShowMediaUploader,
    setIsFriend,
    loadMessages,
    getOtherParticipant,
    handleFileSelect,
    handleSendMessage,
    handleGiftSelect,
    handleCoinTransfer
  } = useChat();
  
  return (
    <div className="h-full flex flex-col md:flex-row">
      {/* Conversations sidebar */}
      <ConversationList 
        conversations={conversations}
        selectedConversationId={selectedConversationId}
        onSelectConversation={(convId) => {
          setSelectedConversationId(convId);
          loadMessages(convId);
        }}
        getOtherParticipant={getOtherParticipant}
      />
      
      {/* Profile info column */}
      {selectedConversation && otherParticipant ? (
        <div className="hidden md:block md:w-1/4 lg:w-1/5">
          <ProfileInfoColumn 
            participant={otherParticipant} 
            messages={messages}
          />
        </div>
      ) : null}
      
      {/* Chat area */}
      <div className="flex-1 flex flex-col h-full relative">
        {selectedConversation && otherParticipant ? (
          <>
            <ChatLayout
              messages={messages}
              otherParticipant={otherParticipant}
              currentUserId={currentUserId}
              isFriend={isFriend}
              onToggleFriend={() => {
                setIsFriend(!isFriend);
                toast({
                  title: isFriend ? "Friend removed" : "Friend added",
                  description: isFriend
                    ? `${otherParticipant.name} has been removed from your friends`
                    : `${otherParticipant.name} has been added to your friends`
                });
              }}
              onSendMessage={handleSendMessage}
              onEmojiSelect={handleSendMessage}
              onImageAttach={() => setShowMediaUploader(true)}
              onGiftSelect={() => setShowGiftSelector(true)}
              onCoinTransfer={() => setShowCoinTransfer(true)}
              getUserById={getUserById}
            />
            
            {/* Overlay components */}
            <ChatOverlays
              showMediaUploader={showMediaUploader}
              showGiftSelector={showGiftSelector}
              showCoinTransfer={showCoinTransfer}
              recipientName={otherParticipant.name}
              currentUserId={currentUserId}
              onMediaUploaderClose={() => setShowMediaUploader(false)}
              onFileSelect={handleFileSelect}
              onGiftSelectorOpenChange={setShowGiftSelector}
              onGiftSelect={handleGiftSelect}
              onCoinTransferOpenChange={setShowCoinTransfer}
              onCoinTransfer={handleCoinTransfer}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-zinc-500">Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
