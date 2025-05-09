
import { toast } from "@/hooks/use-toast";
import { dreamCoinBank, TransactionType } from "./DreamCoinBank";

// Constants for coin operations
export const WELCOME_PACKAGE_AMOUNT = 25000;
export const MESSAGE_COST = 999;

// Local storage keys
const DREAM_COIN_BALANCE_KEY = 'dreamCoinBalance';
const WELCOME_PACKAGE_RECEIVED_KEY = 'welcomePackageReceived';

/**
 * Gets the current DreamCoin balance from local storage
 */
export const getDreamCoinBalance = (userId: string = 'current-user'): number => {
  return dreamCoinBank.getBalance(userId);
};

/**
 * Updates the DreamCoin balance in local storage
 */
export const setDreamCoinBalance = (balance: number, userId: string = 'current-user'): void => {
  dreamCoinBank.setBalance(userId, balance);
};

/**
 * Checks if the user has received their welcome package
 */
export const hasReceivedWelcomePackage = (userId: string = 'current-user'): boolean => {
  const key = `${WELCOME_PACKAGE_RECEIVED_KEY}_${userId}`;
  return localStorage.getItem(key) === 'true';
};

/**
 * Gives the welcome package to a new user
 */
export const giveWelcomePackage = (userId: string = 'current-user'): void => {
  dreamCoinBank.giveWelcomePackage(userId, WELCOME_PACKAGE_AMOUNT);
  
  // Mark that the user has received the welcome package
  const key = `${WELCOME_PACKAGE_RECEIVED_KEY}_${userId}`;
  localStorage.setItem(key, 'true');
};

/**
 * Attempts to deduct coins for an action, returns success status
 */
export const deductCoins = (amount: number, action: string, userId: string = 'current-user'): boolean => {
  const currentBalance = getDreamCoinBalance(userId);
  
  if (currentBalance < amount) {
    toast({
      title: "Insufficient DreamCoins",
      description: `You need ${amount.toLocaleString()} DreamCoins for this ${action}.`,
      variant: "destructive"
    });
    return false;
  }
  
  const newBalance = currentBalance - amount;
  setDreamCoinBalance(newBalance, userId);
  
  toast({
    title: `${amount.toLocaleString()} DreamCoins Spent`,
    description: `Your new balance: ${newBalance.toLocaleString()} DreamCoins`
  });
  
  return true;
};

/**
 * Specifically handles message sending cost
 */
export const deductMessageCost = (userId: string = 'current-user'): boolean => {
  return deductCoins(MESSAGE_COST, "message", userId);
};

/**
 * Adds coins to the balance (for gifts, purchases, etc.)
 */
export const addCoins = (amount: number, reason: string, userId: string = 'current-user'): void => {
  const currentBalance = getDreamCoinBalance(userId);
  const newBalance = currentBalance + amount;
  setDreamCoinBalance(newBalance, userId);
  
  toast({
    title: `${amount.toLocaleString()} DreamCoins Added`,
    description: `${reason}. Your new balance: ${newBalance.toLocaleString()} DreamCoins`
  });
};

/**
 * Transfer coins to another user (20% fee applied)
 */
export const transferCoins = (
  amount: number, 
  recipientId: string, 
  description: string = "Coin transfer", 
  senderId: string = 'current-user'
): boolean => {
  return dreamCoinBank.transferCoins(amount, senderId, recipientId, description);
};

/**
 * Purchase and send a gift to another user
 */
export const purchaseGift = (
  giftId: string,
  giftPrice: number,
  recipientId: string,
  giftName: string,
  senderId: string = 'current-user'
): boolean => {
  return dreamCoinBank.purchaseGift(giftId, giftPrice, senderId, recipientId, giftName);
};

/**
 * Charge for media attachment
 */
export const chargeForMedia = (
  mediaType: 'image' | 'video' | 'audio',
  recipientId?: string,
  userId: string = 'current-user'
): boolean => {
  return dreamCoinBank.chargeForMedia(userId, mediaType, recipientId);
};

/**
 * Get user's transaction history
 */
export const getTransactionHistory = (userId: string = 'current-user') => {
  return dreamCoinBank.getUserTransactions(userId);
};

/**
 * Get the system circulation data
 */
export const getCirculationData = () => {
  return dreamCoinBank.getCirculationData();
};
