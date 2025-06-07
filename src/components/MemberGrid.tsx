
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProfiles, Profile } from '@/hooks/useProfiles';
import { Skeleton } from '@/components/ui/skeleton';
import ErrorBoundary from '@/components/ErrorBoundary';

const MemberGridContent = () => {
  const { profiles, loading, error, generateProfiles } = useProfiles();
  
  console.log('MemberGrid render:', { profilesCount: profiles.length, loading, error });
  
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700">
            <Skeleton className="aspect-[3/4] w-full bg-zinc-700" />
            <div className="p-3">
              <Skeleton className="h-4 w-full mb-2 bg-zinc-700" />
              <Skeleton className="h-3 w-2/3 bg-zinc-700" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-bold text-white mb-4">Unable to Load Profiles</h3>
        <p className="text-zinc-400 mb-6">There was an issue loading member profiles.</p>
        <Button 
          onClick={generateProfiles}
          className="bg-pink-500 hover:bg-pink-600 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Generate Sample Profiles
        </Button>
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-bold text-white mb-4">No profiles available</h3>
        <p className="text-zinc-400 mb-6">Be the first to join our community!</p>
        <Button 
          onClick={generateProfiles}
          className="bg-pink-500 hover:bg-pink-600 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Generate Sample Profiles
        </Button>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {profiles.map((member: Profile) => {
        const primaryPhoto = member.photos?.find(photo => photo.is_primary) || member.photos?.[0];
        const imageUrl = primaryPhoto?.photo_url || '/user-uploads/profile-pics/placeholder.png';
        
        return (
          <div key={member.id} className="bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700 relative group hover-lift">
            <div className="aspect-[3/4] relative overflow-hidden">
              <img 
                src={imageUrl} 
                alt={`${member.nickname}'s profile`} 
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/user-uploads/profile-pics/placeholder.png';
                }}
              />
              
              {/* Animated background overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-transparent to-purple-600/20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-2 group-hover:-translate-y-1"></div>
              
              {/* Moving particles background effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-600 rounded-full animate-pulse"></div>
                <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce"></div>
              </div>
              
              {/* Online indicator */}
              {member.is_online && (
                <span className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full ring-2 ring-zinc-800 animate-pulse"></span>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-3 transform transition-transform duration-300 group-hover:translate-y-0">
                <h3 className="text-white font-medium text-lg transform transition-transform duration-500 group-hover:scale-105">
                  {member.nickname}, {member.age}
                </h3>
                <p className="text-zinc-300 text-sm transform transition-all duration-500 group-hover:text-white">
                  {member.location || 'Germany'}
                </p>
              </div>
              
              {/* Like/Match Button */}
              <Button 
                size="icon" 
                className="absolute top-2 left-2 bg-zinc-800/70 hover:bg-rose-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 hover:scale-110"
              >
                <Heart size={16} />
              </Button>
            </div>
            
            <div className="p-3 bg-zinc-800 transform transition-all duration-300 group-hover:bg-zinc-700">
              <Link 
                to={`/profile/${member.id}`} 
                className="block w-full text-center text-white bg-zinc-700 py-2 rounded hover:bg-rose-500 transition-all duration-300 transform group-hover:scale-105 hover:shadow-lg hover:shadow-rose-500/25"
              >
                View Profile
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const MemberGrid = () => {
  return (
    <ErrorBoundary fallback={
      <div className="text-center py-12">
        <h3 className="text-xl font-bold text-white mb-4">Unable to load member profiles</h3>
        <p className="text-zinc-400">Please refresh the page to try again.</p>
      </div>
    }>
      <MemberGridContent />
    </ErrorBoundary>
  );
};
