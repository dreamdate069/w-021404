
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EmptyMessages: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
      <MessageSquare size={48} className="text-zinc-500 mb-4" />
      <h2 className="text-2xl font-bold mb-2">Your Messages</h2>
      <p className="text-zinc-400 mb-4">
        Select a conversation to start chatting
      </p>
      <Link to="/browse">
        <Button>Browse Profiles</Button>
      </Link>
    </div>
  );
};

export default EmptyMessages;
