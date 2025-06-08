
/**
 * DreamCoin utility functions - Updated for authenticated users
 */

import { DreamCoinBank } from './dreamCoin/DreamCoinBank';

// Constants
export const DREAMCOIN_IMAGE_URL = '/lovable-uploads/66840c8c-e0ef-4733-9613-d03cd1a75d70.png';
export const DREAMCOIN_NAME = 'DreamCoin';

/**
 * Get a user's DreamCoin balance (legacy function for backward compatibility)
 * @param userId ID of the user
 * @returns Current balance or 0 if not found
 */
export const getUserBalance = (userId: string): number => {
  // For backward compatibility with non-authenticated system
  if (userId === 'current-user') {
    return 1000; // Default balance for demo
  }
  return DreamCoinBank.getInstance().getBalance(userId);
};

/**
 * Update a user's DreamCoin balance
 * @param userId ID of the user
 * @param newBalance New balance to set
 */
export const setUserBalance = (userId: string, newBalance: number): void => {
  console.warn('setUserBalance is deprecated, use DreamCoinBank methods instead');
};

/**
 * Add DreamCoins to user's balance
 * @param userId ID of the user
 * @param amount Amount to add
 */
export const addCoins = (userId: string, amount: number): void => {
  const currentBalance = getUserBalance(userId);
  DreamCoinBank.getInstance().deductTransactionFee(userId, -amount, `Credit of ${amount} DreamCoins`);
};

/**
 * Remove DreamCoins from user's balance
 * @param userId ID of the user
 * @param amount Amount to remove
 * @returns true if successful, false if insufficient balance
 */
export const removeCoins = (userId: string, amount: number): boolean => {
  return DreamCoinBank.getInstance().deductTransactionFee(userId, amount, `Debit of ${amount} DreamCoins`);
};

/**
 * Transfer DreamCoins from one user to another
 * @param fromUserId ID of the user sending coins
 * @param toUserId ID of the user receiving coins
 * @param amount Amount to transfer
 * @returns true if successful, false if insufficient balance
 */
export const transferCoins = (fromUserId: string, toUserId: string, amount: number): boolean => {
  return DreamCoinBank.getInstance().transferCoins(fromUserId, toUserId, amount);
};

/**
 * Purchase a gift using DreamCoins
 * @param userId ID of the user purchasing the gift
 * @param giftId ID of the gift being purchased
 * @param recipientId ID of the user receiving the gift
 * @returns Gift details if purchase successful, null if insufficient funds
 */
export const purchaseGift = (userId: string, giftId: string, recipientId: string): any => {
  try {
    return DreamCoinBank.getInstance().purchaseGift(userId, giftId, recipientId);
  } catch (error) {
    console.error(`Error purchasing gift: ${(error as Error).message}`);
    return null;
  }
};
