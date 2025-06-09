
import React, { useState } from 'react';
import { User, Briefcase, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { OnboardingData } from '../OnboardingFlow';

interface ProfileCompletionStepProps {
  data: Partial<OnboardingData>;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev?: () => void;
  isLast?: boolean;
}

const ProfileCompletionStep: React.FC<ProfileCompletionStepProps> = ({ 
  data, 
  onUpdate, 
  onNext, 
  onPrev, 
  isLast 
}) => {
  const [profile, setProfile] = useState({
    bio: data.profile?.bio || '',
    occupation: data.profile?.occupation || '',
    education: data.profile?.education || '',
    interests: data.profile?.interests || []
  });

  const [newInterest, setNewInterest] = useState('');

  const commonInterests = [
    'Travel', 'Music', 'Movies', 'Sports', 'Reading', 'Cooking',
    'Photography', 'Art', 'Dancing', 'Hiking', 'Gaming', 'Fitness'
  ];

  const updateProfile = (field: string, value: any) => {
    const newProfile = { ...profile, [field]: value };
    setProfile(newProfile);
    onUpdate({ profile: newProfile });
  };

  const addInterest = (interest: string) => {
    if (interest && !profile.interests.includes(interest)) {
      const newInterests = [...profile.interests, interest];
      updateProfile('interests', newInterests);
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    const newInterests = profile.interests.filter(i => i !== interest);
    updateProfile('interests', newInterests);
  };

  const canProceed = profile.bio.trim().length > 10 && profile.interests.length > 0;

  return (
    <div>
      <div className="text-center mb-6">
        <User className="w-12 h-12 text-pink-500 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Complete Your Profile</h2>
        <p className="text-gray-600">Tell us more about yourself</p>
      </div>

      <div className="space-y-4 mb-6">
        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            About me *
          </label>
          <Textarea
            placeholder="Tell people a bit about yourself..."
            value={profile.bio}
            onChange={(e) => updateProfile('bio', e.target.value)}
            rows={3}
            maxLength={500}
          />
          <p className="text-xs text-gray-500 mt-1">{profile.bio.length}/500</p>
        </div>

        {/* Occupation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Briefcase className="w-4 h-4 inline mr-1" />
            Occupation
          </label>
          <Input
            placeholder="What do you do for work?"
            value={profile.occupation}
            onChange={(e) => updateProfile('occupation', e.target.value)}
          />
        </div>

        {/* Education */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <GraduationCap className="w-4 h-4 inline mr-1" />
            Education
          </label>
          <Input
            placeholder="Your education background"
            value={profile.education}
            onChange={(e) => updateProfile('education', e.target.value)}
          />
        </div>

        {/* Interests */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Interests *
          </label>
          
          {/* Selected Interests */}
          {profile.interests.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {profile.interests.map((interest) => (
                <span
                  key={interest}
                  className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  {interest}
                  <button
                    onClick={() => removeInterest(interest)}
                    className="text-pink-600 hover:text-pink-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Add Interest */}
          <div className="flex gap-2 mb-3">
            <Input
              placeholder="Add an interest"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addInterest(newInterest)}
            />
            <Button
              type="button"
              onClick={() => addInterest(newInterest)}
              variant="outline"
              size="sm"
            >
              Add
            </Button>
          </div>

          {/* Common Interests */}
          <div className="flex flex-wrap gap-2">
            {commonInterests
              .filter(interest => !profile.interests.includes(interest))
              .slice(0, 6)
              .map((interest) => (
                <button
                  key={interest}
                  onClick={() => addInterest(interest)}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  + {interest}
                </button>
              ))}
          </div>
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
          {isLast ? 'Complete Profile' : 'Continue'}
        </Button>
      </div>
    </div>
  );
};

export default ProfileCompletionStep;
