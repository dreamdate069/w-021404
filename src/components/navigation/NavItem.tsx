
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NavItemProps } from './types';

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

export default NavItem;
