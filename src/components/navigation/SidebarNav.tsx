
import React from 'react';
import ConversationList from '@/components/messages/ConversationList';
import { Conversation, ChatParticipant } from '@/types/chat';
import { getUserById, getUserConversations } from '@/utils/chatUtils';

const SidebarNav = () => {
  const [conversations, setConversations] = React.useState<Conversation[]>([]);
  const [selectedConversationId, setSelectedConversationId] = React.useState<string | null>(null);
  const [currentUserId] = React.useState('current-user');

  React.useEffect(() => {
    // Load conversations
    const userConversations = getUserConversations();
    setConversations(userConversations);
    
    if (userConversations.length > 0 && !selectedConversationId) {
      setSelectedConversationId(userConversations[0].id);
    }
  }, [selectedConversationId]);

  // Get other participant in conversation
  const getOtherParticipant = (conversation: Conversation) => {
    const otherParticipantId = conversation.participants.find(
      id => id !== currentUserId
    );
    return otherParticipantId ? getUserById(otherParticipantId) : null;
  };

  return (
    <ConversationList 
      conversations={conversations}
      selectedConversationId={selectedConversationId}
      onSelectConversation={(convId) => {
        setSelectedConversationId(convId);
      }}
      getOtherParticipant={getOtherParticipant}
    />
  );
};

export default SidebarNav;
