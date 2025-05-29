
import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MemberGrid } from '@/components/MemberGrid';
import { useToast } from '@/hooks/use-toast';

const MatchesPage = () => {
  const { toast } = useToast();
  const [hasMatches, setHasMatches] = useState(true);

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Your Perfect Matches</h1>
          <p className="text-zinc-400 mt-2">Discover compatible singles who share your interests and values</p>
        </div>
        
        <Button 
          variant="outline"
          className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
          onClick={() => toast({
            title: "Refreshing your matches",
            description: "Looking for new potential matches based on your preferences."
          })}
        >
          Refresh Matches
        </Button>
      </div>
      
      {hasMatches ? (
        <>
          <div className="mb-6 p-4 bg-gradient-to-r from-custom-pink/10 to-purple-600/10 rounded-lg border border-custom-pink/20">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">New Matches Available!</h2>
                <p className="text-zinc-300 text-sm">Based on your preferences and activity</p>
              </div>
              <div className="text-custom-pink font-bold text-xl">24</div>
            </div>
          </div>
          <MemberGrid />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="bg-zinc-800 rounded-full p-6 mb-4">
            <Heart className="h-12 w-12 text-zinc-400" />
          </div>
          <h2 className="text-2xl font-semibold text-white mb-2">No matches yet</h2>
          <p className="text-zinc-400 max-w-md mb-6">
            When someone likes you back, they'll appear here. Continue exploring to find new connections!
          </p>
          <Button 
            className="bg-custom-pink hover:bg-custom-pink/90"
            onClick={() => window.location.href = '/discover'}
          >
            Discover People
          </Button>
        </div>
      )}
      
      {/* Matching Tips */}
      <div className="mt-12 bg-zinc-800 rounded-lg p-6 border border-zinc-700">
        <h3 className="text-xl font-bold text-white mb-4">💡 Tips for Better Matches</h3>
        <div className="grid md:grid-cols-2 gap-4 text-zinc-300">
          <div>
            <h4 className="font-semibold text-white mb-2">Complete Your Profile</h4>
            <p className="text-sm">Add more photos and details about your interests to attract compatible matches.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Be Active</h4>
            <p className="text-sm">Regular activity helps our algorithm understand your preferences better.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Update Preferences</h4>
            <p className="text-sm">Adjust your age range, distance, and other preferences in settings.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Stay Engaged</h4>
            <p className="text-sm">Like profiles and send messages to increase your visibility.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchesPage;
