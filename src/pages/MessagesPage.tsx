import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Conversation, Message, MessageType } from '@/types/chat';
import { Button } from '@/components/ui/button';

// Import utility functions
import {
  initializeChatSystem,
  getUserById,
  getUserConversations,
  getConversationMessages,
  markConversationAsRead,
  sendTextMessage,
  sendMediaMessage,
  sendGiftMessage,
  sendCoinTransferMessage,
  sendSystemMessage
} from '@/utils/chatUtils';

// Import components
import SidebarNav from '@/components/SidebarNav';
import ChatSidebar from '@/components/ChatSidebar';
import ProfileInfoColumn from '@/components/ProfileInfoColumn';
import MediaUploader from '@/components/MediaUploader';
import GiftSelector from '@/components/GiftSelector';
import CoinTransfer from '@/components/CoinTransfer';
import ChatHeader from '@/components/messages/ChatHeader';
import MessageList from '@/components/messages/MessageList';
import MessageInput from '@/components/messages/MessageInput';
import EmptyMessages from '@/components/messages/EmptyMessages';
import MessageFooter from '@/components/messages/MessageFooter';
import { getUserBalance } from '@/utils/dreamCoinUtils';

const MessagesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  
  // State
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUserId] = useState('current-user');
  const [showGiftSelector, setShowGiftSelector] = useState(false);
  const [showCoinTransfer, setShowCoinTransfer] = useState(false);
  const [showMediaUploader, setShowMediaUploader] = useState(false);
  const [isFriend, setIsFriend] = useState(false);

  // Initialize chat
  useEffect(() => {
    // Initialize chat system
    initializeChatSystem();
    
    // Load conversations
    loadConversations();
    
    // Check URL for conversation ID
    const urlUserId = searchParams.get('userId');
    if (urlUserId) {
      // Find or create conversation with this user
      const conversation = conversations.find(
        c => c.participants.includes(urlUserId)
      );
      
      if (conversation) {
        setSelectedConversationId(conversation.id);
        loadMessages(conversation.id);
      }
    }
  }, [searchParams]);
  
  // Load conversations
  const loadConversations = () => {
    const userConversations = getUserConversations();
    setConversations(userConversations);
    
    if (userConversations.length > 0 && !selectedConversationId) {
      setSelectedConversationId(userConversations[0].id);
      loadMessages(userConversations[0].id);
    }
  };
  
  // Load messages for selected conversation
  const loadMessages = (conversationId: string) => {
    const conversationMessages = getConversationMessages(conversationId);
    setMessages(conversationMessages);
    
    // Mark conversation as read
    markConversationAsRead(conversationId);
    
    // Update conversations list (to reflect read status)
    const updatedConversations = getUserConversations();
    setConversations(updatedConversations);
  };
  
  // Get other participant in conversation
  const getOtherParticipant = (conversation: Conversation) => {
    const otherParticipantId = conversation.participants.find(
      id => id !== currentUserId
    );
    return otherParticipantId ? getUserById(otherParticipantId) : null;
  };
  
  // Handle file select 
  const handleFileSelect = (file: File) => {
    if (!selectedConversationId) return;
    
    // Determine media type
    let mediaType: 'image' | 'video' | 'audio' = 'image';
    if (file.type.startsWith('video/')) {
      mediaType = 'video';
    } else if (file.type.startsWith('audio/')) {
      mediaType = 'audio';
    }
    
    // In a real app, we would upload the file to a server here
    sendMediaMessage(selectedConversationId, file, mediaType);
    
    // Refresh conversations and messages
    loadConversations();
    loadMessages(selectedConversationId);
    
    // Hide media uploader
    setShowMediaUploader(false);
    
    toast({
      title: "Media sent",
      description: `Your ${mediaType} has been sent`
    });
  };
  
  // Handle send message
  const handleSendMessage = (content: string) => {
    if (!selectedConversationId) return;
    
    // Send message
    sendTextMessage(selectedConversationId, content);
    
    // Refresh conversations and messages
    loadConversations();
    loadMessages(selectedConversationId);
  };
  
  // Handle gift selection
  const handleGiftSelect = (giftId: string) => {
    if (!selectedConversationId) return;
    
    try {
      // Get other participant
      const conversation = conversations.find(c => c.id === selectedConversationId);
      if (!conversation) return;
      
      const otherParticipant = getOtherParticipant(conversation);
      if (!otherParticipant) return;
      
      // Send gift
      sendGiftMessage(selectedConversationId, giftId, otherParticipant.id);
      
      // Refresh conversations and messages
      loadConversations();
      loadMessages(selectedConversationId);
      
      // Hide gift selector
      setShowGiftSelector(false);
      
      toast({
        title: "Gift sent",
        description: "Your gift has been delivered!"
      });
    } catch (error) {
      toast({
        title: "Error sending gift",
        description: (error as Error).message,
        variant: "destructive"
      });
    }
  };
  
  // Handle coin transfer
  const handleCoinTransfer = (amount: number) => {
    if (!selectedConversationId) return;
    
    try {
      // Get other participant
      const conversation = conversations.find(c => c.id === selectedConversationId);
      if (!conversation) return;
      
      const otherParticipant = getOtherParticipant(conversation);
      if (!otherParticipant) return;
      
      // Send coins
      sendCoinTransferMessage(selectedConversationId, amount, otherParticipant.id);
      
      // Refresh conversations and messages
      loadConversations();
      loadMessages(selectedConversationId);
      
      // Hide coin transfer
      setShowCoinTransfer(false);
      
      toast({
        title: "DreamCoins sent",
        description: `You sent ${amount} DreamCoins (${amount * 0.8} after service fee)`
      });
    } catch (error) {
      toast({
        title: "Error sending DreamCoins",
        description: (error as Error).message,
        variant: "destructive"
      });
    }
  };
  
  // Handle poke
  const handlePoke = () => {
    if (!selectedConversationId) return;
    
    try {
      // Get other participant
      const conversation = conversations.find(c => c.id === selectedConversationId);
      if (!conversation) return;
      
      const otherParticipant = getOtherParticipant(conversation);
      if (!otherParticipant) return;
      
      // Send system message about poke
      sendSystemMessage(
        selectedConversationId, 
        `You poked ${otherParticipant.name}! They'll be notified.`
      );
      
      // Refresh conversations and messages
      loadConversations();
      loadMessages(selectedConversationId);
      
      toast({
        title: "Poke sent",
        description: `You poked ${otherParticipant.name}!`
      });
    } catch (error) {
      toast({
        title: "Error sending poke",
        description: (error as Error).message,
        variant: "destructive"
      });
    }
  };
  
  const selectedConversation = conversations.find(
    c => c.id === selectedConversationId
  );
  
  const otherParticipant = selectedConversation 
    ? getOtherParticipant(selectedConversation) 
    : null;
  
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex-1 flex overflow-hidden">
        {/* Profile info column - on left side */}
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
              onPoke={handlePoke}
            />
          </div>
        ) : null}
        
        {/* Chat area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {selectedConversation && otherParticipant ? (
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
                <MessageInput onSendMessage={handleSendMessage} />
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
          ) : (
            <EmptyMessages />
          )}
        </div>
        
        {/* Right sidebar with messages - now properly placed on the right */}
        <SidebarNav />
      </div>
      
      {/* Transparent Footer */}
      <MessageFooter />
    </div>
  );
};

export default MessagesPage;
