
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import {
  initializeChatSystem,
  getUserConversations,
  getConversationMessages,
  markConversationAsRead,
  sendTextMessage,
  sendMediaMessage,
  sendGiftMessage,
  sendCoinTransferMessage,
  sendSystemMessage,
  getUserById
} from '@/utils/chatUtils';
import { Conversation, Message } from '@/types/chat';

export const useConversations = (currentUserId: string) => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  // State
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isFriend, setIsFriend] = useState(false);
  const [showGiftSelector, setShowGiftSelector] = useState(false);
  const [showCoinTransfer, setShowCoinTransfer] = useState(false);
  const [showMediaUploader, setShowMediaUploader] = useState(false);

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
  
  // Handle conversation selection
  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId);
    loadMessages(conversationId);
  };

  const selectedConversation = conversations.find(
    c => c.id === selectedConversationId
  );
  
  const otherParticipant = selectedConversation 
    ? getOtherParticipant(selectedConversation) 
    : null;
  
  return {
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
  };
};

export default useConversations;
