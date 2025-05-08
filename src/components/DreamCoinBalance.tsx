
import React, { useState } from 'react';
import { Coins, Plus } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface DreamCoinBalanceProps {
  balance: number;
}

const DreamCoinBalance: React.FC<DreamCoinBalanceProps> = ({ balance }) => {
  const [isLowBalance, setIsLowBalance] = useState(balance < 10000);
  const formattedBalance = new Intl.NumberFormat().format(balance);

  const handlePurchase = (method: string) => {
    console.log(`Processing payment via ${method}`);
    // Here you would implement the actual payment processing
  };

  return (
    <div className="flex items-center">
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex items-center gap-2 bg-zinc-800 rounded-full px-3 py-1 hover:bg-zinc-700 transition-colors">
            <img 
              src="/lovable-uploads/66840c8c-e0ef-4733-9613-d03cd1a75d70.png" 
              alt="DreamCoin" 
              className="h-6 w-6 object-contain animate-pulse" 
            />
            <span className="text-white font-medium text-sm">{formattedBalance}</span>
            <Plus size={14} className="text-zinc-400" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80 bg-zinc-800 border-zinc-700 text-white">
          <div className="space-y-4">
            <h4 className="font-medium text-center">Top Up DreamCoins</h4>
            <div className="grid grid-cols-2 gap-2">
              <button 
                className="bg-zinc-700 p-3 rounded-md hover:bg-zinc-600 transition-colors text-center"
                onClick={() => handlePurchase('10000 DC')}
              >
                10,000 DC
                <div className="text-xs text-zinc-400">$9.99</div>
              </button>
              <button 
                className="bg-zinc-700 p-3 rounded-md hover:bg-zinc-600 transition-colors text-center"
                onClick={() => handlePurchase('50000 DC')}
              >
                50,000 DC
                <div className="text-xs text-zinc-400">$39.99</div>
              </button>
              <button 
                className="bg-zinc-700 p-3 rounded-md hover:bg-zinc-600 transition-colors text-center"
                onClick={() => handlePurchase('100000 DC')}
              >
                100,000 DC
                <div className="text-xs text-zinc-400">$69.99</div>
              </button>
              <button 
                className="bg-zinc-700 p-3 rounded-md hover:bg-zinc-600 transition-colors text-center"
                onClick={() => handlePurchase('500000 DC')}
              >
                500,000 DC
                <div className="text-xs text-zinc-400">$299.99</div>
              </button>
            </div>
            
            <div className="space-y-2">
              <h5 className="text-sm font-medium">Payment Methods</h5>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  className="bg-[#0070BA] py-2 px-4 rounded text-white text-sm font-medium"
                  onClick={() => handlePurchase('PayPal')}
                >
                  PayPal
                </button>
                <button 
                  className="bg-[#0C0E48] py-2 px-4 rounded text-white text-sm font-medium"
                  onClick={() => handlePurchase('Crypto.com')}
                >
                  Crypto.com
                </button>
                <button 
                  className="bg-[#000] py-2 px-4 rounded text-white text-sm font-medium"
                  onClick={() => handlePurchase('Paysafecard')}
                >
                  Paysafecard
                </button>
                <button 
                  className="bg-white py-2 px-4 rounded text-black text-sm font-medium"
                  onClick={() => handlePurchase('Google Pay')}
                >
                  Google Pay
                </button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      
      {isLowBalance && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm" className="ml-2 text-xs py-1 px-2">
              Low Balance!
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-zinc-800 border-zinc-700 text-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Low DreamCoin Balance</AlertDialogTitle>
              <AlertDialogDescription className="text-zinc-400">
                Your DreamCoin balance is running low. Top up now to continue enjoying premium features!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-zinc-700 text-white hover:bg-zinc-600">Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-custom-pink hover:bg-custom-pink/90">Top Up Now</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default DreamCoinBalance;
