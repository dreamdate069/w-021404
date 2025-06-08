
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserCoinBalance } from '@/hooks/useUserCoinBalance';
import DreamCoinBalance from '@/components/DreamCoinBalance';
import AuthModal from '@/components/auth/AuthModal';
import { Button } from '@/components/ui/button';
import { User, LogOut, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleProfileClick = () => {
    if (user) {
      navigate(`/profile/${user.id}`);
    }
  };

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
          onAuthComplete={() => navigate('/discover')}
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
        <Button
          variant="ghost"
          size="sm"
          onClick={handleProfileClick}
          className="text-white hover:bg-zinc-700 px-2"
        >
          <User className="w-4 h-4 mr-1" />
          <span className="text-sm">
            {user.user_metadata?.first_name || user.email?.split('@')[0]}
          </span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/settings')}
          className="text-zinc-400 hover:text-white hover:bg-zinc-700 p-1"
        >
          <Settings className="w-4 h-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSignOut}
          className="text-zinc-400 hover:text-white hover:bg-zinc-700 p-1"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ConditionalHeader;
