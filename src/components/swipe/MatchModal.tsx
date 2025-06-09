
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, X } from 'lucide-react';
import { Profile } from '@/hooks/useProfiles';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface MatchModalProps {
  profile: Profile;
  onClose: () => void;
}

const MatchModal: React.FC<MatchModalProps> = ({ profile, onClose }) => {
  const navigate = useNavigate();

  const handleSendMessage = () => {
    navigate('/messages');
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600 z-50 flex items-center justify-center p-4"
    >
      {/* Background Hearts Animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/20 text-4xl"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 50,
              rotate: 0
            }}
            animate={{ 
              y: -50,
              rotate: 360
            }}
            transition={{ 
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full text-center relative z-10"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          className="text-6xl mb-4"
        >
          🎉
        </motion.div>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-3xl font-bold text-gray-900 mb-2"
        >
          It's a Match!
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-600 mb-6"
        >
          You and {profile.nickname} liked each other
        </motion.p>

        {/* Profile Photos */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex justify-center items-center gap-4 mb-8"
        >
          <div className="relative">
            <img
              src="/user-uploads/profile-pics/placeholder.png"
              alt="You"
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
              <Heart className="w-3 h-3 text-white" />
            </div>
          </div>
          
          <div className="text-4xl">💕</div>
          
          <div className="relative">
            <img
              src={profile.photos?.[0]?.photo_url || '/user-uploads/profile-pics/placeholder.png'}
              alt={profile.nickname}
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/user-uploads/profile-pics/placeholder.png';
              }}
            />
            <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
              <Heart className="w-3 h-3 text-white" />
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex gap-4"
        >
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1"
          >
            Keep Swiping
          </Button>
          
          <Button
            onClick={handleSendMessage}
            className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Say Hi
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MatchModal;
