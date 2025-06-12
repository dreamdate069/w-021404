
import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Profile } from '@/hooks/useProfiles';
import { Heart, X, Star, MapPin } from 'lucide-react';

interface SwipeCardProps {
  profile: Profile;
  onSwipe: (direction: 'left' | 'right' | 'super', profile: Profile) => void;
  isTop: boolean;
}

const SwipeCard: React.FC<SwipeCardProps> = ({ profile, onSwipe, isTop }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-30, 0, 30]);
  const opacity = useTransform(x, [-300, -150, 0, 150, 300], [0, 1, 1, 1, 0]);

  const photos = profile.photos && profile.photos.length > 0 
    ? profile.photos 
    : [{ photo_url: '/user-uploads/profile-pics/placeholder.png', id: 'placeholder' }];

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      onSwipe('right', profile);
    } else if (info.offset.x < -threshold) {
      onSwipe('left', profile);
    }
  };

  const handleButtonSwipe = (direction: 'left' | 'right' | 'super') => {
    onSwipe(direction, profile);
  };

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`absolute inset-0 bg-white rounded-2xl shadow-xl overflow-hidden cursor-grab active:cursor-grabbing ${
        isTop ? 'z-10' : 'z-0'
      }`}
      style={{ x, rotate, opacity }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.05 }}
      initial={{ scale: isTop ? 1 : 0.95 }}
      animate={{ scale: isTop ? 1 : 0.95 }}
    >
      {/* Photo Section */}
      <div className="relative h-3/4 bg-gray-200">
        <img
          src={photos[currentPhotoIndex]?.photo_url}
          alt={profile.nickname}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/user-uploads/profile-pics/placeholder.png';
          }}
        />
        
        {/* Photo Navigation */}
        {photos.length > 1 && (
          <>
            <button
              onClick={prevPhoto}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/20 rounded-full flex items-center justify-center text-white"
            >
              ‹
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/20 rounded-full flex items-center justify-center text-white"
            >
              ›
            </button>
            
            {/* Photo Indicators */}
            <div className="absolute top-4 left-0 right-0 flex justify-center gap-1">
              {photos.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentPhotoIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Swipe Indicators */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: useTransform(x, [0, 150], [0, 1]) }}
        >
          <div className="bg-green-500 text-white px-4 py-2 rounded-full font-bold text-xl transform rotate-12">
            LIKE
          </div>
        </motion.div>
        
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: useTransform(x, [-150, 0], [1, 0]) }}
        >
          <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-xl transform -rotate-12">
            NOPE
          </div>
        </motion.div>
      </div>

      {/* Profile Info */}
      <div className="h-1/4 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-900">
              {profile.nickname}, {profile.age}
            </h3>
            {profile.is_verified && (
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </div>
          
          {profile.location && (
            <div className="flex items-center text-gray-600 text-sm mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              {profile.location}
            </div>
          )}
          
          {profile.bio && (
            <p className="text-gray-700 text-sm line-clamp-2">{profile.bio}</p>
          )}
        </div>

        {/* Action Buttons */}
        {isTop && (
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => handleButtonSwipe('left')}
              className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
            
            <button
              onClick={() => handleButtonSwipe('super')}
              className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors"
            >
              <Star className="w-6 h-6 text-blue-600" />
            </button>
            
            <button
              onClick={() => handleButtonSwipe('right')}
              className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center hover:bg-pink-200 transition-colors"
            >
              <Heart className="w-6 h-6 text-pink-600" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SwipeCard;
