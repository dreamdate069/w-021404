
import React from 'react';
import MessageInput from './MessageInput';

interface MessageInputContainerProps {
  conversationId: string | null;
  onSendMessage: (content: string) => void;
}

const MessageInputContainer: React.FC<MessageInputContainerProps> = ({
  conversationId,
  onSendMessage
}) => {
  if (!conversationId) return null;
  
  return (
    <div className="border-t border-zinc-800 py-2 px-4">
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
};

export default MessageInputContainer;
