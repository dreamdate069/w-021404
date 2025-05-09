import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, PaperclipIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from "@/hooks/use-toast";
import DreamCoinBalance from '@/components/DreamCoinBalance';
import VideoChat from '@/components/VideoChat';
import ChatSidebar from '@/components/ChatSidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import MediaUploader from '@/components/MediaUploader';
import GiftSelector from '@/components/GiftSelector';
import CoinTransfer from '@/components/CoinTransfer';
import MessageBubble from '@/components/MessageBubble';
import { 
  getDreamCoinBalance, 
  deductMessageCost, 
  MESSAGE_COST 
} from '@/utils/dreamCoinUtils';

// Safe URL creator for media files
const createUploadUrl = (file: File): { url: string, thumbnailUrl?: string } => {
  // This is a mock function for demonstration purposes
  // In a real application, you'd upload to Supabase or another storage service
  // and get back a URL
  const mockUrl = `/user-uploads/media/${file.name.replace(/\s+/g, '-')}`;
  
  // For images and videos, generate a thumbnail URL (same for now)
  if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
    return {
      url: mockUrl,
      thumbnailUrl: mockUrl
    };
  }
  
  return { url: mockUrl };
};

// The placeholder conversations from the original file with the required structure
// In a real app, these would come from your backend
const SAMPLE_CONVERSATIONS: Conversation[] = [{
  id: '1',
  participants: ['current-user', 'jessica'],
  lastMessage: {
    id: '4',
    conversationId: '1',
    sender: 'jessica',
    receiver: 'current-user',
    type: MessageType.TEXT,
    content: "Hey there! How's your day going so far?",
    timestamp: Date.now() - 3600000, // 1 hour ago
    isRead: false
  },
  unreadCount: 2,
  createdAt: Date.now() - 86400000, // 1 day ago
  updatedAt: Date.now() - 3600000,
  isActive: true
}, {
  id: '2',
  participants: ['current-user', 'michael'],
  lastMessage: {
    id: 'm2',
    conversationId: '2',
    sender: 'michael',
    receiver: 'current-user',
    type: MessageType.TEXT,
    content: 'That sounds like an amazing trip!',
    timestamp: Date.now() - 86400000, // 1 day ago
    isRead: true
  },
  unreadCount: 0,
  createdAt: Date.now() - 172800000, // 2 days ago
  updatedAt: Date.now() - 86400000,
  isActive: true
}, {
  id: '3',
  participants: ['current-user', 'emma'],
  lastMessage: {
    id: 'm3',
    conversationId: '3',
    sender: 'emma',
    receiver: 'current-user',
    type: MessageType.TEXT,
    content: 'Would you like to meet for coffee this weekend?',
    timestamp: Date.now() - 86400000, // 1 day ago
    isRead: false
  },
  unreadCount: 1,
  createdAt: Date.now() - 259200000, // 3 days ago
  updatedAt: Date.now() - 86400000,
  isActive: true
}, {
  id: '4',
  participants: ['current-user', 'olivia'],
  lastMessage: {
    id: 'm4',
    conversationId: '4',
    sender: 'olivia',
    receiver: 'current-user',
    type: MessageType.TEXT,
    content: 'Thanks for the restaurant recommendation!',
    timestamp: Date.now() - 172800000, // 2 days ago
    isRead: true
  },
  unreadCount: 0,
  createdAt: Date.now() - 345600000, // 4 days ago
  updatedAt: Date.now() - 172800000,
  isActive: true
}];

// Placeholder messages for the initial conversation
const SAMPLE_MESSAGES: Message[] = [{
  id: '1',
  conversationId: '1',
  sender: 'jessica',
  receiver: 'current-user',
  type: MessageType.TEXT,
  content: "Hey there! I noticed we have a lot in common. How's your day going?",
  timestamp: Date.now() - 86400000, // 1 day ago
  isRead: true
}, {
  id: '2',
  conversationId: '1',
  sender: 'current-user',
  receiver: 'jessica',
  type: MessageType.TEXT,
  content: "Hi Jessica! It's going well, thanks for asking. I'm just finishing up some work. How about you?",
  timestamp: Date.now() - 82800000, // 23 hours ago
  isRead: true
}, {
  id: '3',
  conversationId: '1',
  sender: 'jessica',
  receiver: 'current-user',
  type: MessageType.TEXT,
  content: 'Pretty good! I just got back from a hike with my dog. Do you like hiking too?',
  timestamp: Date.now() - 7200000, // 2 hours ago
  isRead: true
}, {
  id: '4',
  conversationId: '1',
  sender: 'jessica',
  receiver: 'current-user',
  type: MessageType.TEXT,
  content: 'I saw in your profile you enjoy outdoor activities!',
  timestamp: Date.now() - 3600000, // 1 hour ago
  isRead: false
}];

