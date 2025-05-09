
import React, { useState } from 'react';
import { Coins } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { TRANSFER_FEE_PERCENTAGE } from '@/utils/DreamCoinBank';

interface CoinTransferProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTransfer: (amount: number, message: string) => void;
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
  const [amount, setAmount] = useState<number>(1000);
  const [message, setMessage] = useState<string>('');
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      setAmount(value);
    } else {
      setAmount(0);
    }
  };
  
  const serviceFee = Math.floor(amount * (TRANSFER_FEE_PERCENTAGE / 100));
  const recipientReceives = amount - serviceFee;
  const isValidAmount = amount > 0 && amount <= balance;
  
  const handleTransfer = () => {
    if (isValidAmount) {
      onTransfer(amount, message);
      onOpenChange(false);
      setAmount(1000);
      setMessage('');
    }
  };
  
  // Predefined amounts
  const predefinedAmounts = [1000, 5000, 10000, 25000, 50000];
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Coins size={18} className="text-custom-pink" />
            Send DreamCoins
          </DialogTitle>
          <DialogDescription>
            Send DreamCoins to {recipientName}. A {TRANSFER_FEE_PERCENTAGE}% service fee applies.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm text-white">Amount to send</label>
            <Input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              className="bg-zinc-800 border-zinc-700 text-white"
            />
            
            <div className="flex flex-wrap gap-2 mt-2">
              {predefinedAmounts.map((presetAmount) => (
                <Button
                  key={presetAmount}
                  type="button"
                  variant="outline"
                  className="text-xs"
                  onClick={() => setAmount(presetAmount)}
                >
                  {presetAmount.toLocaleString()}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-white">Message (optional)</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a message with your transfer..."
              className="bg-zinc-800 border-zinc-700 text-white resize-none h-20"
            />
          </div>
          
          <div className="bg-zinc-800 rounded-md p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">Your balance</span>
              <span className="text-white">{balance.toLocaleString()} DC</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">Amount to send</span>
              <span className="text-white">{amount.toLocaleString()} DC</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">Service fee ({TRANSFER_FEE_PERCENTAGE}%)</span>
              <span className="text-red-400">-{serviceFee.toLocaleString()} DC</span>
            </div>
            <hr className="border-zinc-700" />
            <div className="flex justify-between font-bold">
              <span className="text-zinc-200">{recipientName} receives</span>
              <span className="text-custom-pink">{recipientReceives.toLocaleString()} DC</span>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            className="bg-custom-pink hover:bg-custom-pink/90"
            onClick={handleTransfer}
            disabled={!isValidAmount}
          >
            Send DreamCoins
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CoinTransfer;
