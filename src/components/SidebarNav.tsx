import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { MessageSquare, Heart, Users, Settings, Menu, LogIn, LogOut, UserPlus, Info, Newspaper, FileText, Globe, MapPin, UserCheck } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Logo from './Logo';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  active?: boolean;
}

const NavItem = ({
  icon: Icon,
  label,
  to,
  active
}: NavItemProps) => {
  return (
    <Link to={to} className="w-full">
      <Button variant="ghost" className={cn("w-full justify-start gap-3 text-left font-normal", active ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white hover:bg-zinc-800")}>
        <Icon size={18} />
        <span>{label}</span>
      </Button>
    </Link>
  );
};

const SidebarNav = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Default to logged in for demo

  // Toggle login state for demonstration purposes
  const toggleLoginState = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  // Navigation items for logged in users
  const loggedInNavItems = [{
    icon: MessageSquare,
    label: "Messages",
    to: "/messages"
  }, {
    icon: Heart,
    label: "Matches",
    to: "/matches"
  }, {
    icon: MapPin,
    label: "Discover",
    to: "/discover"
  }, {
    icon: Users,
    label: "Browse",
    to: "/browse"
  }, {
    icon: Newspaper,
    label: "Community",
    to: "/community"
  }, {
    icon: Settings,
    label: "Settings",
    to: "/settings"
  }];

  // Navigation items for logged out users
  const loggedOutNavItems = [{
    icon: UserPlus,
    label: "Register",
    to: "/register"
  }, {
    icon: Users,
    label: "Browse Members",
    to: "/browse"
  }, {
    icon: Newspaper,
    label: "Community Blog",
    to: "/community"
  }, {
    icon: Info,
    label: "About",
    to: "/about"
  }, {
    icon: FileText,
    label: "Terms & Conditions",
    to: "/terms"
  }];

  // External links
  const externalLinks = [{
    icon: Globe,
    label: "Partner Site 1",
    url: "https://example1.com"
  }, {
    icon: Globe,
    label: "Partner Site 2",
    url: "https://example2.com"
  }];

  // Current navigation items based on login state
  const navItems = isLoggedIn ? loggedInNavItems : loggedOutNavItems;

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
        <div className={cn("transition-transform duration-300", effectiveCollapsed ? "rotate-90" : "")}>
          <Logo />
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

        {!effectiveCollapsed && (
          <>
            {/* External Links Section */}
            {externalLinks.length > 0 && (
              <div className="pt-4 mt-4 border-t border-zinc-800">
                <div className="px-3 mb-2 text-xs font-semibold text-zinc-500">
                  External Links
                </div>
                {externalLinks.map(link => (
                  <a 
                    key={link.label} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-3 px-3 py-2 text-zinc-400 hover:text-white rounded-md hover:bg-zinc-800 transition-colors"
                  >
                    <link.icon size={18} />
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            )}
          </>
        )}
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
