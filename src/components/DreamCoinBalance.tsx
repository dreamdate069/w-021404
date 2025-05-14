
import React from 'react';
import { DollarSign } from 'lucide-react';
import { getUserBalance } from '@/utils/dreamCoinUtils';

interface DreamCoinBalanceProps {
  balance?: number;
  className?: string;
}

const DreamCoinBalance: React.FC<DreamCoinBalanceProps> = ({ 
  balance: propBalance,
  className = '' 
}) => {
  // If balance is provided via props, use that, otherwise get from DreamCoin system
  const balance = propBalance !== undefined 
    ? propBalance 
    : getUserBalance('current-user');
  
  return (
    <div className={`flex items-center gap-1 text-white px-2 py-1 rounded-full bg-zinc-800 ${className}`}>
      <DollarSign className="w-3.5 h-3.5 text-amber-400" />
      <span className="text-sm font-medium">
        {balance.toLocaleString()}
      </span>
    </div>
  );
};

export default DreamCoinBalance;
