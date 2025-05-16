
import React from 'react';
import { Message } from '@/types/chat';
import MessageList from '@/components/messages/MessageList';
import EmptyMessages from '@/components/messages/EmptyMessages';
import ChatHeader from '@/components/messages/ChatHeader';
import { getUserById } from '@/utils/chatUtils';

interface MessageContainerProps {
  messages: Message[];
  conversationId: string | null;
  currentUserId: string;
  otherParticipant: any;
}

const MessageContainer: React.FC<MessageContainerProps> = ({
  messages,
  conversationId,
  currentUserId,
  otherParticipant
}) => {
  if (!conversationId || !otherParticipant) {
    return <EmptyMessages />;
  }

  return (
    <>
      <ChatHeader 
        participant={otherParticipant} 
        currentUserId={currentUserId} 
      />
      
      <div className="flex-1 relative overflow-hidden">
        <MessageList
          messages={messages}
          currentUserId={currentUserId}
          getUserById={getUserById}
        />
      </div>
    </>
  );
};

export default MessageContainer;
