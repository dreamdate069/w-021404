
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Heart, MessageCircle, Users, User, Settings, Compass, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ConditionalHeader from '@/components/ConditionalHeader';
import ErrorBoundary from '@/components/ErrorBoundary';

const SidebarNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { icon: Zap, label: 'Swipe', path: '/swipe', color: 'text-pink-500' },
    { icon: Compass, label: 'Discover', path: '/discover', color: 'text-blue-500' },
    { icon: Heart, label: 'Matches', path: '/matches', color: 'text-red-500' },
    { icon: MessageCircle, label: 'Messages', path: '/messages', color: 'text-green-500' },
    { icon: Users, label: 'Community', path: '/community', color: 'text-purple-500' },
    { icon: User, label: 'Profile', path: '/profile/current', color: 'text-yellow-500' },
  ];

  const isActive = (path: string) => {
    if (path === '/profile/current') {
      return location.pathname.startsWith('/profile/');
    }
    return location.pathname === path;
  };

  return (
    <div className="w-64 bg-zinc-800 min-h-screen flex flex-col border-r border-zinc-700">
      {/* Logo Section */}
      <div className="p-6 border-b border-zinc-700">
        <div className="flex items-center justify-center mb-4">
          <img 
            src="/lovable-uploads/cdd2e339-d00c-4458-b5cc-7a69afcfa1de.png" 
            alt="DreamDate.Online Logo" 
            className="h-12 object-contain" 
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
        
        {/* Conditional Header */}
        <ErrorBoundary>
          <ConditionalHeader showBuyButton={true} className="justify-center" />
        </ErrorBoundary>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Button
                key={item.path}
                variant={active ? "secondary" : "ghost"}
                className={`w-full justify-start text-left ${
                  active 
                    ? 'bg-zinc-700 text-white' 
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-700'
                }`}
                onClick={() => navigate(item.path)}
              >
                <Icon className={`mr-3 h-4 w-4 ${active ? item.color : ''}`} />
                {item.label}
              </Button>
            );
          })}
        </div>
      </nav>

      {/* Settings */}
      <div className="p-4 border-t border-zinc-700">
        <Button
          variant="ghost"
          className="w-full justify-start text-zinc-400 hover:text-white hover:bg-zinc-700"
          onClick={() => navigate('/settings')}
        >
          <Settings className="mr-3 h-4 w-4" />
          Settings
        </Button>
      </div>
    </div>
  );
};

export default SidebarNav;
