
import React from 'react';
import { Link } from 'react-router-dom';
import { Copyright } from 'lucide-react';
import { TooltipProvider } from '@/components/ui/tooltip';

const MessageFooter: React.FC = () => {
  return <footer className="w-full border-t border-zinc-800 bg-zinc-900 py-2">
      <div className="px-4 py-2 text-xs flex justify-between items-center">
        <div>
          <Link to="/terms" className="text-zinc-500 hover:text-zinc-300 transition-colors mr-3">Terms</Link>
          <Link to="/about" className="text-zinc-500 hover:text-zinc-300 transition-colors mr-3">About</Link>
          <Link to="/community" className="text-zinc-500 hover:text-zinc-300 transition-colors">Community</Link>
        </div>
        <div className="flex items-center text-white">
          <Copyright size={14} className="mr-1" />
          <span>2025 dreamdate.online</span>
        </div>
      </div>
    </footer>;
};

export default MessageFooter;
