
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Gift, GiftCategory, GIFT_CATALOG, getGiftsByCategory } from '@/utils/giftUtils';
import { cn } from '@/lib/utils';

interface GiftSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGiftSelect: (giftId: string) => void;
  balance: number;
  onSelect?: (giftId: string) => void;
  onClose?: () => void;
  recipientName?: string; // Add the recipientName prop
}

const GiftSelector: React.FC<GiftSelectorProps> = ({
  open,
  onOpenChange,
  onGiftSelect,
  balance,
  onSelect,
  onClose,
  recipientName
}) => {
  const [selectedCategory, setSelectedCategory] = useState<GiftCategory>(GiftCategory.ROMANTIC);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  
  // Filter gifts by category
  const categoryGifts = getGiftsByCategory(selectedCategory);
  
  // Handle gift selection
  const handleGiftSelect = (gift: Gift) => {
    setSelectedGift(gift);
  };
  
  // Handle gift purchase
  const handleGiftPurchase = () => {
    if (selectedGift) {
      // Use either onGiftSelect or onSelect (for backward compatibility)
      if (onSelect) {
        onSelect(selectedGift.id);
      } else {
        onGiftSelect(selectedGift.id);
      }
      
      // Use either onOpenChange or onClose
      if (onClose) {
        onClose();
      } else {
        onOpenChange(false);
      }
      
      setSelectedGift(null);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={(value) => {
      if (onClose && !value) {
        onClose();
      } else {
        onOpenChange(value);
      }
    }}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-3xl h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-white">
            {recipientName ? `Select a Gift for ${recipientName}` : 'Select a Gift'}
          </DialogTitle>
          <DialogDescription>
            Send a gift to express your interest. You have{' '}
            <span className="text-custom-pink font-bold">{balance.toLocaleString()}</span> DreamCoins.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue={GiftCategory.ROMANTIC} className="flex-1 flex flex-col">
          <TabsList className="grid grid-cols-5 bg-zinc-800">
            <TabsTrigger 
              value={GiftCategory.ROMANTIC}
              onClick={() => setSelectedCategory(GiftCategory.ROMANTIC)}
              className="data-[state=active]:bg-custom-pink"
            >
              Romantic
            </TabsTrigger>
            <TabsTrigger 
              value={GiftCategory.FUN}
              onClick={() => setSelectedCategory(GiftCategory.FUN)}
              className="data-[state=active]:bg-custom-pink"
            >
              Fun
            </TabsTrigger>
            <TabsTrigger 
              value={GiftCategory.LUXURY}
              onClick={() => setSelectedCategory(GiftCategory.LUXURY)}
              className="data-[state=active]:bg-custom-pink"
            >
              Luxury
            </TabsTrigger>
            <TabsTrigger 
              value={GiftCategory.SPECIAL}
              onClick={() => setSelectedCategory(GiftCategory.SPECIAL)}
              className="data-[state=active]:bg-custom-pink"
            >
              Special
            </TabsTrigger>
            <TabsTrigger 
              value={GiftCategory.SEASONAL}
              onClick={() => setSelectedCategory(GiftCategory.SEASONAL)}
              className="data-[state=active]:bg-custom-pink"
            >
              Seasonal
            </TabsTrigger>
          </TabsList>
          
          {Object.values(GiftCategory).map((category) => (
            <TabsContent 
              key={category}
              value={category}
              className="flex-1 overflow-y-auto mt-4"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {getGiftsByCategory(category).map((gift) => (
                  <div 
                    key={gift.id} 
                    className={cn(
                      "border rounded-md p-4 flex flex-col items-center cursor-pointer transition-colors",
                      selectedGift?.id === gift.id 
                        ? "border-custom-pink bg-zinc-800" 
                        : "border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/50",
                      balance < gift.price && "opacity-50 cursor-not-allowed"
                    )}
                    onClick={() => balance >= gift.price && handleGiftSelect(gift)}
                  >
                    <div className="w-24 h-24 mb-2 flex items-center justify-center">
                      <img 
                        src={gift.imageUrl || '/placeholder.svg'} 
                        alt={gift.name} 
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <h3 className="text-white text-center font-medium">{gift.name}</h3>
                    <p className="text-zinc-400 text-xs text-center mt-1">{gift.description}</p>
                    <div className="mt-2 text-custom-pink font-bold">
                      {gift.price.toLocaleString()} DC
                    </div>
                    {balance < gift.price && (
                      <p className="text-red-500 text-xs mt-1">Insufficient funds</p>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <DialogFooter className="flex justify-between items-center">
          <div className="text-sm">
            {selectedGift && (
              <span>
                Selected: <span className="font-bold">{selectedGift.name}</span> ({selectedGift.price.toLocaleString()} DC)
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-custom-pink hover:bg-custom-pink/90"
              onClick={handleGiftPurchase}
              disabled={!selectedGift || selectedGift.price > balance}
            >
              {selectedGift ? `Send Gift (${selectedGift.price.toLocaleString()} DC)` : 'Send Gift'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GiftSelector;
