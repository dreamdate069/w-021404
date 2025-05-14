
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { DollarSign } from 'lucide-react';
import { getUserBalance } from '@/utils/dreamCoinUtils';
import { DreamCoinBank } from '@/utils/dreamCoin';

interface Gift {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

interface GiftSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGiftSelect: (giftId: string) => void;
  balance: number;
  recipientName: string;
}

const GiftSelector: React.FC<GiftSelectorProps> = ({
  open,
  onOpenChange,
  onGiftSelect,
  balance,
  recipientName
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  
  // Get available gifts from the DreamCoin system
  const availableGifts = DreamCoinBank.getInstance().getGifts();
  
  // Get categories
  const categories = ['all', ...new Set(availableGifts.map(gift => gift.category))];
  
  // Filter gifts by category
  const filteredGifts = selectedCategory === 'all'
    ? availableGifts
    : availableGifts.filter(gift => gift.category === selectedCategory);
  
  const handleGiftSelect = (gift: Gift) => {
    setSelectedGift(gift);
  };
  
  const handleConfirmSelection = () => {
    if (selectedGift) {
      onGiftSelect(selectedGift.id);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Send a Gift</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Choose a gift to send to {recipientName}
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
        
        <Tabs defaultValue={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="bg-zinc-800 grid grid-flow-col auto-cols-fr overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="capitalize data-[state=active]:bg-rose-500 data-[state=active]:text-white"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value={selectedCategory} className="mt-4">
            <div className="grid grid-cols-3 gap-3">
              {filteredGifts.map((gift) => {
                const canAfford = balance >= gift.price;
                
                return (
                  <div
                    key={gift.id}
                    className={`rounded-lg p-2 border-2 cursor-pointer flex flex-col items-center justify-center transition-colors
                      ${selectedGift?.id === gift.id ? 'border-rose-500 bg-rose-500/10' : 'border-zinc-800'}
                      ${!canAfford ? 'opacity-50 cursor-not-allowed' : 'hover:border-rose-500/50'}`}
                    onClick={() => canAfford && handleGiftSelect(gift)}
                  >
                    <div className="w-14 h-14 flex items-center justify-center">
                      <img 
                        src={gift.imageUrl} 
                        alt={gift.name} 
                        className="max-w-full max-h-full" 
                      />
                    </div>
                    <h3 className="text-sm font-medium mt-2">{gift.name}</h3>
                    <div className="flex items-center gap-0.5 text-xs text-zinc-400">
                      <DollarSign className="w-3 h-3 text-amber-400" />
                      <span>{gift.price.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex items-center justify-end gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleConfirmSelection}
            disabled={!selectedGift || balance < (selectedGift?.price || 0)}
            className="bg-rose-500 hover:bg-rose-600"
          >
            {selectedGift ? `Send for ${selectedGift.price.toLocaleString()} DC` : 'Select a gift'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GiftSelector;