// User data mapping for the sample conversations
const USERS: Record<string, { name: string, image: string, online: boolean }> = {
  'jessica': {
    name: 'Jessica',
    image: '/lovable-uploads/6d9b54c2-64d4-44f3-959b-b0c71fff7a04.png',
    online: true
  },
  'michael': {
    name: 'Michael',
    image: '/placeholder.svg',
    online: false
  },
  'emma': {
    name: 'Emma',
    image: '/placeholder.svg',
    online: true
  },
  'olivia': {
    name: 'Olivia',
    image: '/lovable-uploads/7973c816-d414-4bfa-b312-1407036a6e21.png',
    online: false
  }
};

const MessagesPage = () => {
  const { toast } = useToast();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [isVideoMode, setIsVideoMode] = useState(false);
  const [dreamCoinBalance, setDreamCoinBalance] = useState(0);
  const [isFriend, setIsFriend] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isGiftSelectorOpen, setIsGiftSelectorOpen] = useState(false);
  const [isCoinTransferOpen, setIsCoinTransferOpen] = useState(false);
  const [isMediaUploaderOpen, setIsMediaUploaderOpen] = useState(false);
  
  // Ref for message container to auto-scroll
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize chat system on mount
  useEffect(() => {
    initializeChatSystem();
    
    // Load sample data into localStorage for demo purposes
    // In a real app, you'd fetch this from your backend
    if (localStorage.getItem('dreamDate_conversations') === null) {
      localStorage.setItem('dreamDate_conversations', JSON.stringify(SAMPLE_CONVERSATIONS));
    }
    
    if (localStorage.getItem('dreamDate_messages') === null) {
      localStorage.setItem('dreamDate_messages', JSON.stringify(SAMPLE_MESSAGES));
    }
    
    // Load user's conversations
    const userConversations = getUserConversations();
    setConversations(userConversations);
    
    // Select the first conversation by default
    if (userConversations.length > 0) {
      const firstConversation = userConversations[0];
      setSelectedConversation(firstConversation);
      
      // Load messages for this conversation
      const conversationMessages = getConversationMessages(firstConversation.id);
      setMessages(conversationMessages);
      
      // Mark conversation as read
      markConversationAsRead(firstConversation.id);
    }
    
    // Load dreamcoin balance
    const balance = getDreamCoinBalance();
    setDreamCoinBalance(balance);
  }, []);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleToggleFriend = () => {
    setIsFriend(!isFriend);
    
    toast({
      title: isFriend ? "Removed from friends" : "Added to friends",
      description: isFriend 
        ? "You've removed this user from your friends list." 
        : "You've added this user to your friends list."
    });
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() && !selectedFile) return;
    if (!selectedConversation) return;
    
    const otherParticipant = selectedConversation.participants.find(
      p => p !== 'current-user'
    );
    
    if (!otherParticipant) return;
    
    // If there's a file to send
    if (selectedFile) {
      // Determine media type
      let mediaType: 'image' | 'video' | 'audio';
      if (selectedFile.type.startsWith('image/')) {
        mediaType = 'image';
      } else if (selectedFile.type.startsWith('video/')) {
        mediaType = 'video';
      } else {
        mediaType = 'audio';
      }
      
      // In a real app, you'd upload the file here and get a URL
      const { url, thumbnailUrl } = createUploadUrl(selectedFile);
      
      // Send the media message
      const newMessage = sendMediaMessage(
        selectedConversation.id,
        'current-user',
        otherParticipant,
        mediaType,
        url,
        messageInput,
        thumbnailUrl
      );
      
      if (newMessage) {
        // Add the message to the UI
        setMessages([...messages, newMessage]);
        
        // Clear inputs
        setMessageInput('');
        setSelectedFile(null);
        setIsMediaUploaderOpen(false);
        
        // Update balance
        setDreamCoinBalance(getDreamCoinBalance());
        
        // Refresh conversation list for updated timestamp and last message
        const updatedConversations = getUserConversations();
        setConversations(updatedConversations);
      }
      
      return;
    }
    
    // Otherwise, send a text message
    const newMessage = sendTextMessage(
      selectedConversation.id,
      'current-user',
      otherParticipant,
      messageInput
    );
    
    if (newMessage) {
      // Add the message to the UI
      setMessages([...messages, newMessage]);
      setMessageInput('');
      
      // Update balance
      setDreamCoinBalance(getDreamCoinBalance());
      
      // Refresh conversation list for updated timestamp and last message
      const updatedConversations = getUserConversations();
      setConversations(updatedConversations);
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessageInput(prev => prev + emoji);
  };
  
  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };
  
  const handleImageAttach = () => {
    setIsMediaUploaderOpen(!isMediaUploaderOpen);
  };
  
  const handleGiftSelect = (giftId: string) => {
    if (!selectedConversation) return;
    
    const otherParticipant = selectedConversation.participants.find(
      p => p !== 'current-user'
    );
    
    if (!otherParticipant) return;
    
    // Send gift message
    const newMessage = sendGiftMessage(
      selectedConversation.id,
      'current-user',
      otherParticipant,
      giftId,
      messageInput
    );
    
    if (newMessage) {
      // Add the message to the UI
      setMessages([...messages, newMessage]);
      
      // Clear message input
      setMessageInput('');
      
      // Update balance
      setDreamCoinBalance(getDreamCoinBalance());
      
      // Refresh conversation list for updated timestamp and last message
      const updatedConversations = getUserConversations();
      setConversations(updatedConversations);
    }
  };
  
  const handleCoinTransfer = (amount: number, transferMessage: string) => {
    if (!selectedConversation) return;
    
    const otherParticipant = selectedConversation.participants.find(
      p => p !== 'current-user'
    );
    
    if (!otherParticipant) return;
    
    // Send coin transfer message
    const newMessage = sendCoinTransferMessage(
      selectedConversation.id,
      'current-user',
      otherParticipant,
      amount,
      transferMessage
    );
    
    if (newMessage) {
      // Add the message to the UI
      setMessages([...messages, newMessage]);
      
      // Update balance
      setDreamCoinBalance(getDreamCoinBalance());
      
      // Refresh conversation list for updated timestamp and last message
      const updatedConversations = getUserConversations();
      setConversations(updatedConversations);
    }
  };
  
  const handleConversationSelect = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    
    // Load messages for this conversation
    const conversationMessages = getConversationMessages(conversation.id);
    setMessages(conversationMessages);
    
    // Mark conversation as read
    markConversationAsRead(conversation.id);
    
    // Refresh conversation list (for unread count)
    const updatedConversations = getUserConversations();
    setConversations(updatedConversations);
    
    // Reset UI states
    setIsMediaUploaderOpen(false);
    setSelectedFile(null);
  };
  
  // Get user info for the selected conversation
  const getOtherParticipantInfo = () => {
    if (!selectedConversation) return null;
    
    const otherParticipantId = selectedConversation.participants.find(
      p => p !== 'current-user'
    );
    
    if (!otherParticipantId) return null;
    
    return USERS[otherParticipantId] || {
      name: 'Unknown User',
      image: '/placeholder.svg',
      online: false
    };
  };
  
  const otherParticipant = getOtherParticipantInfo();
  
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Conversations sidebar */}
      <div className="w-full md:w-80 border-r border-zinc-800 overflow-y-auto bg-zinc-900">
        <div className="p-4 border-b border-zinc-800">
          <h2 className="text-xl font-bold text-white mb-4">Messages</h2>
          <div className="relative">
            <Input placeholder="Search messages..." className="pl-10 bg-zinc-800 border-zinc-700 text-white" />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          </div>
        </div>
        
        <div>
          {conversations.map(conversation => {
            // Get the other participant's info
            const otherParticipantId = conversation.participants.find(
              p => p !== 'current-user'
            );
            const user = otherParticipantId && USERS[otherParticipantId];
            if (!user) return null; // Skip if user not found
            
            // Format the time
            const time = conversation.lastMessage 
              ? new Date(conversation.lastMessage.timestamp).toLocaleString([], {
                  hour: 'numeric',
                  minute: '2-digit',
                  month: 'short',
                  day: 'numeric',
                })
              : '';
            
            // Get last message preview based on type
            let lastMessagePreview = '';
            if (conversation.lastMessage) {
              switch(conversation.lastMessage.type) {
                case MessageType.TEXT:
                  lastMessagePreview = conversation.lastMessage.content;
                  break;
                case MessageType.IMAGE:
                  lastMessagePreview = '📷 Image';
                  break;
                case MessageType.VIDEO:
                  lastMessagePreview = '🎥 Video';
                  break;
                case MessageType.AUDIO:
                  lastMessagePreview = '🔊 Audio';
                  break;
                case MessageType.GIFT:
                  lastMessagePreview = '🎁 Gift';
                  break;
                case MessageType.COINS:
                  lastMessagePreview = '💰 DreamCoins';
                  break;
                default:
                  lastMessagePreview = 'New message';
              }
            }
            
            return (
              <div 
                key={conversation.id} 
                className={`flex items-center gap-3 p-4 hover:bg-zinc-800 cursor-pointer ${selectedConversation?.id === conversation.id ? 'bg-zinc-800' : ''}`} 
                onClick={() => handleConversationSelect(conversation)}
              >
                <div className="relative">
                  <img src={user.image} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
                  {user.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="text-white font-medium truncate">{user.name}</h3>
                    <span className="text-xs text-zinc-400">{time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-zinc-400 text-sm truncate">{lastMessagePreview}</p>
                    {conversation.unreadCount > 0 && (
                      <span className="ml-2 bg-custom-pink text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 flex flex-col">
        {selectedConversation && otherParticipant ? (
          <>
            {/* Header */}
            <div className="border-b border-zinc-800 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={otherParticipant.image} alt={otherParticipant.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h3 className="text-white font-medium">{otherParticipant.name}</h3>
                  <span className="text-xs text-zinc-400">
                    {otherParticipant.online ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <DreamCoinBalance balance={dreamCoinBalance} />
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-zinc-400">{isVideoMode ? 'Video' : 'Text'}</span>
                  <Switch 
                    checked={isVideoMode} 
                    onCheckedChange={setIsVideoMode} 
                    className="data-[state=checked]:bg-custom-pink border border-custom-pink hover:border-custom-pink/80 text-[#e80ce8]" 
                  />
                </div>
              </div>
            </div>
            
            {/* Messages or Video Chat - with animation */}
            <div className="flex-1 relative overflow-hidden">
              <div 
                className={`absolute inset-0 transition-opacity duration-300 ${isVideoMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                style={{ zIndex: isVideoMode ? 0 : 1 }}
              >
                <ScrollArea className="h-full">
                  <div className="flex-1 p-4 space-y-4 h-full">
                    {messages.map(message => (
                      <MessageBubble 
                        key={message.id} 
                        message={message} 
                        isCurrentUser={message.sender === 'current-user'} 
                      />
                    ))}
                    <div ref={messagesEndRef} />
                    
                    {/* Media uploader */}
                    {isMediaUploaderOpen && (
                      <div className="mb-4 animate-fade-in">
                        <MediaUploader 
                          onFileSelect={handleFileSelect} 
                          maxSize={5 * 1024 * 1024} // 5MB limit
                        />
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
                
              <div 
                className={`absolute inset-0 transition-opacity duration-300 ${isVideoMode ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                style={{ zIndex: isVideoMode ? 1 : 0 }}
              >
                <VideoChat isActive={isVideoMode} partnerName={otherParticipant.name} />
              </div>
            </div>
            
            {/* Message input */}
            <div className="border-t border-zinc-800 p-4">
              <div className="flex flex-col">
                {!isVideoMode && (
                  <div className="mb-2 text-xs text-zinc-400 flex justify-between items-center">
                    <span>
                      Sending a message costs <span className="text-custom-pink font-medium">{MESSAGE_COST.toLocaleString()} DreamCoins</span>
                    </span>
                    <span>
                      Balance: <span className="text-white font-medium">{dreamCoinBalance.toLocaleString()} DreamCoins</span>
                    </span>
                  </div>
                )}
                <div className="flex gap-2">
                  <Input 
                    placeholder="Type a message..." 
                    className="bg-zinc-800 border-zinc-700 text-white" 
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    disabled={isVideoMode}
                  />
                  <Button 
                    className="bg-custom-pink hover:bg-custom-pink/90 border border-custom-pink"
                    onClick={handleSendMessage}
                    disabled={isVideoMode || (!messageInput.trim() && !selectedFile)}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-zinc-400">
              <p className="mb-2">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Chat Functions Sidebar */}
      <ChatSidebar 
        isFriend={isFriend} 
        onToggleFriend={handleToggleFriend}
        onEmojiSelect={handleEmojiSelect}
        onImageAttach={handleImageAttach}
        onGiftSelect={() => setIsGiftSelectorOpen(true)}
        onCoinTransfer={() => setIsCoinTransferOpen(true)}
      />
      
      {/* Gift Selector Dialog */}
      <GiftSelector 
        open={isGiftSelectorOpen}
        onOpenChange={setIsGiftSelectorOpen}
        onGiftSelect={handleGiftSelect}
        balance={dreamCoinBalance}
      />
      
      {/* Coin Transfer Dialog */}
      {selectedConversation && otherParticipant && (
        <CoinTransfer 
          open={isCoinTransferOpen}
          onOpenChange={setIsCoinTransferOpen}
          onTransfer={handleCoinTransfer}
          balance={dreamCoinBalance}
          recipientName={otherParticipant.name}
        />
      )}
    </div>
  );
};

export default MessagesPage;
