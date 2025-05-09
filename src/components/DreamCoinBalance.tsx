
import React from 'react';
import { Coins } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DreamCoinBalanceProps {
  balance: number;
  className?: string;
}

const DreamCoinBalance: React.FC<DreamCoinBalanceProps> = ({ 
  balance,
  className
}) => {
  // Format the balance with commas
  const formattedBalance = balance.toLocaleString();
  
  return (
    <div className={cn("flex items-center gap-1 bg-zinc-800 px-2 py-1 rounded-full", className)}>
      <Coins className="text-custom-pink" size={16} />
      <span className="text-white text-sm font-medium">{formattedBalance}</span>
    </div>
  );
};

export default DreamCoinBalance;
