
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonSecondaryProps {
  children: React.ReactNode;
  icon?: boolean;
  onClick?: () => void;
  className?: string;
}

const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({ 
  children, 
  icon = true, // Changed default to true to ensure icons show
  onClick,
  className = ""
}) => {
  return (
    <button 
      onClick={onClick}
      className={`group relative border border-slate-900/50 hover:border-custom-purple/70 bg-adam-gray/50
        text-white font-medium rounded-full px-6 py-3
        transition-all duration-300 hover:bg-slate-900 hover:text-white hover:shadow-lg flex items-center gap-2 ${className}`}
    >
      {children}
      {icon && (
        <ArrowRight 
          size={16} 
          className="transition-transform duration-300 group-hover:translate-x-1" 
        />
      )}
    </button>
  );
};

export default ButtonSecondary;
