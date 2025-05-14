
import React from 'react';
import { ChatParticipant } from '@/types/chat';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ChatSidebar from '@/components/ChatSidebar';
import EmptyMessages from './EmptyMessages';

interface ChatLayoutProps {
  messages: any[];
  otherParticipant: ChatParticipant | null;
  currentUserId: string;
  isFriend: boolean;
  onToggleFriend: () => void;
  onSendMessage: (content: string) => void;
  onEmojiSelect: (emoji: string) => void;
  onImageAttach: () => void;
  onGiftSelect: () => void;
  onCoinTransfer: () => void;
  getUserById: (id: string) => any;
}

const ChatLayout: React.FC<ChatLayoutProps> = ({
  messages,
  otherParticipant,
  currentUserId,
  isFriend,
  onToggleFriend,
  onSendMessage,
  onEmojiSelect,
  onImageAttach,
  onGiftSelect,
  onCoinTransfer,
  getUserById
}) => {
  if (!otherParticipant) {
    return <EmptyMessages />;
  }

  return (
    <>
      {/* Chat header */}
      <ChatHeader 
        participant={otherParticipant} 
        currentUserId={currentUserId} 
      />
      
      {/* Messages */}
      <MessageList
        messages={messages}
        currentUserId={currentUserId}
        getUserById={getUserById}
      />
      
      {/* Message input */}
      <MessageInput onSendMessage={onSendMessage} />

      {/* Chat sidebar with actions */}
      <ChatSidebar
        isFriend={isFriend}
        onToggleFriend={onToggleFriend}
        onEmojiSelect={onEmojiSelect}
        onImageAttach={onImageAttach}
        onGiftSelect={onGiftSelect}
        onCoinTransfer={onCoinTransfer}
      />
    </>
  );
};

export default ChatLayout;
