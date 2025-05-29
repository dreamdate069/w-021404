
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProfiles, Profile } from '@/hooks/useProfiles';
import { Skeleton } from '@/components/ui/skeleton';

export const MemberGrid = () => {
  const { profiles, loading, generateProfiles } = useProfiles();
  
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700">
            <Skeleton className="aspect-[3/4] w-full" />
            <div className="p-3">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-bold text-white mb-4">No profiles yet</h3>
        <p className="text-zinc-400 mb-6">Generate authentic German profiles to get started.</p>
        <Button onClick={generateProfiles} className="bg-custom-pink hover:bg-custom-pink/90">
          Generate 50 Profiles
        </Button>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {profiles.map((member: Profile) => {
        const primaryPhoto = member.photos.find(photo => photo.is_primary) || member.photos[0];
        const imageUrl = primaryPhoto?.photo_url || '/user-uploads/profile-pics/placeholder.png';
        
        return (
          <div key={member.id} className="bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700 relative group hover-lift">
            <div className="aspect-[3/4] relative overflow-hidden">
              <img 
                src={imageUrl} 
                alt={`${member.nickname}'s profile`} 
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
              />
              
              {/* Animated background overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-custom-pink/20 via-transparent to-custom-purple/20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-2 group-hover:-translate-y-1"></div>
              
              {/* Moving particles background effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-custom-pink rounded-full animate-float"></div>
                <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-custom-purple rounded-full animate-pulse"></div>
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
                  {member.location}
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
