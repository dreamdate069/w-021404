
import { TransactionType, dreamCoinBank } from "./DreamCoinBank";
import { MESSAGE_COST, deductMessageCost } from "./dreamCoinUtils";
import { Gift, getGiftById } from "./giftUtils";

// Message types
export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  GIFT = 'gift',
  COINS = 'coins',
  SYSTEM = 'system'
}

// Represents a single message
export interface Message {
  id: string;
  conversationId: string;
  sender: string;
  receiver: string;
  type: MessageType;
  content: string;
  timestamp: number;
  isRead: boolean;
  attachment?: {
    type: 'image' | 'video' | 'audio';
    url: string;
    thumbnailUrl?: string;
    name?: string;
  };
  gift?: {
    giftId: string;
    name: string;
    imageUrl: string;
    animationUrl?: string;
  };
  coinTransfer?: {
    amount: number;
    fee: number;
  };
  isSending?: boolean; // For UI purposes, to show sending state
  error?: boolean; // For UI purposes, to show error state
}

// Represents a conversation between users
export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: number;
  updatedAt: number;
  isActive: boolean;
}

// Storage keys
const CONVERSATIONS_KEY = 'dreamDate_conversations';
const MESSAGES_KEY = 'dreamDate_messages';

/**
 * Get all conversations for a user
 */
export const getUserConversations = (userId: string = 'current-user'): Conversation[] => {
  const conversations = getAllConversations();
  return conversations.filter(conversation => 
    conversation.participants.includes(userId) && conversation.isActive
  );
};

/**
 * Get all conversations (admin function)
 */
export const getAllConversations = (): Conversation[] => {
  const storedConversations = localStorage.getItem(CONVERSATIONS_KEY);
  if (storedConversations) {
    return JSON.parse(storedConversations);
  }
  return [];
};

/**
 * Save all conversations
 */
const saveAllConversations = (conversations: Conversation[]): void => {
  localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(conversations));
};

/**
 * Create a new conversation
 */
