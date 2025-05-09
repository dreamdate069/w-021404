
export enum MessageType {
  TEXT = 'text',
  MEDIA = 'media',
  GIFT = 'gift',
  COIN_TRANSFER = 'coin_transfer',
  SYSTEM = 'system',
  NOTIFICATION = 'notification'
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: number;
  read: boolean;
  type: MessageType;
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'audio';
  giftId?: string;
  coinAmount?: number;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: number;
}

export interface ChatParticipant {
  id: string;
  name: string;
  profilePic: string;
  online: boolean;
  lastActive?: string;
}
