
import { useState } from 'react';
import { MessageSquare, Heart, Users, Settings, UserPlus, Info, Newspaper, FileText, Globe, MapPin } from 'lucide-react';
import { NavItemProps, ExternalLinkItem } from './types';

export const useNavigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Default to logged in for demo

  // Toggle login state for demonstration purposes
  const toggleLoginState = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  // Navigation items for logged in users
  const loggedInNavItems: NavItemProps[] = [{
    icon: MessageSquare,
    label: "Messages",
    to: "/messages"
  }, {
    icon: Heart,
    label: "Matches",
    to: "/matches"
  }, {
    icon: Users,
    label: "Explore",
    to: "/explore"
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
  const loggedOutNavItems: NavItemProps[] = [{
    icon: UserPlus,
    label: "Register",
    to: "/register"
  }, {
    icon: Users,
    label: "Explore Members",
    to: "/explore"
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
  const externalLinks: ExternalLinkItem[] = [{
    icon: Globe,
    label: "Partner Site 1",
    url: "https://example1.com"
  }, {
    icon: Globe,
    label: "Partner Site 2",
    url: "https://example2.com"
  }];

  return {
    isLoggedIn,
    toggleLoginState,
    navItems: isLoggedIn ? loggedInNavItems : loggedOutNavItems,
    externalLinks
  };
};
