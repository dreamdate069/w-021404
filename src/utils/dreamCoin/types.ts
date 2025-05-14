
/**
 * DreamCoin common types and interfaces
 */

// Gift item interface
export interface GiftItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

// Transaction interface
export interface Transaction {
  id: string;
  userId: string;
  type: 'purchase' | 'transfer' | 'gift' | 'fee' | 'credit' | 'admin';
  amount: number;
  timestamp: number;
  description: string;
  targetUserId?: string;
  giftId?: string;
}

// Export the transfer fee percentage constant
export const TRANSFER_FEE_PERCENTAGE = 20;
