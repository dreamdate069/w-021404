
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useUserCoinBalance = () => {
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchBalance = async () => {
    if (!user) {
      setBalance(0);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_coin_balances')
        .select('balance')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching balance:', error);
        setBalance(0);
      } else {
        setBalance(data?.balance || 0);
      }
    } catch (err) {
      console.error('Error:', err);
      setBalance(0);
    } finally {
      setLoading(false);
    }
  };

  const updateBalance = async (newBalance: number) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('user_coin_balances')
        .update({ balance: newBalance })
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating balance:', error);
        return false;
      }

      setBalance(newBalance);
      return true;
    } catch (err) {
      console.error('Error updating balance:', err);
      return false;
    }
  };

  const addCoins = async (amount: number) => {
    const newBalance = balance + amount;
    const success = await updateBalance(newBalance);
    if (success) {
      toast({
        title: "DreamCoins Added!",
        description: `${amount} DreamCoins have been added to your account.`,
      });
    }
    return success;
  };

  const deductCoins = async (amount: number) => {
    if (balance < amount) {
      toast({
        title: "Insufficient DreamCoins",
        description: "You don't have enough DreamCoins for this action.",
        variant: "destructive",
      });
      return false;
    }

    const newBalance = balance - amount;
    return await updateBalance(newBalance);
  };

  useEffect(() => {
    fetchBalance();
  }, [user]);

  return {
    balance,
    loading,
    addCoins,
    deductCoins,
    updateBalance,
    refetch: fetchBalance
  };
};
