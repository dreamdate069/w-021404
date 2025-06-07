
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { DollarSign, CreditCard } from 'lucide-react';

interface Payment {
  id: string;
  payment_method: string;
  payment_provider_id: string;
  amount_usd: number;
  dreamcoins_purchased: number;
  bonus_coins: number;
  status: string;
  created_at: string;
  completed_at: string | null;
}

const PaymentHistory: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setPayments(data || []);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      completed: 'bg-emerald-600',
      pending: 'bg-yellow-600',
      failed: 'bg-red-600',
      refunded: 'bg-gray-600'
    };

    return (
      <Badge className={variants[status] || 'bg-gray-600'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const totalRevenue = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount_usd, 0);

  const totalTransactions = payments.filter(p => p.status === 'completed').length;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Payment History</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-zinc-800 border-zinc-700 text-white">
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-emerald-400" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-zinc-400 mt-1">From completed transactions</p>
          </CardContent>
        </Card>
        
        <Card className="bg-zinc-800 border-zinc-700 text-white">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-custom-pink" />
              Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTransactions}</div>
            <p className="text-xs text-zinc-400 mt-1">Successful payments</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-zinc-800 border-zinc-700 text-white">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription className="text-zinc-400">
            Latest payment transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-700">
                  <TableHead className="text-zinc-400">Date</TableHead>
                  <TableHead className="text-zinc-400">Method</TableHead>
                  <TableHead className="text-zinc-400">Amount</TableHead>
                  <TableHead className="text-zinc-400">DreamCoins</TableHead>
                  <TableHead className="text-zinc-400">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id} className="border-zinc-700">
                    <TableCell>{formatDate(payment.created_at)}</TableCell>
                    <TableCell className="capitalize">
                      {payment.payment_method.replace('_', ' ')}
                    </TableCell>
                    <TableCell>${payment.amount_usd}</TableCell>
                    <TableCell>
                      {(payment.dreamcoins_purchased + payment.bonus_coins).toLocaleString()}
                    </TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  </TableRow>
                ))}
                {payments.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-zinc-400 py-8">
                      No payment transactions found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentHistory;
