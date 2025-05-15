
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonPrimaryProps {
  children: React.ReactNode;
  icon?: boolean;
  onClick?: () => void;
  className?: string;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({ 
  children, 
  icon = false, 
  onClick,
  className = ""
}) => {
  return (
    <button 
      onClick={onClick}
      className={`action-button-glow relative bg-custom-pink text-white font-medium rounded-full px-6 py-3
        transition-all duration-300 hover:bg-slate-900 hover:text-white flex items-center gap-2 ${className}`}
    >
      {children}
      {icon && <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />}
    </button>
  );
};

export default ButtonPrimary;
