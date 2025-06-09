
import React, { useState } from 'react';
import { Settings, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { OnboardingData } from '../OnboardingFlow';

interface PreferencesStepProps {
  data: Partial<OnboardingData>;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev?: () => void;
}

const PreferencesStep: React.FC<PreferencesStepProps> = ({ data, onUpdate, onNext, onPrev }) => {
  const [ageRange, setAgeRange] = useState<[number, number]>(data.preferences?.ageRange || [18, 35]);
  const [distance, setDistance] = useState(data.preferences?.distance || 25);
  const [interestedIn, setInterestedIn] = useState<string[]>(data.preferences?.interestedIn || []);

  const interests = ['Men', 'Women', 'Non-binary'];

  const toggleInterest = (interest: string) => {
    const newInterests = interestedIn.includes(interest)
      ? interestedIn.filter(i => i !== interest)
      : [...interestedIn, interest];
    
    setInterestedIn(newInterests);
    onUpdate({ 
      preferences: { 
        ageRange, 
        distance, 
        interestedIn: newInterests 
      } 
    });
  };

  const handleAgeChange = (value: number[]) => {
    const newRange: [number, number] = [value[0], value[1]];
    setAgeRange(newRange);
    onUpdate({ 
      preferences: { 
        ageRange: newRange, 
        distance, 
        interestedIn 
      } 
    });
  };

  const handleDistanceChange = (value: number[]) => {
    const newDistance = value[0];
    setDistance(newDistance);
    onUpdate({ 
      preferences: { 
        ageRange, 
        distance: newDistance, 
        interestedIn 
      } 
    });
  };

  const canProceed = interestedIn.length > 0;

  return (
    <div>
      <div className="text-center mb-6">
        <Settings className="w-12 h-12 text-pink-500 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Set Your Preferences</h2>
        <p className="text-gray-600">Help us find your perfect matches</p>
      </div>

      <div className="space-y-6 mb-6">
        {/* Interested In */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Interested in</h3>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  interestedIn.includes(interest)
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        {/* Age Range */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">
            Age range: {ageRange[0]} - {ageRange[1]}
          </h3>
          <Slider
            value={ageRange}
            onValueChange={handleAgeChange}
            max={80}
            min={18}
            step={1}
            className="w-full"
          />
        </div>

        {/* Distance */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">
            Maximum distance: {distance} miles
          </h3>
          <Slider
            value={[distance]}
            onValueChange={handleDistanceChange}
            max={100}
            min={1}
            step={1}
            className="w-full"
          />
        </div>
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

export default PreferencesStep;
