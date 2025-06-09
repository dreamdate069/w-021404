
import React, { useState } from 'react';
import { MapPin, Crosshair } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { OnboardingData } from '../OnboardingFlow';

interface LocationStepProps {
  data: Partial<OnboardingData>;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev?: () => void;
}

const LocationStep: React.FC<LocationStepProps> = ({ data, onUpdate, onNext, onPrev }) => {
  const [location, setLocation] = useState(data.location || '');
  const [isLocating, setIsLocating] = useState(false);

  const handleLocationChange = (value: string) => {
    setLocation(value);
    onUpdate({ location: value });
  };

  const getCurrentLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // In a real app, you'd use a geocoding service
            // For now, we'll simulate getting a city name
            const mockLocation = "New York, NY";
            setLocation(mockLocation);
            onUpdate({ location: mockLocation });
          } catch (error) {
            console.error('Error getting location:', error);
          } finally {
            setIsLocating(false);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLocating(false);
        }
      );
    } else {
      setIsLocating(false);
    }
  };

  const canProceed = location.trim().length > 0;

  return (
    <div>
      <div className="text-center mb-6">
        <MapPin className="w-12 h-12 text-pink-500 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Where are you?</h2>
        <p className="text-gray-600">We'll show you people nearby and keep your exact location private</p>
      </div>

      <div className="space-y-4 mb-6">
        <Button
          onClick={getCurrentLocation}
          disabled={isLocating}
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
        >
          <Crosshair className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
          {isLocating ? 'Getting location...' : 'Use my current location'}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">or</span>
          </div>
        </div>

        <Input
          placeholder="Enter your city"
          value={location}
          onChange={(e) => handleLocationChange(e.target.value)}
          className="text-center"
        />
      </div>

      <div className="flex gap-3">
        {onPrev && (
          <Button variant="outline" onClick={onPrev} className="flex-1">
            Back
          </Button>
        )}
        <Button 
          onClick={onNext} 
          disabled={!canProceed}
          className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default LocationStep;
