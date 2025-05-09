
/**
 * DreamCoin utility functions
 */

// Constants
export const DREAMCOIN_IMAGE_URL = '/lovable-uploads/66840c8c-e0ef-4733-9613-d03cd1a75d70.png';
export const DREAMCOIN_NAME = 'DreamCoin';

// Map of user balances - in a real app, this would be fetched from a database
const userBalances: Record<string, number> = {
  'current-user': 1500,
  'user-1': 2500,
  'user-2': 800,
  'user-3': 3200,
};

/**
 * Get a user's DreamCoin balance
 * @param userId ID of the user
 * @returns Current balance or 0 if not found
 */
export const getUserBalance = (userId: string): number => {
  return userBalances[userId] || 0;
};

/**
 * Update a user's DreamCoin balance
 * @param userId ID of the user
 * @param newBalance New balance to set
 */
export const setUserBalance = (userId: string, newBalance: number): void => {
  userBalances[userId] = newBalance;
};

/**
 * Add DreamCoins to user's balance
 * @param userId ID of the user
 * @param amount Amount to add
 */
export const addCoins = (userId: string, amount: number): void => {
  const currentBalance = getUserBalance(userId);
  setUserBalance(userId, currentBalance + amount);
};

/**
 * Remove DreamCoins from user's balance
 * @param userId ID of the user
 * @param amount Amount to remove
 * @returns true if successful, false if insufficient balance
 */
export const removeCoins = (userId: string, amount: number): boolean => {
  const currentBalance = getUserBalance(userId);
  
  if (currentBalance < amount) {
    return false;
  }
  
  setUserBalance(userId, currentBalance - amount);
  return true;
};

/**
 * Transfer DreamCoins from one user to another
 * @param fromUserId ID of the user sending coins
 * @param toUserId ID of the user receiving coins
 * @param amount Amount to transfer
 * @returns true if successful, false if insufficient balance
 */
export const transferCoins = (fromUserId: string, toUserId: string, amount: number): boolean => {
  // Check if the sender has enough coins
  if (!removeCoins(fromUserId, amount)) {
    return false;
  }
  
  // Add coins to recipient
  addCoins(toUserId, amount);
  return true;
};
