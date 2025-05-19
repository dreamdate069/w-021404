
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import useConversations from '@/hooks/useConversations';
import MessagesContainer from '@/components/messages/MessagesContainer';

const MessagesPage = () => {
  const { toast } = useToast();
  const [currentUserId] = useState('current-user');
  const {
    conversations,
    selectedConversation,
    selectedConversationId,
    messages,
    otherParticipant,
    isFriend,
    showGiftSelector,
    showCoinTransfer,
    showMediaUploader,
    getOtherParticipant,
    handleSelectConversation,
    handleSendMessage,
    handleFileSelect,
    handleGiftSelect,
    handleCoinTransfer,
    handlePoke,
    setIsFriend,
    setShowGiftSelector,
    setShowCoinTransfer,
    setShowMediaUploader,
  } = useConversations(currentUserId);
  
  return (
    <MessagesContainer
      selectedConversation={selectedConversation}
      conversations={conversations}
      messages={messages}
      selectedConversationId={selectedConversationId}
      currentUserId={currentUserId}
      onSelectConversation={handleSelectConversation}
      getOtherParticipant={getOtherParticipant}
      otherParticipant={otherParticipant}
      isFriend={isFriend}
      onToggleFriend={() => {
        setIsFriend(!isFriend);
        toast({
          title: isFriend ? "Friend removed" : "Friend added",
          description: isFriend && otherParticipant
            ? `${otherParticipant.name} has been removed from your friends`
            : otherParticipant
              ? `${otherParticipant.name} has been added to your friends`
              : "Friend status updated"
        });
      }}
      onPoke={handlePoke}
      onSendMessage={handleSendMessage}
      showGiftSelector={showGiftSelector}
      setShowGiftSelector={setShowGiftSelector}
      showCoinTransfer={showCoinTransfer}
      setShowCoinTransfer={setShowCoinTransfer}
      showMediaUploader={showMediaUploader}
      setShowMediaUploader={setShowMediaUploader}
      handleGiftSelect={handleGiftSelect}
      handleCoinTransfer={handleCoinTransfer}
      handleFileSelect={handleFileSelect}
    />
  );
};

export default MessagesPage;
