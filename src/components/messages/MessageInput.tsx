
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [messageInput, setMessageInput] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!messageInput.trim()) return;
    
    onSendMessage(messageInput);
    setMessageInput('');
  };

  return (
    <div className="sticky bottom-0 p-4 border-t border-zinc-800 bg-zinc-900">
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <Input
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1"
        />
        <Button type="submit" className="send-button">
          <Send size={18} />
        </Button>
      </form>
    </div>
  );
};

export default MessageInput;
