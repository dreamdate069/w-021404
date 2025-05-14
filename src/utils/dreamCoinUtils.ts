
import { DreamCoinBank } from './dreamCoin';

export const getUserBalance = (userId: string): number => {
  return DreamCoinBank.getInstance().getUserBalance(userId);
};

export const transferCoins = (
  senderId: string,
  recipientId: string,
  amount: number
): boolean => {
  return DreamCoinBank.getInstance().transferCoins(senderId, recipientId, amount);
};

export const purchaseGift = (
  userId: string,
  giftId: string,
  recipientId: string
) => {
  return DreamCoinBank.getInstance().purchaseGift(userId, giftId, recipientId);
};

export const deductTransactionFee = (
  userId: string,
  amount: number,
  reason: string
): boolean => {
  return DreamCoinBank.getInstance().deductTransactionFee(userId, amount, reason);
};
