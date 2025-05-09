import { toast } from "@/hooks/use-toast";

// Total DreamCoins in circulation (1 billion)
export const TOTAL_CIRCULATION = 1_000_000_000;

// Fee percentages
export const TRANSFER_FEE_PERCENTAGE = 20;
export const GIFT_RECIPIENT_PERCENTAGE = 50;

// Media costs
export const MEDIA_COSTS = {
  image: 499,
  video: 999,
  audio: 299,
};

// Transaction types
export enum TransactionType {
  WELCOME_PACKAGE = 'welcome_package',
  SEND_MESSAGE = 'send_message',
  TRANSFER = 'transfer',
  GIFT_PURCHASE = 'gift_purchase',
  MEDIA_ATTACHMENT = 'media_attachment',
  SYSTEM = 'system',
}

// Transaction record structure
export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  senderId?: string;
  recipientId?: string;
  fee?: number;
  timestamp: number;
  description: string;
  giftId?: string;
  mediaType?: 'image' | 'video' | 'audio';
}

// Storage keys
const TRANSACTIONS_KEY = 'dreamCoinTransactions';
const CIRCULATION_DATA_KEY = 'dreamCoinCirculationData';

export class DreamCoinBank {
  private static instance: DreamCoinBank;

  // Private constructor for Singleton pattern
  private constructor() {
    // Initialize circulation data if it doesn't exist
    if (!localStorage.getItem(CIRCULATION_DATA_KEY)) {
      this.initializeCirculationData();
    }
    
    // Initialize transactions array if it doesn't exist
    if (!localStorage.getItem(TRANSACTIONS_KEY)) {
      localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify([]));
    }
  }

  // Get the singleton instance
  public static getInstance(): DreamCoinBank {
    if (!DreamCoinBank.instance) {
      DreamCoinBank.instance = new DreamCoinBank();
    }
    return DreamCoinBank.instance;
  }

  // Initialize circulation data
  private initializeCirculationData() {
    const circulationData = {
      totalSupply: TOTAL_CIRCULATION,
      inCirculation: 0,
      systemReserve: TOTAL_CIRCULATION,
      lastUpdated: Date.now(),
    };
    localStorage.setItem(CIRCULATION_DATA_KEY, JSON.stringify(circulationData));
  }

  // Get all transactions
  public getTransactions(): Transaction[] {
    const transactions = localStorage.getItem(TRANSACTIONS_KEY);
    return transactions ? JSON.parse(transactions) : [];
  }

  // Get user's transactions
  public getUserTransactions(userId: string): Transaction[] {
    const allTransactions = this.getTransactions();
    return allTransactions.filter(
      t => t.senderId === userId || t.recipientId === userId
    );
  }

  // Add a new transaction
  private addTransaction(transaction: Omit<Transaction, 'id' | 'timestamp'>): Transaction {
    const newTransaction: Transaction = {
      ...transaction,
      id: `txn-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      timestamp: Date.now(),
    };

    const transactions = this.getTransactions();
    transactions.push(newTransaction);
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
    
    return newTransaction;
  }

  // Transfer coins between users (with 20% fee)
  public transferCoins(
    amount: number, 
    senderId: string, 
    recipientId: string, 
    description: string
  ): boolean {
    // Validate amount
    if (amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Transfer amount must be greater than zero",
        variant: "destructive"
      });
      return false;
    }

    // Calculate fee
    const fee = Math.floor(amount * (TRANSFER_FEE_PERCENTAGE / 100));
    const netAmount = amount - fee;

    // Get current balances
    const senderBalance = this.getBalance(senderId);
    
    // Check if sender has enough balance
    if (senderBalance < amount) {
      toast({
        title: "Insufficient funds",
        description: `You need ${amount.toLocaleString()} DreamCoins for this transfer.`,
        variant: "destructive"
      });
      return false;
    }

    // Update balances
    this.setBalance(senderId, senderBalance - amount);
    this.setBalance(recipientId, this.getBalance(recipientId) + netAmount);

    // Add transaction record
    this.addTransaction({
      type: TransactionType.TRANSFER,
      amount: amount,
      senderId: senderId,
      recipientId: recipientId,
      fee: fee,
      description: description
    });

    // Update circulation data
    this.updateCirculationData(fee);

    toast({
      title: `${amount.toLocaleString()} DreamCoins Sent`,
      description: `${netAmount.toLocaleString()} DreamCoins were transferred after a ${fee.toLocaleString()} DreamCoins service fee.`
    });

    return true;
  }

  // Purchase gift for another user
  public purchaseGift(
    giftId: string,
    giftPrice: number,
    senderId: string,
    recipientId: string,
    giftName: string
  ): boolean {
    // Check sender's balance
    const senderBalance = this.getBalance(senderId);
    if (senderBalance < giftPrice) {
      toast({
        title: "Insufficient funds",
        description: `You need ${giftPrice.toLocaleString()} DreamCoins to purchase this gift.`,
        variant: "destructive"
      });
      return false;
    }

    // Calculate recipient's reward (50% of gift price)
    const recipientReward = Math.floor(giftPrice * (GIFT_RECIPIENT_PERCENTAGE / 100));
    
    // Deduct cost from sender
    this.setBalance(senderId, senderBalance - giftPrice);
    
    // Add reward to recipient
    this.setBalance(recipientId, this.getBalance(recipientId) + recipientReward);
    
    // System keeps the rest (50%)
    const systemFee = giftPrice - recipientReward;
    
    // Add transaction
    this.addTransaction({
      type: TransactionType.GIFT_PURCHASE,
      amount: giftPrice,
      senderId: senderId,
      recipientId: recipientId,
      fee: systemFee,
      description: `Gift: ${giftName}`,
      giftId: giftId
    });
    
    // Update circulation data
    this.updateCirculationData(systemFee);
    
    toast({
      title: "Gift Sent!",
      description: `You sent a ${giftName} worth ${giftPrice.toLocaleString()} DreamCoins.`
    });
    
    return true;
  }

  // Charge for media attachment
  public chargeForMedia(
    userId: string,
    mediaType: 'image' | 'video' | 'audio',
    recipientId?: string
  ): boolean {
    const cost = MEDIA_COSTS[mediaType];
    const userBalance = this.getBalance(userId);
    
    if (userBalance < cost) {
      toast({
        title: "Insufficient funds",
        description: `You need ${cost.toLocaleString()} DreamCoins to send this ${mediaType}.`,
        variant: "destructive"
      });
      return false;
    }
    
    // Update balance
    this.setBalance(userId, userBalance - cost);
    
    // Add transaction
    this.addTransaction({
      type: TransactionType.MEDIA_ATTACHMENT,
      amount: cost,
      senderId: userId,
      recipientId: recipientId,
      description: `${mediaType.charAt(0).toUpperCase() + mediaType.slice(1)} attachment`,
      mediaType: mediaType
    });
    
    // Update circulation data
    this.updateCirculationData(cost);
    
    toast({
      title: `${cost.toLocaleString()} DreamCoins Spent`,
      description: `You sent a ${mediaType} attachment.`
    });
    
    return true;
  }

  // Get user balance
  public getBalance(userId: string): number {
    const balanceKey = `dreamCoinBalance_${userId}`;
    const storedBalance = localStorage.getItem(balanceKey);
    return storedBalance ? parseInt(storedBalance, 10) : 0;
  }

  // Set user balance
  public setBalance(userId: string, balance: number): void {
    const balanceKey = `dreamCoinBalance_${userId}`;
    localStorage.setItem(balanceKey, balance.toString());
  }

  // Add welcome package for new user
  public giveWelcomePackage(userId: string, amount: number): void {
    this.setBalance(userId, amount);
    
    // Record transaction
    this.addTransaction({
      type: TransactionType.WELCOME_PACKAGE,
      amount: amount,
      recipientId: userId,
      description: "Welcome package for new user"
    });
    
    // Update circulation data
    this.updateCirculationFromReserve(amount);
    
    toast({
      title: "Welcome to DreamDate!",
      description: `You've received ${amount.toLocaleString()} DreamCoins as a welcome gift!`
    });
  }

  // Update circulation data when coins are sent to system reserve
  private updateCirculationData(amount: number): void {
    const circulationDataStr = localStorage.getItem(CIRCULATION_DATA_KEY);
    if (!circulationDataStr) return;
    
    const circulationData = JSON.parse(circulationDataStr);
    
    // System reserve increases, circulation decreases
    circulationData.inCirculation -= amount;
    circulationData.systemReserve += amount;
    circulationData.lastUpdated = Date.now();
    
    localStorage.setItem(CIRCULATION_DATA_KEY, JSON.stringify(circulationData));
  }
  
  // Update circulation data when coins are added to circulation from reserve
  private updateCirculationFromReserve(amount: number): void {
    const circulationDataStr = localStorage.getItem(CIRCULATION_DATA_KEY);
    if (!circulationDataStr) return;
    
    const circulationData = JSON.parse(circulationDataStr);
    
    // System reserve decreases, circulation increases
    circulationData.inCirculation += amount;
    circulationData.systemReserve -= amount;
    circulationData.lastUpdated = Date.now();
    
    localStorage.setItem(CIRCULATION_DATA_KEY, JSON.stringify(circulationData));
  }
  
  // Get circulation data
  public getCirculationData() {
    const circulationDataStr = localStorage.getItem(CIRCULATION_DATA_KEY);
    return circulationDataStr ? JSON.parse(circulationDataStr) : null;
  }
}

// Export an instance of the bank
export const dreamCoinBank = DreamCoinBank.getInstance();
