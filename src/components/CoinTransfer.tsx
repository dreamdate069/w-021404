
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DollarSign, Info } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { getUserBalance } from '@/utils/dreamCoinUtils';
import { TRANSFER_FEE_PERCENTAGE } from '@/utils/DreamCoinBank';

interface CoinTransferProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTransfer: (amount: number) => void;
  balance: number;
  recipientName: string;
}

const CoinTransfer: React.FC<CoinTransferProps> = ({
  open,
  onOpenChange,
  onTransfer,
  balance,
  recipientName
}) => {
  const [amount, setAmount] = useState<number>(100);
  
  // Calculate fee
  const fee = Math.round(amount * (TRANSFER_FEE_PERCENTAGE / 100));
  const recipientAmount = amount - fee;
  
  // Quick amount options
  const quickAmounts = [100, 500, 1000, 5000, 10000];
  
  const handleAmountChange = (value: number[] | number) => {
    if (Array.isArray(value)) {
      setAmount(value[0]);
    } else {
      setAmount(value);
    }
  };
  
  const handleTransfer = () => {
    onTransfer(amount);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Send DreamCoins</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Send DreamCoins to {recipientName}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-zinc-400">
            <DollarSign className="w-4 h-4 text-amber-400" />
            <span>
              Your balance: <span className="font-medium text-white">{balance.toLocaleString()}</span>
            </span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-amber-400" />
              <Input
                id="amount"
                type="number"
                min={1}
                max={balance}
                value={amount}
                onChange={(e) => handleAmountChange(Number(e.target.value))}
                className="pl-10 bg-zinc-800 border-zinc-700"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Quick Select</Label>
            <div className="flex flex-wrap gap-2">
              {quickAmounts.map(amt => (
                <Button
                  key={amt}
                  variant="outline"
                  size="sm"
                  onClick={() => handleAmountChange(Math.min(amt, balance))}
                  disabled={amt > balance}
                  className={amt === amount ? 'bg-rose-500 border-rose-500 text-white' : 'bg-zinc-800 border-zinc-700'}
                >
                  {amt.toLocaleString()}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Adjust amount</Label>
            <Slider
              min={1}
              max={Math.min(10000, balance)}
              step={1}
              value={[amount]}
              onValueChange={handleAmountChange}
              className="py-4"
            />
          </div>
          
          <div className="bg-zinc-800 p-3 rounded-md space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Amount to send:</span>
              <span>{amount.toLocaleString()} DC</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Service fee ({TRANSFER_FEE_PERCENTAGE}%):</span>
              <span>-{fee.toLocaleString()} DC</span>
            </div>
            <div className="flex justify-between font-medium pt-1 border-t border-zinc-700">
              <span>{recipientName} receives:</span>
              <span className="text-emerald-400">{recipientAmount.toLocaleString()} DC</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-2 bg-zinc-800 rounded-md text-zinc-400 text-xs">
            <Info className="h-4 w-4 text-zinc-500 flex-shrink-0" />
            <p>All DreamCoin transfers have a {TRANSFER_FEE_PERCENTAGE}% service fee.</p>
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleTransfer}
            disabled={amount <= 0 || amount > balance}
            className="bg-rose-500 hover:bg-rose-600"
          >
            Send {amount.toLocaleString()} DreamCoins
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CoinTransfer;
