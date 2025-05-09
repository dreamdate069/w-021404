import { purchaseGift } from "./dreamCoinUtils";

// Gift categories
export enum GiftCategory {
  ROMANTIC = 'romantic',
  FUN = 'fun',
  LUXURY = 'luxury',
  SPECIAL = 'special',
  SEASONAL = 'seasonal'
}

// Gift item structure
export interface Gift {
  id: string;
  name: string;
  description: string;
  price: number;
  category: GiftCategory;
  imageUrl: string;
  animationUrl?: string; // Optional animation for premium gifts
}

// Gift catalog - preset gifts available for purchase
export const GIFT_CATALOG: Gift[] = [
  // Romantic gifts
  {
    id: 'rose-bouquet',
    name: 'Rose Bouquet',
    description: 'A beautiful bouquet of red roses',
    price: 1999,
    category: GiftCategory.ROMANTIC,
    imageUrl: '/user-uploads/gifts/rose-bouquet.png'
  },
  {
    id: 'chocolate-box',
    name: 'Chocolate Box',
    description: 'A delicious box of premium chocolates',
    price: 1499,
    category: GiftCategory.ROMANTIC,
    imageUrl: '/user-uploads/gifts/chocolate-box.png'
  },
  {
    id: 'teddy-bear',
    name: 'Teddy Bear',
    description: 'A cute teddy bear to show your affection',
    price: 2499,
    category: GiftCategory.ROMANTIC,
    imageUrl: '/user-uploads/gifts/teddy-bear.png'
  },
  
  // Fun gifts
  {
    id: 'party-popper',
    name: 'Party Popper',
    description: 'Celebrate good times!',
    price: 999,
    category: GiftCategory.FUN,
    imageUrl: '/user-uploads/gifts/party-popper.png',
    animationUrl: '/user-uploads/gifts/animations/party-popper.gif'
  },
  {
    id: 'game-controller',
    name: 'Game Controller',
    description: 'For the gamer in your life',
    price: 1999,
    category: GiftCategory.FUN,
    imageUrl: '/user-uploads/gifts/game-controller.png'
  },
  
  // Luxury gifts
  {
    id: 'diamond-ring',
    name: 'Diamond Ring',
    description: 'Show your commitment with this virtual diamond ring',
    price: 9999,
    category: GiftCategory.LUXURY,
    imageUrl: '/user-uploads/gifts/diamond-ring.png',
    animationUrl: '/user-uploads/gifts/animations/diamond-ring.gif'
  },
  {
    id: 'sports-car',
    name: 'Sports Car',
    description: 'A virtual luxury sports car',
    price: 7999,
    category: GiftCategory.LUXURY,
    imageUrl: '/user-uploads/gifts/sports-car.png'
  },
  {
    id: 'yacht',
    name: 'Luxury Yacht',
    description: 'A virtual luxury yacht for virtual sailing',
    price: 14999,
    category: GiftCategory.LUXURY,
    imageUrl: '/user-uploads/gifts/yacht.png'
  },
  
  // Special gifts
  {
    id: 'vip-badge',
    name: 'VIP Badge',
    description: 'Show your special status with this VIP badge',
    price: 4999,
    category: GiftCategory.SPECIAL,
    imageUrl: '/user-uploads/gifts/vip-badge.png',
    animationUrl: '/user-uploads/gifts/animations/vip-badge.gif'
  },
  
  // Seasonal gifts (can be updated based on time of year)
  {
    id: 'birthday-cake',
    name: 'Birthday Cake',
    description: 'Celebrate a birthday!',
    price: 2499,
    category: GiftCategory.SEASONAL,
    imageUrl: '/user-uploads/gifts/birthday-cake.png',
    animationUrl: '/user-uploads/gifts/animations/birthday-cake.gif'
  }
];

/**
 * Get all available gifts
 */
export const getAllGifts = (): Gift[] => {
  return GIFT_CATALOG;
};

/**
 * Get gifts by category
 */
export const getGiftsByCategory = (category: GiftCategory): Gift[] => {
  return GIFT_CATALOG.filter(gift => gift.category === category);
};

/**
 * Get a specific gift by ID
 */
export const getGiftById = (giftId: string): Gift | undefined => {
  return GIFT_CATALOG.find(gift => gift.id === giftId);
};

/**
 * Send a gift to a user
 */
export const sendGift = (giftId: string, recipientId: string): boolean => {
  const gift = getGiftById(giftId);
  
  if (!gift) {
    return false;
  }
  
  // Updated to match the parameter order expected by purchaseGift
  return purchaseGift('current-user', giftId, recipientId);
};
