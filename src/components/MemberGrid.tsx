
import React from 'react';
import { useProfiles } from '@/hooks/useProfiles';
import { Heart, MapPin, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const MemberGrid = () => {
  const { profiles, loading, error } = useProfiles();
  const navigate = useNavigate();

  console.log('MemberGrid render:', {
    profilesCount: profiles.length,
    loading,
    error
  });

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-zinc-800 rounded-lg p-4 animate-pulse">
            <div className="aspect-square bg-zinc-700 rounded-lg mb-3"></div>
            <div className="h-4 bg-zinc-700 rounded mb-2"></div>
            <div className="h-3 bg-zinc-700 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-zinc-400 mb-4">Unable to load profiles at the moment.</p>
        <p className="text-sm text-zinc-500">Please try refreshing the page.</p>
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className="text-center py-12">
        <Heart className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">No profiles yet</h3>
        <p className="text-zinc-400 mb-4">Be the first to join our community!</p>
      </div>
    );
  }

  const handleProfileClick = (profileId: string) => {
    navigate(`/profile/${profileId}`);
  };

  const getCountryFlag = (location: string): string => {
    // Simple country detection based on common city names
    if (['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'].some(city => location.includes(city))) return '🇺🇸';
    if (['London', 'Manchester', 'Birmingham', 'Glasgow', 'Liverpool'].some(city => location.includes(city))) return '🇬🇧';
    if (['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice'].some(city => location.includes(city))) return '🇫🇷';
    if (['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao'].some(city => location.includes(city))) return '🇪🇸';
    if (['Rome', 'Milan', 'Naples', 'Turin', 'Florence'].some(city => location.includes(city))) return '🇮🇹';
    if (['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Ottawa'].some(city => location.includes(city))) return '🇨🇦';
    if (['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'].some(city => location.includes(city))) return '🇦🇺';
    if (['Berlin', 'Hamburg', 'München', 'Köln', 'Frankfurt'].some(city => location.includes(city))) return '🇩🇪';
    return '🌍'; // Default globe emoji
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {profiles.slice(0, 12).map((profile) => (
        <div 
          key={profile.id} 
          className="bg-zinc-800 rounded-lg overflow-hidden hover:bg-zinc-700 transition-colors cursor-pointer group"
          onClick={() => handleProfileClick(profile.id)}
        >
          <div className="aspect-square relative">
            {profile.photos && profile.photos.length > 0 ? (
              <img 
                src={profile.photos[0].photo_url} 
                alt={profile.nickname}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/user-uploads/profile-pics/placeholder.png';
                }}
              />
            ) : (
              <div className="w-full h-full bg-zinc-700 flex items-center justify-center">
                <Heart className="w-8 h-8 text-zinc-500" />
              </div>
            )}
            {profile.is_online && (
              <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            )}
            {profile.is_verified && (
              <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                ✓ Verified
              </div>
            )}
          </div>
          
          <div className="p-3">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-white text-sm truncate">
                {profile.nickname}
              </h3>
              <span className="text-zinc-400 text-xs">
                {profile.age}
              </span>
            </div>
            
            <div className="flex items-center text-zinc-400 text-xs mb-1">
              <MapPin className="w-3 h-3 mr-1" />
              <span className="truncate">{getCountryFlag(profile.location)} {profile.location}</span>
            </div>
            
            {profile.occupation && (
              <div className="flex items-center text-zinc-400 text-xs mb-2">
                <span className="truncate">{profile.occupation}</span>
              </div>
            )}
            
            {profile.bio && (
              <p className="text-zinc-300 text-xs line-clamp-2">
                {profile.bio}
              </p>
            )}
            
            {profile.interests && profile.interests.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {profile.interests.slice(0, 2).map((interest, index) => (
                  <span 
                    key={index}
                    className="bg-zinc-700 text-zinc-300 text-xs px-2 py-1 rounded"
                  >
                    {interest}
                  </span>
                ))}
                {profile.interests.length > 2 && (
                  <span className="text-zinc-400 text-xs">
                    +{profile.interests.length - 2} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
