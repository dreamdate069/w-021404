
import React from 'react';
import SwipeStack from '@/components/swipe/SwipeStack';
import { Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const SwipePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/profile')}
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
          onClick={() => navigate('/settings')}
          className="text-gray-600 hover:text-gray-900"
        >
          <Settings className="w-6 h-6" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <SwipeStack />
      </div>

      {/* Tips */}
      <div className="p-4 text-center">
        <p className="text-sm text-gray-500">
          Swipe right to like • Swipe left to pass • Tap the star for Super Like
        </p>
      </div>
    </div>
  );
};

export default SwipePage;
