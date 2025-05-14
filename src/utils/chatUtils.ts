import { v4 as uuidv4 } from 'uuid';
import { Message, Conversation, MessageType, ChatParticipant } from '@/types/chat';
import { DreamCoinBank } from './DreamCoinBank';
import { storeFile, FileType } from './fileStorage';
import { getMemberById } from '@/data/members';

// Get user data from members data
const createChatParticipant = (userId: string): ChatParticipant => {
  if (userId === 'current-user') {
    return {
      id: 'current-user',
      name: 'You',
      profilePic: '/placeholder.svg',
      online: true,
      bio: 'This is your profile'
    };
  }
  
  const member = getMemberById(userId.replace('user-', ''));
  if (member) {
    return {
      id: userId,
      name: member.name,
      profilePic: member.image,
      online: member.online,
      lastActive: member.lastActive,
      bio: member.bio || `Hi, I'm ${member.name}! Let's chat.`
    };
  }
  
  return {
    id: userId,
    name: 'Unknown User',
    profilePic: '/placeholder.svg',
    online: false,
    bio: 'No information available'
  };
};

// Mock users data - now derived from member data
const USERS: Record<string, ChatParticipant> = {
  'user-1': createChatParticipant('user-1'),
  'user-2': createChatParticipant('user-2'),
  'user-3': createChatParticipant('user-3'),
  'current-user': createChatParticipant('current-user')
};

// Mock conversations data
let CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    participants: ['current-user', 'user-1'],
    unreadCount: 0,
    updatedAt: Date.now() - 1000 * 60 * 10 // 10 minutes ago
  },
  {
    id: 'conv-2',
    participants: ['current-user', 'user-2'],
    unreadCount: 2,
    updatedAt: Date.now() - 1000 * 60 * 60 // 1 hour ago
  },
  {
    id: 'conv-3',
    participants: ['current-user', 'user-3'],
    unreadCount: 0,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 // 1 day ago
  }
];

// Mock messages data
let MESSAGES: Record<string, Message[]> = {
  'conv-1': [
    {
      id: uuidv4(),
      conversationId: 'conv-1',
      senderId: 'user-1',
      content: 'Hey, how are you doing?',
      timestamp: Date.now() - 1000 * 60 * 30, // 30 minutes ago
      read: true,
      type: MessageType.TEXT
    },
    {
      id: uuidv4(),
      conversationId: 'conv-1',
      senderId: 'current-user',
      content: 'I\'m good! Just checking out this new chat feature.',
      timestamp: Date.now() - 1000 * 60 * 25, // 25 minutes ago
      read: true,
      type: MessageType.TEXT
    },
    {
      id: uuidv4(),
      conversationId: 'conv-1',
      senderId: 'user-1',
      content: 'It looks amazing! Love the design.',
      timestamp: Date.now() - 1000 * 60 * 20, // 20 minutes ago
      read: true,
      type: MessageType.TEXT
    }
  ],
  'conv-2': [
    {
      id: uuidv4(),
      conversationId: 'conv-2',
      senderId: 'user-2',
      content: 'Did you see the latest update?',
      timestamp: Date.now() - 1000 * 60 * 120, // 2 hours ago
      read: false,
      type: MessageType.TEXT
    },
    {
      id: uuidv4(),
      conversationId: 'conv-2',
      senderId: 'user-2',
      content: 'They added DreamCoins and gifts!',
      timestamp: Date.now() - 1000 * 60 * 115, // 115 minutes ago
      read: false,
      type: MessageType.TEXT
    }
  ],
  'conv-3': [
    {
      id: uuidv4(),
      conversationId: 'conv-3',
      senderId: 'current-user',
      content: 'Hey Emma, are you free this weekend?',
      timestamp: Date.now() - 1000 * 60 * 60 * 25, // 25 hours ago
      read: true,
      type: MessageType.TEXT
    },
    {
      id: uuidv4(),
      conversationId: 'conv-3',
      senderId: 'user-3',
      content: 'Yes! What are you thinking?',
      timestamp: Date.now() - 1000 * 60 * 60 * 24, // 24 hours ago
      read: true,
      type: MessageType.TEXT
    }
  ]
};

// Initialize last messages
const updateLastMessages = () => {
  CONVERSATIONS = CONVERSATIONS.map(conv => {
    const messages = MESSAGES[conv.id] || [];
    const lastMessage = messages.length > 0 ? messages[messages.length - 1] : undefined;
    return {
      ...conv,
      lastMessage
    };
  });
};

// Initialize the chat system
export const initializeChatSystem = () => {
  updateLastMessages();
  console.log('Chat system initialized');
};

// Get user by ID
export const getUserById = (userId: string): ChatParticipant => {
  return USERS[userId] || createChatParticipant(userId);
};

// Get conversations for current user
export const getUserConversations = (): Conversation[] => {
  return CONVERSATIONS
    .filter(conv => conv.participants.includes('current-user'))
    .sort((a, b) => b.updatedAt - a.updatedAt);
};

// Get messages for a conversation
export const getConversationMessages = (conversationId: string): Message[] => {
  return MESSAGES[conversationId] || [];
};

// Mark conversation as read
export const markConversationAsRead = (conversationId: string) => {
  CONVERSATIONS = CONVERSATIONS.map(conv => {
    if (conv.id === conversationId) {
      return { ...conv, unreadCount: 0 };
    }
    return conv;
  });
  
  if (MESSAGES[conversationId]) {
    MESSAGES[conversationId] = MESSAGES[conversationId].map(msg => {
      if (msg.senderId !== 'current-user') {
        return { ...msg, read: true };
      }
      return msg;
    });
  }
  
  updateLastMessages();
};

