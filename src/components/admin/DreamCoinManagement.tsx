
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { DollarSign, CreditCard, TrendingUp } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DreamCoinBank, TRANSFER_FEE_PERCENTAGE } from '@/utils/DreamCoinBank';
import PaymentHistory from '../payments/PaymentHistory';

const DreamCoinManagement = () => {
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();
  
  // Get data from the DreamCoin system
  const totalCoins = DreamCoinBank.getInstance().getTotalCirculation();
  const distributedCoins = DreamCoinBank.getInstance().getTotalDistributedCoins();
  
  // Mock transaction history - would be fetched from backend in production
  const recentTransactions = [
    { id: 'tx-1', userId: 'user-2', type: 'transfer', amount: 5000, timestamp: Date.now() - 3600000, description: 'Transfer to user-1' },
    { id: 'tx-2', userId: 'admin', type: 'admin', amount: 10000, timestamp: Date.now() - 7200000, description: 'Admin credit to user-3' },
    { id: 'tx-3', userId: 'system', type: 'fee', amount: 1000, timestamp: Date.now() - 10800000, description: 'System fee for gift purchase' },
  ];
  
  const handleAddCoins = () => {
    if (!userId || !amount) return;
    
    const amountNum = parseInt(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid positive number",
        variant: "destructive",
      });
      return;
    }
    
    setIsAdding(true);
    
    // Add coins using DreamCoinBank
    try {
      DreamCoinBank.getInstance().deductTransactionFee(
        userId, 
        -amountNum, 
        `Admin credit of ${amountNum} DreamCoins`
      );
      
      toast({
        title: "Coins Added",
        description: `${amountNum} DreamCoins added to user ${userId}`,
        variant: "default",
      });
      
      // Reset form
      setUserId('');
      setAmount('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add DreamCoins",
        variant: "destructive",
      });
    } finally {
      setIsAdding(false);
    }
  };
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  if (activeTab === 'payments') {
    return <PaymentHistory />;
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">DreamCoin Management</h2>
        
        <div className="flex gap-2">
          <Button
            variant={activeTab === 'overview' ? 'default' : 'outline'}
            onClick={() => setActiveTab('overview')}
            className={activeTab === 'overview' ? 'bg-custom-pink' : 'border-zinc-600 text-zinc-300'}
          >
            Overview
          </Button>
          <Button
            variant={activeTab === 'payments' ? 'default' : 'outline'}
            onClick={() => setActiveTab('payments')}
            className={activeTab === 'payments' ? 'bg-custom-pink' : 'border-zinc-600 text-zinc-300'}
          >
            Real Payments
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-zinc-800 border-zinc-700 text-white">
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-custom-pink" />
              Total Supply
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCoins.toLocaleString()}</div>
            <p className="text-xs text-zinc-400 mt-1">Maximum DreamCoin supply</p>
          </CardContent>
        </Card>
        
        <Card className="bg-zinc-800 border-zinc-700 text-white">
          <CardHeader>
            <CardTitle>Distributed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{distributedCoins.toLocaleString()}</div>
            <p className="text-xs text-zinc-400 mt-1">DreamCoins in circulation</p>
          </CardContent>
        </Card>
        
        <Card className="bg-zinc-800 border-zinc-700 text-white">
          <CardHeader>
            <CardTitle>Transfer Fee</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{TRANSFER_FEE_PERCENTAGE}%</div>
            <p className="text-xs text-zinc-400 mt-1">Current fee on transfers</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800 border-zinc-700 text-white">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-emerald-400" />
              Real Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0.00</div>
            <p className="text-xs text-zinc-400 mt-1">Total revenue from coin purchases</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-zinc-800 border-zinc-700 text-white">
          <CardHeader>
            <CardTitle>Add DreamCoins</CardTitle>
            <CardDescription className="text-zinc-400">
              Credit DreamCoins to a user's account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="userId" className="text-sm font-medium">
                  User ID
                </label>
                <Input
                  id="userId"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Enter user ID"
                  className="bg-zinc-700 border-zinc-600 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="amount" className="text-sm font-medium">
                  Amount
                </label>
                <Input
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  type="number"
                  className="bg-zinc-700 border-zinc-600 text-white"
                />
              </div>
              
              <Button 
                onClick={handleAddCoins} 
                disabled={!userId || !amount || isAdding}
                className="w-full bg-custom-pink hover:bg-custom-pink/90"
              >
                {isAdding ? 'Processing...' : 'Add DreamCoins'}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-zinc-800 border-zinc-700 text-white">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription className="text-zinc-400">
              Latest system-wide DreamCoin transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-700">
                  <TableHead className="text-zinc-400">User</TableHead>
                  <TableHead className="text-zinc-400">Type</TableHead>
                  <TableHead className="text-zinc-400">Amount</TableHead>
                  <TableHead className="text-zinc-400">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((tx) => (
                  <TableRow key={tx.id} className="border-zinc-700">
                    <TableCell className="font-medium">{tx.userId}</TableCell>
                    <TableCell>{tx.type}</TableCell>
                    <TableCell className={tx.amount > 0 ? 'text-emerald-500' : 'text-rose-500'}>
                      {tx.amount > 0 ? `+${tx.amount}` : tx.amount}
                    </TableCell>
                    <TableCell className="text-zinc-400">{formatDate(tx.timestamp)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DreamCoinManagement;
