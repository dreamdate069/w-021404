
import { DreamCoinBank, Transaction } from './DreamCoinBank';

// Get user balance
export const getUserBalance = (userId: string): number => {
  return DreamCoinBank.getInstance().getBalance(userId);
};

// Transfer coins from one user to another (with 20% fee)
export const transferCoins = (senderId: string, recipientId: string, amount: number): boolean => {
  return DreamCoinBank.getInstance().transferCoins(senderId, recipientId, amount);
};

// Get transaction history for a user
export const getTransactionHistory = (userId: string): Transaction[] => {
  return DreamCoinBank.getInstance().getTransactionHistory(userId);
};

// Format coin amount for display
export const formatCoinAmount = (amount: number): string => {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `${(amount / 1000).toFixed(1)}K`;
  }
  return amount.toString();
};

// Purchase gift for another user
export const purchaseGift = (giftId: string, price: number, recipientId: string, giftName: string): boolean => {
  try {
    const bank = DreamCoinBank.getInstance();
    bank.purchaseGift('current-user', giftId, recipientId);
    return true;
  } catch (error) {
    console.error(`Failed to purchase gift: ${error}`);
    return false;
  }
};
