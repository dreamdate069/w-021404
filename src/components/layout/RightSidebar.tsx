
import React from 'react';
import { Heart, Gift, Users, Star, MessageSquare, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import DreamCoinBalance from '@/components/DreamCoinBalance';
import { useNavigate } from 'react-router-dom';

const RightSidebar: React.FC = () => {
  const navigate = useNavigate();

  const quickActions = [
    { icon: Heart, label: 'Matches', count: 12, action: () => navigate('/matches') },
    { icon: MessageSquare, label: 'Messages', count: 5, action: () => navigate('/messages') },
    { icon: Gift, label: 'Gifts', count: 3, action: () => navigate('/gifts') },
    { icon: Users, label: 'Visitors', count: 28, action: () => navigate('/visitors') },
  ];

  const onlineUsers = [
    { id: '1', name: 'Sarah M.', image: '/user-uploads/profile-pics/1.png', status: 'online' },
    { id: '2', name: 'Emma K.', image: '/user-uploads/profile-pics/(3).png', status: 'online' },
    { id: '3', name: 'Lisa R.', image: '/user-uploads/profile-pics/(4).png', status: 'online' },
    { id: '4', name: 'Anna S.', image: '/user-uploads/profile-pics/design (1).png', status: 'online' },
  ];

  return (
    <div className="w-80 bg-zinc-900 border-l border-zinc-800 flex flex-col sticky top-0 h-screen overflow-y-auto">
      {/* DreamCoin Balance */}
      <div className="p-4 border-b border-zinc-800">
        <DreamCoinBalance />
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-b border-zinc-800">
        <h3 className="text-white font-semibold mb-3 flex items-center">
          <Zap size={16} className="mr-2 text-custom-pink" />
          Quick Actions
        </h3>
        <div className="space-y-2">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-between text-left hover:bg-zinc-800"
              onClick={action.action}
            >
              <div className="flex items-center">
                <action.icon size={16} className="mr-2 text-custom-pink" />
                <span className="text-white">{action.label}</span>
              </div>
              <Badge variant="outline" className="bg-custom-pink border-custom-pink text-white">
                {action.count}
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      {/* Online Users */}
      <div className="p-4 border-b border-zinc-800">
        <h3 className="text-white font-semibold mb-3 flex items-center">
          <Users size={16} className="mr-2 text-green-500" />
          Online Now
        </h3>
        <div className="space-y-3">
          {onlineUsers.map((user) => (
            <div 
              key={user.id} 
              className="flex items-center space-x-3 cursor-pointer hover:bg-zinc-800 p-2 rounded-md transition-colors"
              onClick={() => navigate(`/profile/${user.id}`)}
            >
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900"></span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{user.name}</p>
                <p className="text-zinc-400 text-xs">Online now</p>
              </div>
              <Button size="sm" variant="ghost" className="text-custom-pink hover:bg-zinc-800">
                <Heart size={14} />
              </Button>
            </div>
          ))}
        </div>
        <Button 
          variant="outline" 
          className="w-full mt-3 border-zinc-700 text-white hover:bg-zinc-800"
          onClick={() => navigate('/browse')}
        >
          View All
        </Button>
      </div>

      {/* Featured Profiles */}
      <div className="p-4 flex-1">
        <h3 className="text-white font-semibold mb-3 flex items-center">
          <Star size={16} className="mr-2 text-yellow-500" />
          Featured
        </h3>
        <div className="space-y-3">
          {onlineUsers.slice(0, 2).map((user) => (
            <div 
              key={`featured-${user.id}`}
              className="bg-zinc-800 rounded-lg p-3 cursor-pointer hover:bg-zinc-700 transition-colors"
              onClick={() => navigate(`/profile/${user.id}`)}
            >
              <Avatar className="h-16 w-16 mx-auto mb-2">
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <p className="text-white text-sm text-center font-medium">{user.name}</p>
              <p className="text-zinc-400 text-xs text-center">Featured Member</p>
              <Button 
                size="sm" 
                className="w-full mt-2 bg-custom-pink hover:bg-custom-pink/90"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/messages');
                }}
              >
                <MessageSquare size={14} className="mr-1" />
                Message
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
