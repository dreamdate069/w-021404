
import React, { useState } from 'react';
import { DollarSign, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CoinPurchaseModal from './payments/CoinPurchaseModal';

interface DreamCoinBalanceProps {
  balance?: number;
  className?: string;
  showBuyButton?: boolean;
}

const DreamCoinBalance: React.FC<DreamCoinBalanceProps> = ({ 
  balance = 0,
  className = '',
  showBuyButton = false
}) => {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  
  const handlePurchaseComplete = (dreamcoinsAdded: number) => {
    // This will be handled by the parent component through the hook
    console.log('Purchase completed:', dreamcoinsAdded);
  };
  
  return (
    <>
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="flex items-center gap-1 text-white px-2 py-1 rounded-full bg-zinc-800">
          <DollarSign className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-sm font-medium">
            {balance.toLocaleString()}
          </span>
        </div>
        
        {showBuyButton && (
          <Button
            size="sm"
            onClick={() => setShowPurchaseModal(true)}
            className="bg-custom-pink hover:bg-custom-pink/90 text-white px-2 py-1 h-7"
          >
            <Plus className="w-3 h-3 mr-1" />
            Buy
          </Button>
        )}
      </div>

      <CoinPurchaseModal
        open={showPurchaseModal}
        onOpenChange={setShowPurchaseModal}
        onPurchaseComplete={handlePurchaseComplete}
      />
    </>
  );
};

export default DreamCoinBalance;
