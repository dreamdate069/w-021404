
import React from 'react';
import { cn } from '@/lib/utils';
import { DREAMCOIN_IMAGE_URL } from '@/utils/dreamCoinUtils';

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
      <img 
        src={DREAMCOIN_IMAGE_URL} 
        alt="DreamCoin" 
        className="w-4 h-4 object-contain"
      />
      <span className="text-white text-sm font-medium">{formattedBalance}</span>
    </div>
  );
};

export default DreamCoinBalance;
