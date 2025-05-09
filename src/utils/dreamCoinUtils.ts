
import { toast } from "@/hooks/use-toast";

// Constants for coin operations
export const WELCOME_PACKAGE_AMOUNT = 25000;
export const MESSAGE_COST = 999;

// Local storage keys
const DREAM_COIN_BALANCE_KEY = 'dreamCoinBalance';
const WELCOME_PACKAGE_RECEIVED_KEY = 'welcomePackageReceived';

/**
 * Gets the current DreamCoin balance from local storage
 */
export const getDreamCoinBalance = (): number => {
  const storedBalance = localStorage.getItem(DREAM_COIN_BALANCE_KEY);
  if (storedBalance) {
    return parseInt(storedBalance, 10);
  }
  
  // If no balance is found, check if welcome package should be given
  if (!hasReceivedWelcomePackage()) {
    giveWelcomePackage();
    return WELCOME_PACKAGE_AMOUNT;
  }
  
  return 0;
};

/**
 * Updates the DreamCoin balance in local storage
 */
export const setDreamCoinBalance = (balance: number): void => {
  localStorage.setItem(DREAM_COIN_BALANCE_KEY, balance.toString());
};

/**
 * Checks if the user has received their welcome package
 */
export const hasReceivedWelcomePackage = (): boolean => {
  return localStorage.getItem(WELCOME_PACKAGE_RECEIVED_KEY) === 'true';
};

/**
 * Gives the welcome package to a new user
 */
export const giveWelcomePackage = (): void => {
  setDreamCoinBalance(WELCOME_PACKAGE_AMOUNT);
  localStorage.setItem(WELCOME_PACKAGE_RECEIVED_KEY, 'true');
  
  toast({
    title: "Welcome to DreamDate!",
    description: `You've received ${WELCOME_PACKAGE_AMOUNT.toLocaleString()} DreamCoins as a welcome gift!`
  });
};

/**
 * Attempts to deduct coins for an action, returns success status
 */
export const deductCoins = (amount: number, action: string): boolean => {
  const currentBalance = getDreamCoinBalance();
  
  if (currentBalance < amount) {
    toast({
      title: "Insufficient DreamCoins",
      description: `You need ${amount.toLocaleString()} DreamCoins for this ${action}.`,
      variant: "destructive"
    });
    return false;
  }
  
  const newBalance = currentBalance - amount;
  setDreamCoinBalance(newBalance);
  
  toast({
    title: `${amount.toLocaleString()} DreamCoins Spent`,
    description: `Your new balance: ${newBalance.toLocaleString()} DreamCoins`
  });
  
  return true;
};

/**
 * Specifically handles message sending cost
 */
export const deductMessageCost = (): boolean => {
  return deductCoins(MESSAGE_COST, "message");
};

/**
 * Adds coins to the balance (for gifts, purchases, etc.)
 */
export const addCoins = (amount: number, reason: string): void => {
  const currentBalance = getDreamCoinBalance();
  const newBalance = currentBalance + amount;
  setDreamCoinBalance(newBalance);
  
  toast({
    title: `${amount.toLocaleString()} DreamCoins Added`,
    description: `${reason}. Your new balance: ${newBalance.toLocaleString()} DreamCoins`
  });
};
