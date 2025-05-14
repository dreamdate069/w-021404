
import { GiftItem } from './types';

// Available gift items
export const GIFT_ITEMS: GiftItem[] = [
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
