
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
      "flex flex-col h-screen bg-zinc-900 border-r border-zinc-800 transition-all",
      isCollapsed ? "w-[70px]" : "w-[240px]"
    )}>
      <div className="p-4">
        <div className={cn("flex items-center", isCollapsed ? "justify-center" : "justify-between")}>
          {!isCollapsed && <Logo />}
          {isCollapsed && <span className="text-white text-xl font-bold">DD</span>}
        </div>
      </div>

      <div className="px-3 py-2">
        <Link to="/new-chat">
          <Button variant="outline" className={cn(
            "w-full border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white transition-colors",
            isCollapsed ? "p-2 justify-center" : ""
          )}>
            <span className="flex items-center gap-2">
              {isCollapsed ? "+" : "+ New Match"}
            </span>
          </Button>
        </Link>
      </div>

      <div className="mt-2 space-y-1 px-3">
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
          className="w-full justify-start text-zinc-400 hover:text-white hover:bg-zinc-800"
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
