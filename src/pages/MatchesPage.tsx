
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
        <h1 className="text-3xl font-bold text-white">Your Matches</h1>
        
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
        <MemberGrid />
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
    </div>
  );
};

export default MatchesPage;