// Send a text message
export const sendTextMessage = (conversationId: string, content: string): Message => {
  const newMessage: Message = {
    id: uuidv4(),
    conversationId,
    senderId: 'current-user',
    content,
    timestamp: Date.now(),
    read: false,
    type: MessageType.TEXT
  };
  
  if (!MESSAGES[conversationId]) {
    MESSAGES[conversationId] = [];
  }
  
  MESSAGES[conversationId].push(newMessage);
  
  // Update conversation
  CONVERSATIONS = CONVERSATIONS.map(conv => {
    if (conv.id === conversationId) {
      return {
        ...conv,
        lastMessage: newMessage,
        updatedAt: newMessage.timestamp
      };
    }
    return conv;
  });
  
  updateLastMessages();
  return newMessage;
};

// Send a media message
export const sendMediaMessage = async (
  conversationId: string, 
  mediaFileOrUrl: File | string, 
  mediaType: 'image' | 'video' | 'audio'
): Promise<Message> => {
  // Map mediaType to FileType
  const fileType: FileType = 'media';
  
  // Process the media file or URL
  let mediaUrl: string;
  
  if (typeof mediaFileOrUrl === 'string') {
    // If it's already a URL string, use it directly
    mediaUrl = mediaFileOrUrl;
  } else {
    // If it's a File object, store it with UUID name
    mediaUrl = await storeFile(mediaFileOrUrl, fileType);
  }
  
  const mediaFees = {
    'image': 10,
    'video': 50,
    'audio': 5
  };
  
  // Deduct media fee
  const fee = mediaFees[mediaType];
  DreamCoinBank.getInstance().deductTransactionFee('current-user', fee, `${mediaType} upload fee`);
  
  const newMessage: Message = {
    id: uuidv4(),
    conversationId,
    senderId: 'current-user',
    content: `Sent a ${mediaType}`,
    timestamp: Date.now(),
    read: false,
    type: MessageType.MEDIA,
    mediaUrl,
    mediaType
  };
  
  if (!MESSAGES[conversationId]) {
    MESSAGES[conversationId] = [];
  }
  
  MESSAGES[conversationId].push(newMessage);
  
  // Update conversation
  CONVERSATIONS = CONVERSATIONS.map(conv => {
    if (conv.id === conversationId) {
      return {
        ...conv,
        lastMessage: newMessage,
        updatedAt: newMessage.timestamp
      };
    }
    return conv;
  });
  
  updateLastMessages();
  return newMessage;
};

// Send a gift message
export const sendGiftMessage = (conversationId: string, giftId: string, recipientId: string): Message => {
  // Get gift details and process payment
  const giftDetails = DreamCoinBank.getInstance().purchaseGift('current-user', giftId, recipientId);
  
  const newMessage: Message = {
    id: uuidv4(),
    conversationId,
    senderId: 'current-user',
    content: `Sent a gift: ${giftDetails.name}`,
    timestamp: Date.now(),
    read: false,
    type: MessageType.GIFT,
    giftId
  };
  
  if (!MESSAGES[conversationId]) {
    MESSAGES[conversationId] = [];
  }
  
  MESSAGES[conversationId].push(newMessage);
  
  // Update conversation
  CONVERSATIONS = CONVERSATIONS.map(conv => {
    if (conv.id === conversationId) {
      return {
        ...conv,
        lastMessage: newMessage,
        updatedAt: newMessage.timestamp
      };
    }
    return conv;
  });
  
  updateLastMessages();
  return newMessage;
};

// Send a coin transfer message
export const sendCoinTransferMessage = (conversationId: string, amount: number, recipientId: string): Message => {
  // Process the coin transfer
  DreamCoinBank.getInstance().transferCoins('current-user', recipientId, amount);
  
  const newMessage: Message = {
    id: uuidv4(),
    conversationId,
    senderId: 'current-user',
    content: `Sent ${amount} DreamCoins`,
    timestamp: Date.now(),
    read: false,
    type: MessageType.COIN_TRANSFER,
    coinAmount: amount
  };
  
  if (!MESSAGES[conversationId]) {
    MESSAGES[conversationId] = [];
  }
  
  MESSAGES[conversationId].push(newMessage);
  
  // Update conversation
  CONVERSATIONS = CONVERSATIONS.map(conv => {
    if (conv.id === conversationId) {
      return {
        ...conv,
        lastMessage: newMessage,
        updatedAt: newMessage.timestamp
      };
    }
    return conv;
  });
  
  // Add notification message to recipient
  const systemMessage: Message = {
    id: uuidv4(),
    conversationId,
    senderId: 'system',
    content: `You received ${amount * 0.8} DreamCoins after 20% service fee`,
    timestamp: Date.now(),
    read: false,
    type: MessageType.NOTIFICATION
  };
  
  MESSAGES[conversationId].push(systemMessage);
  
  updateLastMessages();
  return newMessage;
};

// Create a new conversation
export const createConversation = (participantId: string): Conversation => {
  const existingConversation = CONVERSATIONS.find(conv => 
    conv.participants.includes('current-user') && 
    conv.participants.includes(participantId)
  );
  
  if (existingConversation) {
    return existingConversation;
  }
  
  const newConversation: Conversation = {
    id: `conv-${uuidv4()}`,
    participants: ['current-user', participantId],
    unreadCount: 0,
    updatedAt: Date.now()
  };
  
  CONVERSATIONS.push(newConversation);
  MESSAGES[newConversation.id] = [];
  
  return newConversation;
};

// For debugging
export const getCurrentChatState = () => {
  return {
    conversations: CONVERSATIONS,
    messages: MESSAGES,
    users: USERS
  };
};