export const createConversation = (participants: string[]): Conversation => {
  if (participants.length < 2) {
    throw new Error('A conversation must have at least 2 participants');
  }
  
  // Check if conversation already exists
  const existingConversation = findConversationByParticipants(participants);
  if (existingConversation) {
    // If conversation exists but was inactive, reactivate it
    if (!existingConversation.isActive) {
      existingConversation.isActive = true;
      existingConversation.updatedAt = Date.now();
      
      const conversations = getAllConversations();
      const index = conversations.findIndex(c => c.id === existingConversation.id);
      if (index !== -1) {
        conversations[index] = existingConversation;
        saveAllConversations(conversations);
      }
    }
    
    return existingConversation;
  }
  
  // Create new conversation
  const newConversation: Conversation = {
    id: `conv-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    participants: [...participants],
    unreadCount: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    isActive: true
  };
  
  const conversations = getAllConversations();
  conversations.push(newConversation);
  saveAllConversations(conversations);
  
  return newConversation;
};

/**
 * Find conversation by ID
 */
export const getConversationById = (conversationId: string): Conversation | undefined => {
  const conversations = getAllConversations();
  return conversations.find(conversation => conversation.id === conversationId);
};

/**
 * Find conversation by participants
 */
export const findConversationByParticipants = (participants: string[]): Conversation | undefined => {
  const conversations = getAllConversations();
  
  // Sort participants to ensure consistent matching
  const sortedParticipants = [...participants].sort();
  
  return conversations.find(conversation => {
    // If participant count doesn't match, it's not the same conversation
    if (conversation.participants.length !== sortedParticipants.length) {
      return false;
    }
    
    // Check if all participants match
    const sortedConvParticipants = [...conversation.participants].sort();
    return sortedConvParticipants.every((participant, index) => 
      participant === sortedParticipants[index]
    );
  });
};

/**
 * Update last message in conversation
 */
const updateConversationLastMessage = (conversationId: string, message: Message): void => {
  const conversations = getAllConversations();
  const index = conversations.findIndex(conv => conv.id === conversationId);
  
  if (index !== -1) {
    conversations[index].lastMessage = message;
    conversations[index].updatedAt = Date.now();
    
    // Increment unread count for the recipient
    if (message.sender !== message.receiver) {
      conversations[index].unreadCount++;
    }
    
    saveAllConversations(conversations);
  }
};

/**
 * Mark conversation as read
 */
export const markConversationAsRead = (conversationId: string, userId: string = 'current-user'): void => {
  const conversations = getAllConversations();
  const index = conversations.findIndex(conv => conv.id === conversationId);
  
  if (index !== -1) {
    conversations[index].unreadCount = 0;
    saveAllConversations(conversations);
    
    // Also mark all messages as read
    const messages = getConversationMessages(conversationId);
    const updatedMessages = messages.map(message => {
      if (message.receiver === userId && !message.isRead) {
        return { ...message, isRead: true };
      }
      return message;
    });
    
    saveAllMessages(updatedMessages);
  }
};

/**
 * Soft delete a conversation (mark as inactive)
 */
export const deleteConversation = (conversationId: string): boolean => {
  const conversations = getAllConversations();
  const index = conversations.findIndex(conv => conv.id === conversationId);
  
  if (index !== -1) {
    conversations[index].isActive = false;
    saveAllConversations(conversations);
    return true;
  }
  
  return false;
};

/**
 * Get all messages
 */
export const getAllMessages = (): Message[] => {
  const storedMessages = localStorage.getItem(MESSAGES_KEY);
  if (storedMessages) {
    return JSON.parse(storedMessages);
  }
  return [];
};

/**
 * Save all messages
 */
const saveAllMessages = (messages: Message[]): void => {
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
};

/**
 * Get messages for a conversation
 */
export const getConversationMessages = (conversationId: string): Message[] => {
  const allMessages = getAllMessages();
  return allMessages.filter(message => message.conversationId === conversationId)
    .sort((a, b) => a.timestamp - b.timestamp);
};

/**
 * Send a text message
 */
export const sendTextMessage = (
  conversationId: string, 
  sender: string = 'current-user',
  receiver: string,
  content: string
): Message | null => {
  // Check if conversation exists
  const conversation = getConversationById(conversationId);
  if (!conversation) {
    return null;
  }
  
  // Try to deduct the message cost
  if (!deductMessageCost(sender)) {
    return null;
  }
  
  const newMessage: Message = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    conversationId,
    sender,
    receiver,
    type: MessageType.TEXT,
    content,
    timestamp: Date.now(),
    isRead: false
  };
  
  // Add message to storage
  const messages = getAllMessages();
  messages.push(newMessage);
  saveAllMessages(messages);
  
  // Update conversation last message
  updateConversationLastMessage(conversationId, newMessage);
  
  return newMessage;
};

/**
 * Send a media message
 */
export const sendMediaMessage = (
  conversationId: string,
  sender: string = 'current-user',
  receiver: string,
  mediaType: 'image' | 'video' | 'audio',
  mediaUrl: string,
  content: string = '',
  thumbnailUrl?: string
): Message | null => {
  // Check if conversation exists
  const conversation = getConversationById(conversationId);
  if (!conversation) {
    return null;
  }
  
  // Get media cost from DreamCoinBank
  if (!dreamCoinBank.chargeForMedia(sender, mediaType, receiver)) {
    return null;
  }
  
  // Create the message object
  const messageType = mediaType === 'image' 
    ? MessageType.IMAGE 
    : mediaType === 'video' 
      ? MessageType.VIDEO 
      : MessageType.AUDIO;

  const newMessage: Message = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    conversationId,
    sender,
    receiver,
    type: messageType,
    content: content, // Optional caption
    timestamp: Date.now(),
    isRead: false,
    attachment: {
      type: mediaType,
      url: mediaUrl,
      thumbnailUrl: thumbnailUrl
    }
  };
  
  // Add message to storage
  const messages = getAllMessages();
  messages.push(newMessage);
  saveAllMessages(messages);
  
  // Update conversation last message
  updateConversationLastMessage(conversationId, newMessage);
  
  return newMessage;
};

/**
 * Send a gift message
 */
export const sendGiftMessage = (
  conversationId: string,
  sender: string = 'current-user',
  receiver: string,
  giftId: string,
  message: string = ''
): Message | null => {
  // Check if conversation exists
  const conversation = getConversationById(conversationId);
  if (!conversation) {
    return null;
  }
  
  // Get the gift details
  const gift = getGiftById(giftId);
  if (!gift) {
    return null;
  }
  
  // Try to purchase the gift
  if (!dreamCoinBank.purchaseGift(giftId, gift.price, sender, receiver, gift.name)) {
    return null;
  }
  
  // Create message object
  const newMessage: Message = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    conversationId,
    sender,
    receiver,
    type: MessageType.GIFT,
    content: message, // Optional message with gift
    timestamp: Date.now(),
    isRead: false,
    gift: {
      giftId: gift.id,
      name: gift.name,
      imageUrl: gift.imageUrl,
      animationUrl: gift.animationUrl
    }
  };
  
  // Add message to storage
  const messages = getAllMessages();
  messages.push(newMessage);
  saveAllMessages(messages);
  
  // Update conversation last message
  updateConversationLastMessage(conversationId, newMessage);
  
  return newMessage;
};

/**
 * Send coin transfer message
 */
export const sendCoinTransferMessage = (
  conversationId: string,
  sender: string = 'current-user',
  receiver: string,
  amount: number,
  message: string = ''
): Message | null => {
  // Check if conversation exists
  const conversation = getConversationById(conversationId);
  if (!conversation) {
    return null;
  }
  
  // Calculate fee
  const fee = Math.floor(amount * (20 / 100)); // 20% fee
  
  // Try to transfer the coins
  if (!dreamCoinBank.transferCoins(amount, sender, receiver, message || 'Coin transfer')) {
    return null;
  }
  
  // Create message object
  const newMessage: Message = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    conversationId,
    sender,
    receiver,
    type: MessageType.COINS,
    content: message || `Sent ${amount.toLocaleString()} DreamCoins`,
    timestamp: Date.now(),
    isRead: false,
    coinTransfer: {
      amount,
      fee
    }
  };
  
  // Add message to storage
  const messages = getAllMessages();
  messages.push(newMessage);
  saveAllMessages(messages);
  
  // Update conversation last message
  updateConversationLastMessage(conversationId, newMessage);
  
  return newMessage;
};

/**
 * Get all unread message count for a user
 */
export const getUnreadMessageCount = (userId: string = 'current-user'): number => {
  const conversations = getUserConversations(userId);
  return conversations.reduce((total, conversation) => total + conversation.unreadCount, 0);
};

/**
 * Initialize the chat system
 */
export const initializeChatSystem = (): void => {
  // Check if conversations exist, if not create an empty array
  if (!localStorage.getItem(CONVERSATIONS_KEY)) {
    localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify([]));
  }
  
  // Check if messages exist, if not create an empty array
  if (!localStorage.getItem(MESSAGES_KEY)) {
    localStorage.setItem(MESSAGES_KEY, JSON.stringify([]));
  }
};
