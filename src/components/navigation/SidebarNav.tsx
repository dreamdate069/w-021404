
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { LogIn, LogOut, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Logo from '@/components/Logo';
import NavItem from './NavItem';
import ExternalLinks from './ExternalLinks';
import { useNavigation } from './useNavigation';

const SidebarNav = () => {
  // Changed the default state to true so the sidebar starts collapsed
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const location = useLocation();
  
  const { isLoggedIn, toggleLoginState, navItems, externalLinks } = useNavigation();

  // Handle mouse enter/leave for hover effect
  const handleMouseEnter = () => {
    if (isCollapsed) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    if (isCollapsed) {
      setIsHovering(false);
    }
  };

  const effectiveCollapsed = isCollapsed && !isHovering;

  return (
    <div 
      className={cn(
        "sticky top-0 h-screen flex flex-col bg-zinc-900 border-r border-zinc-800 transition-all duration-300",
        effectiveCollapsed ? "w-[70px]" : "w-[240px]"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="p-4 flex justify-center">
        <div className={cn("transition-transform duration-300", effectiveCollapsed ? "rotate-[270deg]" : "")}>
          {!effectiveCollapsed ? <Logo /> : <div className="flex justify-center">
            <span className="text-custom-pink text-xl font-bold">DD</span>
          </div>}
        </div>
      </div>

      <div className="px-3 py-2">
        {isLoggedIn ? (
          <Button 
            variant="outline" 
            className={cn(
              "w-full border-custom-pink text-white bg-transparent hover:bg-red-600 hover:border-red-600 transition-colors",
              effectiveCollapsed ? "p-2 justify-center" : ""
            )} 
            onClick={toggleLoginState}
          >
            <span className="flex items-center gap-2">
              <LogOut size={18} />
              {!effectiveCollapsed && "Logout"}
            </span>
          </Button>
        ) : (
          <Button 
            variant="outline" 
            className={cn(
              "w-full border-custom-pink text-white bg-custom-pink hover:bg-opacity-90 hover:border-custom-pink transition-colors",
              effectiveCollapsed ? "p-2 justify-center" : ""
            )} 
            onClick={toggleLoginState}
          >
            <span className="flex items-center gap-2">
              <LogIn size={18} />
              {!effectiveCollapsed && "Login"}
            </span>
          </Button>
        )}
      </div>

      <div className="mt-2 space-y-1 px-3 overflow-y-auto">
        {navItems.map(item => (
          <NavItem 
            key={item.label} 
            icon={item.icon} 
            label={effectiveCollapsed ? "" : item.label} 
            to={item.to} 
            active={location.pathname === item.to} 
          />
        ))}

        {!effectiveCollapsed && <ExternalLinks links={externalLinks} isCollapsed={effectiveCollapsed} />}
      </div>

      <div className="mt-auto p-3 border-t border-zinc-800">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-white hover:text-white hover:bg-zinc-800" 
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <Menu size={18} />
          {!effectiveCollapsed && <span className="ml-3">Collapse Menu</span>}
        </Button>
      </div>
    </div>
  );
};

export default SidebarNav;
