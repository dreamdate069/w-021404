
import React, { useState, useEffect } from 'react';
import { useProfiles } from '@/hooks/useProfiles';
import SwipeCard from './SwipeCard';
import MatchModal from './MatchModal';
import { Profile } from '@/hooks/useProfiles';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const SwipeStack: React.FC = () => {
  const { profiles, loading } = useProfiles();
  const { user } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMatch, setShowMatch] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null);
  const [swipedProfiles, setSwipedProfiles] = useState<string[]>([]);
  const { toast } = useToast();

  const handleSwipe = async (direction: 'left' | 'right' | 'super', profile: Profile) => {
    // Add to swiped profiles
    setSwipedProfiles(prev => [...prev, profile.id]);
    
    // Move to next card
    setCurrentIndex(prev => prev + 1);

    // Handle like actions
    if (direction === 'right' || direction === 'super') {
      // Simulate match check (in real app, this would be an API call)
      const isMatch = Math.random() > 0.7; // 30% chance of match for demo
      
      if (isMatch) {
        setMatchedProfile(profile);
        setShowMatch(true);
      }

      const actionText = direction === 'super' ? "Super Like sent!" : "Like sent!";
      toast({
        title: actionText,
        description: isMatch ? "It's a match! 🎉" : `You liked ${profile.nickname}`,
      });

      // If user is not logged in, suggest signup after a few swipes
      if (!user && swipedProfiles.length >= 2) {
        setTimeout(() => {
          toast({
            title: "Sign up to save your matches!",
            description: "Don't lose your connections - create an account now.",
          });
        }, 2000);
      }
    }
  };

  const visibleProfiles = profiles.filter(p => !swipedProfiles.includes(p.id)).slice(currentIndex, currentIndex + 3);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (visibleProfiles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-6">
        <div className="text-6xl mb-4">😔</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No more profiles</h3>
        <p className="text-gray-600 mb-4">Check back later for new people in your area!</p>
        <button 
          onClick={() => {
            setCurrentIndex(0);
            setSwipedProfiles([]);
          }}
          className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition-colors"
        >
          Start Over
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0">
        {visibleProfiles.map((profile, index) => (
          <SwipeCard
            key={profile.id}
            profile={profile}
            onSwipe={handleSwipe}
            isTop={index === 0}
          />
        ))}
      </div>
      
      {showMatch && matchedProfile && (
        <MatchModal
          profile={matchedProfile}
          onClose={() => {
            setShowMatch(false);
            setMatchedProfile(null);
          }}
        />
      )}
    </div>
  );
};

export default SwipeStack;
