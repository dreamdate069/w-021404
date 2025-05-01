
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { MessageSquare, Heart, Users, Settings, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Logo from './Logo';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  active?: boolean;
}

const NavItem = ({ icon: Icon, label, to, active }: NavItemProps) => {
  return (
    <Link to={to} className="w-full">
      <Button 
        variant="ghost" 
        className={cn(
          "w-full justify-start gap-3 text-left font-normal",
          active ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white hover:bg-zinc-800"
        )}
      >
        <Icon size={18} />
        <span>{label}</span>
      </Button>
    </Link>
  );
};

const SidebarNav = () => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { icon: MessageSquare, label: "Messages", to: "/messages" },
    { icon: Heart, label: "Matches", to: "/matches" },
    { icon: Users, label: "Discover", to: "/discover" },
    { icon: Settings, label: "Settings", to: "/settings" },
  ];

  return (
    <div className={cn(
      "sticky top-0 h-screen flex flex-col bg-zinc-900 border-r border-zinc-800 transition-all",
      isCollapsed ? "w-[70px]" : "w-[240px]"
    )}>
      <div className="p-4">
        {!isCollapsed ? (
          <Logo />
        ) : (
          <div className="flex justify-center">
            <span className="text-custom-pink text-xl font-bold">DD</span>
          </div>
        )}
      </div>

      <div className="px-3 py-2">
        <Link to="/login">
          <Button variant="outline" className={cn(
            "w-full border-custom-pink text-white bg-custom-pink hover:bg-opacity-90 hover:border-custom-pink transition-colors",
            isCollapsed ? "p-2 justify-center" : ""
          )}>
            <span className="flex items-center gap-2">
              {isCollapsed ? "→" : "Login"}
            </span>
          </Button>
        </Link>
      </div>

      <div className="mt-2 space-y-1 px-3 overflow-y-auto">
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={isCollapsed ? "" : item.label}
            to={item.to}
            active={location.pathname === item.to}
          />
        ))}
      </div>

      <div className="mt-auto p-3 border-t border-zinc-800">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-white hover:text-white hover:bg-zinc-800"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <Menu size={18} />
          {!isCollapsed && <span className="ml-3">Toggle Sidebar</span>}
        </Button>
      </div>
    </div>
  );
};

export default SidebarNav;
