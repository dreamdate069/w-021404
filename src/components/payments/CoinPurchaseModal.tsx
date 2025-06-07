
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { DollarSign, Gift, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import PayPalButton from './PayPalButton';
import GooglePayButton from './GooglePayButton';

interface CoinPackage {
  id: string;
  name: string;
  description: string;
  dreamcoins: number;
  bonus_coins: number;
  price_usd: number;
  sort_order: number;
}

interface CoinPurchaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPurchaseComplete: (dreamcoinsAdded: number) => void;
}

const CoinPurchaseModal: React.FC<CoinPurchaseModalProps> = ({
  open,
  onOpenChange,
  onPurchaseComplete
}) => {
  const [packages, setPackages] = useState<CoinPackage[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<CoinPackage | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      fetchCoinPackages();
    }
  }, [open]);

  const fetchCoinPackages = async () => {
    try {
      const { data, error } = await supabase
        .from('coin_packages')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');

      if (error) throw error;
      setPackages(data || []);
    } catch (error) {
      console.error('Error fetching coin packages:', error);
      toast({
        title: "Error",
        description: "Failed to load coin packages",
        variant: "destructive",
      });
    }
  };

  const handlePaymentSuccess = (dreamcoinsAdded: number) => {
    toast({
      title: "Purchase Successful!",
      description: `${dreamcoinsAdded} DreamCoins have been added to your account.`,
      variant: "default",
    });
    onPurchaseComplete(dreamcoinsAdded);
    onOpenChange(false);
  };

  const handlePaymentError = (error: string) => {
    toast({
      title: "Payment Failed",
      description: error,
      variant: "destructive",
    });
  };

  if (selectedPackage) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Purchase</DialogTitle>
          </DialogHeader>
          
          <Card className="bg-zinc-800 border-zinc-700">
            <CardHeader>
              <CardTitle className="text-white">{selectedPackage.name}</CardTitle>
              <CardDescription className="text-zinc-400">
                {selectedPackage.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span>DreamCoins:</span>
                <span className="font-bold">{selectedPackage.dreamcoins.toLocaleString()}</span>
              </div>
              {selectedPackage.bonus_coins > 0 && (
                <div className="flex justify-between items-center text-emerald-400">
                  <span className="flex items-center gap-1">
                    <Gift className="h-4 w-4" />
                    Bonus:
                  </span>
                  <span className="font-bold">+{selectedPackage.bonus_coins.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-lg font-bold border-t border-zinc-700 pt-4">
                <span>Total:</span>
                <span className="text-emerald-400">
                  {(selectedPackage.dreamcoins + selectedPackage.bonus_coins).toLocaleString()} DC
                </span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span>Price:</span>
                <span className="font-bold">${selectedPackage.price_usd}</span>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <PayPalButton
              package={selectedPackage}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
            <GooglePayButton
              package={selectedPackage}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          </div>

          <Button
            variant="outline"
            onClick={() => setSelectedPackage(null)}
            className="border-zinc-600 text-zinc-300"
          >
            Back to Packages
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-amber-400" />
            Buy DreamCoins
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              className="bg-zinc-800 border-zinc-700 cursor-pointer hover:bg-zinc-750 transition-colors"
              onClick={() => setSelectedPackage(pkg)}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-white">{pkg.name}</CardTitle>
                  {pkg.bonus_coins > 0 && (
                    <Badge className="bg-emerald-600 text-white">
                      <Star className="h-3 w-3 mr-1" />
                      Bonus
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-zinc-400">
                  {pkg.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>DreamCoins:</span>
                    <span className="font-bold">{pkg.dreamcoins.toLocaleString()}</span>
                  </div>
                  {pkg.bonus_coins > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Bonus:</span>
                      <span className="font-bold">+{pkg.bonus_coins.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-2 border-t border-zinc-700">
                    <span className="text-lg font-bold">${pkg.price_usd}</span>
                    <span className="text-sm text-zinc-400">
                      Total: {(pkg.dreamcoins + pkg.bonus_coins).toLocaleString()} DC
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CoinPurchaseModal;
