
import React, { useState, useRef } from 'react';
import { Heart, X, Star, MapPin, Briefcase } from 'lucide-react';
import { Profile } from '@/hooks/useProfiles';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';

interface SwipeCardProps {
  profile: Profile;
  onSwipe: (direction: 'left' | 'right' | 'super', profile: Profile) => void;
  isTop?: boolean;
}

const SwipeCard: React.FC<SwipeCardProps> = ({ profile, onSwipe, isTop = false }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [exitX, setExitX] = useState(0);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 100;
    
    if (info.offset.x > threshold) {
      setExitX(200);
      onSwipe('right', profile);
    } else if (info.offset.x < -threshold) {
      setExitX(-200);
      onSwipe('left', profile);
    }
  };

  const handleAction = (action: 'left' | 'right' | 'super') => {
    setExitX(action === 'left' ? -200 : 200);
    onSwipe(action, profile);
  };

  const nextPhoto = () => {
    if (profile.photos && currentPhotoIndex < profile.photos.length - 1) {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
    }
  };

  const prevPhoto = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(currentPhotoIndex - 1);
    }
  };

  const currentPhoto = profile.photos?.[currentPhotoIndex]?.photo_url || '/user-uploads/profile-pics/placeholder.png';

  return (
    <motion.div
      className={`absolute inset-0 ${isTop ? 'z-20' : 'z-10'}`}
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={exitX !== 0 ? { x: exitX } : {}}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden"
        style={{ opacity }}
      >
        {/* Photo Container */}
        <div className="relative h-3/4 overflow-hidden">
          <img
            src={currentPhoto}
            alt={profile.nickname}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/user-uploads/profile-pics/placeholder.png';
            }}
          />
          
          {/* Photo Navigation */}
          {profile.photos && profile.photos.length > 1 && (
            <>
              <button
                onClick={prevPhoto}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center text-white"
                disabled={currentPhotoIndex === 0}
              >
                ←
              </button>
              <button
                onClick={nextPhoto}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center text-white"
                disabled={currentPhotoIndex === profile.photos.length - 1}
              >
                →
              </button>
              
              {/* Photo Indicators */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-1">
                {profile.photos.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentPhotoIndex ? 'bg-white' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Online Status */}
          {profile.is_online && (
            <div className="absolute top-4 right-4 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          )}

          {/* Verification Badge */}
          {profile.is_verified && (
            <div className="absolute top-4 left-4 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
              ✓ Verified
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="p-4 h-1/4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-gray-900">
                {profile.nickname}, {profile.age}
              </h3>
            </div>
            
            <div className="space-y-1">
              {profile.location && (
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>{profile.location}</span>
                </div>
              )}
              
              {profile.occupation && (
                <div className="flex items-center text-gray-600 text-sm">
                  <Briefcase className="w-3 h-3 mr-1" />
                  <span>{profile.occupation}</span>
                </div>
              )}
            </div>

            {profile.bio && (
              <p className="text-gray-700 text-sm mt-2 line-clamp-2">{profile.bio}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              onClick={() => handleAction('left')}
              className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
            
            <button
              onClick={() => handleAction('super')}
              className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors"
            >
              <Star className="w-6 h-6 text-blue-600" />
            </button>
            
            <button
              onClick={() => handleAction('right')}
              className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center hover:bg-pink-200 transition-colors"
            >
              <Heart className="w-6 h-6 text-pink-600" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SwipeCard;
