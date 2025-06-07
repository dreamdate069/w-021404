
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface CoinPackage {
  id: string;
  name: string;
  dreamcoins: number;
  bonus_coins: number;
  price_usd: number;
}

interface GooglePayButtonProps {
  package: CoinPackage;
  onSuccess: (dreamcoinsAdded: number) => void;
  onError: (error: string) => void;
}

const GooglePayButton: React.FC<GooglePayButtonProps> = ({
  package: pkg,
  onSuccess,
  onError
}) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGooglePayment = async () => {
    setLoading(true);
    try {
      // For now, we'll show a message that Google Pay integration is coming soon
      toast({
        title: "Coming Soon",
        description: "Google Pay integration will be available in the next update. Please use PayPal for now.",
        variant: "default",
      });
      
      // TODO: Implement Google Pay integration
      // This would involve:
      // 1. Loading the Google Pay API
      // 2. Creating a payment request
      // 3. Handling the payment response
      // 4. Verifying with backend
      
    } catch (error) {
      console.error('Google Pay error:', error);
      onError(error.message || 'Google Pay payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleGooglePayment}
      disabled={loading}
      variant="outline"
      className="w-full border-zinc-600 text-zinc-300 hover:bg-zinc-700"
    >
      {loading ? 'Processing...' : `Pay with Google Pay - $${pkg.price_usd}`}
    </Button>
  );
};

export default GooglePayButton;
