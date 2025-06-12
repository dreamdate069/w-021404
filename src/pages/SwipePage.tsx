
import React, { useState } from 'react';
import SwipeStack from '@/components/swipe/SwipeStack';
import { Settings, User, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import QuickSignUpModal from '@/components/auth/QuickSignUpModal';

const SwipePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showSignUp, setShowSignUp] = useState(false);

  const handleProfileClick = () => {
    if (user) {
      navigate(`/profile/${user.id}`);
    } else {
      setShowSignUp(true);
    }
  };

  const handleSettingsClick = () => {
    if (user) {
      navigate('/settings');
    } else {
      setShowSignUp(true);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-pink-50 via-white to-purple-50 overflow-hidden">
      {/* Header - Fixed height */}
      <div className="flex justify-between items-center p-4 flex-shrink-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleProfileClick}
          className="text-gray-600 hover:text-gray-900"
        >
          <User className="w-6 h-6" />
        </Button>
        
        <img 
          src="/lovable-uploads/cdd2e339-d00c-4458-b5cc-7a69afcfa1de.png" 
          alt="DreamDate" 
          className="h-8 object-contain"
        />
        
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSettingsClick}
          className="text-gray-600 hover:text-gray-900"
        >
          <Settings className="w-6 h-6" />
        </Button>
      </div>

      {/* Main Content - Flexible height */}
      <div className="flex-1 flex items-center justify-center p-4 min-h-0">
        <div className="w-full max-w-sm h-full max-h-[calc(100vh-200px)]">
          <SwipeStack />
        </div>
      </div>

      {/* Tips - Fixed height */}
      <div className="p-4 text-center flex-shrink-0">
        <p className="text-sm text-gray-500">
          Swipe right to like • Swipe left to pass • Tap the star for Super Like
        </p>
        {!user && (
          <Button
            onClick={() => setShowSignUp(true)}
            className="mt-2 bg-pink-500 hover:bg-pink-600 text-white"
          >
            <Heart className="w-4 h-4 mr-2" />
            Sign Up to Save Matches
          </Button>
        )}
      </div>

      <QuickSignUpModal
        open={showSignUp}
        onOpenChange={setShowSignUp}
        onComplete={() => navigate('/swipe')}
      />
    </div>
  );
};

export default SwipePage;
