
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Conversation } from '@/types/chat';
import {
  getUserConversations,
  initializeChatSystem,
  markConversationAsRead,
  getConversationMessages
} from '@/utils/chatUtils';

export const useConversations = (currentUserId: string) => {
  const [searchParams] = useSearchParams();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState([]);
  
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
  
  return {
    conversations,
    selectedConversationId,
    messages,
    loadConversations,
    loadMessages,
    setSelectedConversationId
  };
};

export default useConversations;
