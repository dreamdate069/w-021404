
import React from 'react';
import { Heart, Users, MessageCircle, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OnboardingData } from '../OnboardingFlow';

interface WelcomeStepProps {
  data?: Partial<OnboardingData>;
  onUpdate?: (stepData: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev?: () => void;
  isLast?: boolean;
}

const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext }) => {
  return (
    <div className="text-center">
      <div className="mb-6">
        <img 
          src="/lovable-uploads/cdd2e339-d00c-4458-b5cc-7a69afcfa1de.png" 
          alt="DreamDate" 
          className="h-16 mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome to DreamDate
        </h1>
        <p className="text-gray-600">
          Find meaningful connections with people around the world
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex items-center text-left">
          <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mr-3">
            <Heart className="w-5 h-5 text-pink-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Find Your Match</h3>
            <p className="text-sm text-gray-600">Discover compatible people based on your preferences</p>
          </div>
        </div>

        <div className="flex items-center text-left">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            <MessageCircle className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Start Conversations</h3>
            <p className="text-sm text-gray-600">Chat with matches and build connections</p>
          </div>
        </div>

        <div className="flex items-center text-left">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
            <Shield className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Safe & Secure</h3>
            <p className="text-sm text-gray-600">Your privacy and safety are our top priority</p>
          </div>
        </div>
      </div>

      <Button 
        onClick={onNext}
        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
      >
        Get Started
      </Button>
    </div>
  );
};

export default WelcomeStep;
