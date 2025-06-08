
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserCoinBalance } from '@/hooks/useUserCoinBalance';
import DreamCoinBalance from '@/components/DreamCoinBalance';
import AuthModal from '@/components/auth/AuthModal';
import { Button } from '@/components/ui/button';
import { User, LogOut } from 'lucide-react';

interface ConditionalHeaderProps {
  showBuyButton?: boolean;
  className?: string;
}

const ConditionalHeader: React.FC<ConditionalHeaderProps> = ({ 
  showBuyButton = true,
  className = ''
}) => {
  const { user, loading: authLoading, signOut } = useAuth();
  const { balance, loading: balanceLoading } = useUserCoinBalance();
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (authLoading) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="animate-pulse bg-zinc-700 h-8 w-24 rounded"></div>
      </div>
    );
  }

  if (!user) {
    // Show Login/Register buttons for non-authenticated users
    return (
      <>
        <div className={`flex items-center gap-2 ${className}`}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAuthModal(true)}
            className="border-zinc-600 text-white hover:bg-zinc-700"
          >
            <User className="w-4 h-4 mr-1" />
            Sign In
          </Button>
          <Button
            size="sm"
            onClick={() => setShowAuthModal(true)}
            className="bg-pink-500 hover:bg-pink-600 text-white"
          >
            Join Free
          </Button>
        </div>
        
        <AuthModal 
          open={showAuthModal} 
          onOpenChange={setShowAuthModal} 
        />
      </>
    );
  }

  // Show DreamCoin balance and user menu for authenticated users
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <DreamCoinBalance 
        balance={balanceLoading ? 0 : balance}
        showBuyButton={showBuyButton}
      />
      
      <div className="flex items-center gap-2">
        <span className="text-white text-sm">
          {user.user_metadata?.first_name || user.email?.split('@')[0]}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={signOut}
          className="text-zinc-400 hover:text-white hover:bg-zinc-700 p-1"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ConditionalHeader;
