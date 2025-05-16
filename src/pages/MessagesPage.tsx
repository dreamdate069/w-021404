
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Conversation } from '@/types/chat';

// Import components
import ChatSidebar from '@/components/ChatSidebar';
import ProfileInfoColumn from '@/components/ProfileInfoColumn';
import MediaUploader from '@/components/MediaUploader';
import GiftSelector from '@/components/GiftSelector';
import CoinTransfer from '@/components/CoinTransfer';
import ConversationList from '@/components/messages/ConversationList';
import EmptyMessages from '@/components/messages/EmptyMessages';
import MessageContainer from '@/components/messages/MessageContainer';
import MessageInputContainer from '@/components/messages/MessageInputContainer';
import MessageFooter from '@/components/messages/MessageFooter';

// Import custom hooks
import useConversations from '@/hooks/useConversations';
import useMessageActions from '@/hooks/useMessageActions';

// Import utility functions
import { getUserById } from '@/utils/chatUtils';
import { getUserBalance } from '@/utils/dreamCoinUtils';

const MessagesPage = () => {
  // State
  const [currentUserId] = useState('current-user');
  const [showGiftSelector, setShowGiftSelector] = useState(false);
  const [showCoinTransfer, setShowCoinTransfer] = useState(false);
  const [showMediaUploader, setShowMediaUploader] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  
  const { toast } = useToast();
  
  // Use custom hooks
  const { 
    conversations, 
    selectedConversationId, 
    messages, 
    loadConversations, 
    loadMessages, 
    setSelectedConversationId 
  } = useConversations(currentUserId);
  
  const { 
    handleSendMessage, 
    handleFileSelect, 
    handleGiftSelect,
    handleCoinTransfer,
    handlePoke
  } = useMessageActions(loadConversations, loadMessages);
  
  // Get selected conversation and other participant
  const selectedConversation = conversations.find(
    c => c.id === selectedConversationId
  );
  
  // Get other participant in conversation
  const getOtherParticipant = (conversation: Conversation) => {
    const otherParticipantId = conversation.participants.find(
      id => id !== currentUserId
    );
    return otherParticipantId ? getUserById(otherParticipantId) : null;
  };
  
  const otherParticipant = selectedConversation 
    ? getOtherParticipant(selectedConversation) 
    : null;
  
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex-1 flex overflow-hidden">
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
              onPoke={() => {
                if (selectedConversationId && otherParticipant) {
                  handlePoke(selectedConversationId, otherParticipant.name);
                }
              }}
            />
          </div>
        ) : null}
        
        {/* Chat area - made narrower */}
        <div className="flex-1 max-w-[45%] flex flex-col h-full overflow-hidden">
          <MessageContainer 
            messages={messages}
            conversationId={selectedConversationId}
            currentUserId={currentUserId}
            otherParticipant={otherParticipant}
          />
          
          {/* Message input placed here instead of footer */}
          <MessageInputContainer 
            conversationId={selectedConversationId}
            onSendMessage={(content) => {
              if (selectedConversationId) {
                handleSendMessage(selectedConversationId, content);
              }
            }} 
          />
          
          {/* Overlay components */}
          {showMediaUploader && selectedConversationId && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10">
              <div className="bg-zinc-900 p-6 rounded-lg max-w-md w-full">
                <h3 className="text-xl font-bold mb-4">Upload Media</h3>
                <MediaUploader 
                  onFileSelect={(file) => handleFileSelect(selectedConversationId, file)}
                  accept="image/*,video/*,audio/*"
                  maxSize={10 * 1024 * 1024} // 10MB
                />
                <div className="mt-4 flex justify-end">
                  <button 
                    className="px-4 py-2 bg-zinc-800 rounded text-white hover:bg-zinc-700"
                    onClick={() => setShowMediaUploader(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Gift selector overlay */}
          {showGiftSelector && selectedConversationId && otherParticipant && (
            <GiftSelector
              open={showGiftSelector}
              onOpenChange={setShowGiftSelector}
              onGiftSelect={(giftId) => handleGiftSelect(selectedConversationId, giftId, otherParticipant.id)}
              balance={getUserBalance(currentUserId)}
              recipientName={otherParticipant.name}
            />
          )}
          
          {/* Coin transfer overlay */}
          {showCoinTransfer && selectedConversationId && otherParticipant && (
            <CoinTransfer
              open={showCoinTransfer}
              onOpenChange={setShowCoinTransfer}
              balance={getUserBalance(currentUserId)}
              recipientName={otherParticipant.name}
              onTransfer={(amount) => handleCoinTransfer(selectedConversationId, amount, otherParticipant.id)}
            />
          )}
        </div>
        
        {/* Chat sidebar with actions */}
        {selectedConversation && otherParticipant && (
          <ChatSidebar
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
            onEmojiSelect={(emoji) => {
              if (selectedConversationId) {
                handleSendMessage(selectedConversationId, emoji);
              }
            }}
            onImageAttach={() => setShowMediaUploader(true)}
            onGiftSelect={() => setShowGiftSelector(true)}
            onCoinTransfer={() => setShowCoinTransfer(true)}
          />
        )}
      </div>
      
      {/* Transparent Footer without message input */}
      <MessageFooter />
    </div>
  );
};

export default MessagesPage;
