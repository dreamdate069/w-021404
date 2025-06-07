
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface CoinPackage {
  id: string;
  name: string;
  dreamcoins: number;
  bonus_coins: number;
  price_usd: number;
}

interface PayPalButtonProps {
  package: CoinPackage;
  onSuccess: (dreamcoinsAdded: number) => void;
  onError: (error: string) => void;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({
  package: pkg,
  onSuccess,
  onError
}) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handlePayPalPayment = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Create PayPal session
      const { data, error } = await supabase.functions.invoke('create-paypal-session', {
        body: {
          packageId: pkg.id,
          userId: user.id
        }
      });

      if (error) throw error;

      // Redirect to PayPal
      if (data.approvalUrl) {
        window.location.href = data.approvalUrl;
      } else {
        throw new Error('No approval URL received from PayPal');
      }
    } catch (error) {
      console.error('PayPal payment error:', error);
      onError(error.message || 'PayPal payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayPalPayment}
      disabled={loading}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
    >
      {loading ? 'Processing...' : `Pay with PayPal - $${pkg.price_usd}`}
    </Button>
  );
};

export default PayPalButton;
