
import { v4 as uuidv4 } from 'uuid';

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

// Available gift items
const GIFT_ITEMS: GiftItem[] = [
  {
    id: 'gift-1',
    name: 'Rose',
    description: 'A beautiful red rose',
    price: 1000,
    imageUrl: '/user-uploads/gifts/rose.png',
    category: 'flowers'
  },
  {
    id: 'gift-2',
    name: 'Chocolate Box',
    description: 'Delicious box of chocolates',
    price: 2500,
    imageUrl: '/user-uploads/gifts/chocolate.png',
    category: 'food'
  },
  {
    id: 'gift-3',
    name: 'Diamond Ring',
    description: 'Shiny diamond ring',
    price: 50000,
    imageUrl: '/user-uploads/gifts/ring.png',
    category: 'jewelry'
  },
  {
    id: 'gift-4',
    name: 'Teddy Bear',
    description: 'Soft teddy bear',
    price: 3000,
    imageUrl: '/user-uploads/gifts/teddy.png',
    category: 'toys'
  },
  {
    id: 'gift-5',
    name: 'Heart',
    description: 'Animated heart',
    price: 1500,
    imageUrl: '/user-uploads/gifts/heart.png',
    category: 'animations'
  }
];

export class DreamCoinBank {
  private static instance: DreamCoinBank;
  private userBalances: Map<string, number> = new Map();
  private transactions: Transaction[] = [];
  private totalCirculation: number = 1000000000; // 1 billion DreamCoins
  private initialDistributed: boolean = false;

  private constructor() {
    this.initializeSystem();
  }

  public static getInstance(): DreamCoinBank {
    if (!DreamCoinBank.instance) {
      DreamCoinBank.instance = new DreamCoinBank();
    }
    return DreamCoinBank.instance;
  }

  private initializeSystem(): void {
    if (!this.initialDistributed) {
      // Set initial balances for test users
      this.userBalances.set('current-user', 10000);
      this.userBalances.set('user-1', 5000);
      this.userBalances.set('user-2', 3000);
      this.userBalances.set('user-3', 7500);
      
      this.initialDistributed = true;
      
      // Add initial transaction records
      this.transactions.push({
        id: uuidv4(),
        userId: 'admin',
        type: 'admin',
        amount: 10000,
        timestamp: Date.now() - 86400000, // 1 day ago
        description: 'Initial balance allocation to current-user'
      });
    }
    
    console.log('DreamCoin Bank initialized with 1,000,000,000 total coins in circulation');
  }

  public getBalance(userId: string): number {
    return this.userBalances.get(userId) || 0;
  }
  
  public getGifts(): GiftItem[] {
    return GIFT_ITEMS;
  }
  
  public getGiftById(giftId: string): GiftItem | undefined {
    return GIFT_ITEMS.find(gift => gift.id === giftId);
  }

  public transferCoins(senderId: string, recipientId: string, amount: number): boolean {
    const senderBalance = this.getBalance(senderId);
    
    if (senderBalance < amount || amount <= 0) {
      console.error('Insufficient funds or invalid amount');
      return false;
    }
    
    // Calculate the service fee (20%)
    const serviceFee = amount * 0.2;
    const amountAfterFee = amount - serviceFee;
    
    // Update balances
    this.userBalances.set(senderId, senderBalance - amount);
    this.userBalances.set(recipientId, this.getBalance(recipientId) + amountAfterFee);
    
    // Record transactions
    this.transactions.push({
      id: uuidv4(),
      userId: senderId,
      targetUserId: recipientId,
      type: 'transfer',
      amount: -amount,
      timestamp: Date.now(),
      description: `Sent ${amount} DreamCoins to user ${recipientId}`
    });
    
    this.transactions.push({
      id: uuidv4(),
      userId: recipientId,
      targetUserId: senderId,
      type: 'transfer',
      amount: amountAfterFee,
      timestamp: Date.now(),
      description: `Received ${amountAfterFee} DreamCoins from user ${senderId}`
    });
    
    this.transactions.push({
      id: uuidv4(),
      userId: 'system',
      targetUserId: senderId,
      type: 'fee',
      amount: serviceFee,
      timestamp: Date.now(),
      description: `Service fee for ${amount} DreamCoins transfer`
    });
    
    console.log(`Transfer completed: ${senderId} sent ${amount} DreamCoins to ${recipientId} (${amountAfterFee} after fees)`);
    return true;
  }
  
  public purchaseGift(senderId: string, giftId: string, recipientId: string): GiftItem {
    const gift = this.getGiftById(giftId);
    
    if (!gift) {
      throw new Error('Gift not found');
    }
    
    const senderBalance = this.getBalance(senderId);
    
    if (senderBalance < gift.price) {
      throw new Error('Insufficient funds');
    }
    
    // Calculate recipient credit (50% of gift price)
    const recipientCredit = gift.price * 0.5;
    
    // Update balances
    this.userBalances.set(senderId, senderBalance - gift.price);
    this.userBalances.set(recipientId, this.getBalance(recipientId) + recipientCredit);
    
    // Record transactions
    this.transactions.push({
      id: uuidv4(),
      userId: senderId,
      targetUserId: recipientId,
      type: 'gift',
      amount: -gift.price,
      timestamp: Date.now(),
      description: `Purchased ${gift.name} gift for user ${recipientId}`,
      giftId: gift.id
    });
    
    this.transactions.push({
      id: uuidv4(),
      userId: recipientId,
      targetUserId: senderId,
      type: 'credit',
      amount: recipientCredit,
      timestamp: Date.now(),
      description: `Received ${recipientCredit} DreamCoins from ${gift.name} gift`,
      giftId: gift.id
    });
    
    this.transactions.push({
      id: uuidv4(),
      userId: 'system',
      type: 'fee',
      amount: gift.price - recipientCredit,
      timestamp: Date.now(),
      description: `System fee for gift purchase`,
      giftId: gift.id
    });
    
    console.log(`Gift purchase completed: ${senderId} sent ${gift.name} to ${recipientId} (${recipientCredit} coins credited)`);
    return gift;
  }
  
  public deductTransactionFee(userId: string, amount: number, reason: string): boolean {
    const userBalance = this.getBalance(userId);
    
    if (userBalance < amount) {
      console.error('Insufficient funds for transaction fee');
      return false;
    }
    
    this.userBalances.set(userId, userBalance - amount);
    
    this.transactions.push({
      id: uuidv4(),
      userId: userId,
      type: 'fee',
      amount: -amount,
      timestamp: Date.now(),
      description: reason
    });
    
    return true;
  }
  
  public getTransactionHistory(userId: string): Transaction[] {
    return this.transactions
      .filter(transaction => transaction.userId === userId || transaction.targetUserId === userId)
      .sort((a, b) => b.timestamp - a.timestamp);
  }
  
  // Method to check total circulation
  public getTotalCirculation(): number {
    return this.totalCirculation;
  }
  
  // Method to check total distributed coins
  public getTotalDistributedCoins(): number {
    let totalDistributed = 0;
    this.userBalances.forEach(balance => {
      totalDistributed += balance;
    });
    return totalDistributed;
  }
}
