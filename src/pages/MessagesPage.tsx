import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { MessageSquare, Send, Phone, VideoIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MediaUploader from '@/components/MediaUploader';
import ChatSidebar from '@/components/ChatSidebar';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import GiftSelector from '@/components/GiftSelector';
import CoinTransfer from '@/components/CoinTransfer';
import { Conversation, Message, MessageType } from '@/types/chat';
import {
  initializeChatSystem,
  getUserById,
  getUserConversations,
  getConversationMessages,
  markConversationAsRead,
  sendTextMessage,
  sendMediaMessage,
  sendGiftMessage,
  sendCoinTransferMessage
} from '@/utils/chatUtils';
import { getUserBalance } from '@/utils/dreamCoinUtils';

const MessagesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  
  // State
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [currentUserId] = useState('current-user');
  const [showGiftSelector, setShowGiftSelector] = useState(false);
  const [showCoinTransfer, setShowCoinTransfer] = useState(false);
  const [showMediaUploader, setShowMediaUploader] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  
  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Sample conversation data
  const exampleConversations: Conversation[] = [
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
  
  // Sample message data
  const exampleMessages: Message[] = [
    {
      id: '1',
      conversationId: 'conv-1',
      senderId: 'user-1',
      content: 'Hey, how are you doing?',
      timestamp: Date.now() - 1000 * 60 * 30, // 30 minutes ago
      read: true,
      type: MessageType.TEXT
    },
    {
      id: '2',
      conversationId: 'conv-1',
      senderId: 'current-user',
      content: 'I\'m good! Just checking out this new chat feature.',
      timestamp: Date.now() - 1000 * 60 * 25, // 25 minutes ago
      read: true,
      type: MessageType.TEXT
    },
    {
      id: '3',
      conversationId: 'conv-1',
      senderId: 'user-1',
      content: 'It looks amazing! Love the design.',
      timestamp: Date.now() - 1000 * 60 * 20, // 20 minutes ago
      read: true,
      type: MessageType.TEXT
    }
  ];

  // Initialize chat
  useEffect(() => {
    // Initialize chat system
    initializeChatSystem();
    
    // Load conversations
    loadConversations();
    
    // Check URL for conversation ID
    const urlUserId = searchParams.get('userId');
    if (urlUserId) {
      // Find or create conversation with this user
      const conversation = exampleConversations.find(
        c => c.participants.includes(urlUserId)
      );
      
      if (conversation) {
        setSelectedConversationId(conversation.id);
        loadMessages(conversation.id);
      }
    }
  }, [searchParams]);
  
  // Load conversations
  const loadConversations = () => {
    const userConversations = getUserConversations();
    setConversations(userConversations);
    
    if (userConversations.length > 0 && !selectedConversationId) {
      setSelectedConversationId(userConversations[0].id);
      loadMessages(userConversations[0].id);
    }
  };
  
  // Load messages for selected conversation
  const loadMessages = (conversationId: string) => {
    const conversationMessages = getConversationMessages(conversationId);
    setMessages(conversationMessages);
    
    // Mark conversation as read
    markConversationAsRead(conversationId);
    
    // Update conversations list (to reflect read status)
    const updatedConversations = getUserConversations();
    setConversations(updatedConversations);
    
    // Scroll to bottom of messages
    setTimeout(() => scrollToBottom(), 100);
  };
  
  // Get other participant in conversation
  const getOtherParticipant = (conversation: Conversation) => {
    const otherParticipantId = conversation.participants.find(
      id => id !== currentUserId
    );
    return otherParticipantId ? getUserById(otherParticipantId) : null;
  };
  
  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Handle file select 
  const handleFileSelect = (file: File) => {
    if (!selectedConversationId) return;
    
    // Create object URL for preview
    const fileUrl = URL.createObjectURL(file);
    
    // Determine media type
    let mediaType: 'image' | 'video' | 'audio' = 'image';
    if (file.type.startsWith('video/')) {
      mediaType = 'video';
    } else if (file.type.startsWith('audio/')) {
      mediaType = 'audio';
    }
    
    // In a real app, we would upload the file to a server here
    // For now, we'll just use the object URL
    sendMediaMessage(selectedConversationId, fileUrl, mediaType);
    
    // Refresh conversations and messages
    loadConversations();
    loadMessages(selectedConversationId);
    
    // Hide media uploader
    setShowMediaUploader(false);
    
    toast({
      title: "Media sent",
      description: `Your ${mediaType} has been sent`
    });
  };
  
  // Handle send message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!messageInput.trim() || !selectedConversationId) return;
    
    // Send message
    sendTextMessage(selectedConversationId, messageInput);
    
    // Clear input
    setMessageInput('');
    
    // Refresh conversations and messages
    loadConversations();
    loadMessages(selectedConversationId);
    
    // Scroll to bottom
    setTimeout(() => scrollToBottom(), 100);
  };
  
  // Handle gift selection
  const handleGiftSelect = (giftId: string) => {
    if (!selectedConversationId) return;
    
    try {
      // Get other participant
      const conversation = conversations.find(c => c.id === selectedConversationId);
      if (!conversation) return;
      
      const otherParticipant = getOtherParticipant(conversation);
      if (!otherParticipant) return;
      
      // Send gift
      sendGiftMessage(selectedConversationId, giftId, otherParticipant.id);
      
      // Refresh conversations and messages
      loadConversations();
      loadMessages(selectedConversationId);
      
      // Hide gift selector
      setShowGiftSelector(false);
      
      toast({
        title: "Gift sent",
        description: "Your gift has been delivered!"
      });
    } catch (error) {
      toast({
        title: "Error sending gift",
        description: (error as Error).message,
        variant: "destructive"
      });
    }
  };
  
  // Handle coin transfer
  const handleCoinTransfer = (amount: number) => {
    if (!selectedConversationId) return;
    
    try {
      // Get other participant
      const conversation = conversations.find(c => c.id === selectedConversationId);
      if (!conversation) return;
      
      const otherParticipant = getOtherParticipant(conversation);
      if (!otherParticipant) return;
      
      // Send coins
      sendCoinTransferMessage(selectedConversationId, amount, otherParticipant.id);
      
      // Refresh conversations and messages
      loadConversations();
      loadMessages(selectedConversationId);
      
      // Hide coin transfer
      setShowCoinTransfer(false);
      
      toast({
        title: "DreamCoins sent",
        description: `You sent ${amount} DreamCoins (${amount * 0.8} after service fee)`
      });
    } catch (error) {
      toast({
        title: "Error sending DreamCoins",
        description: (error as Error).message,
        variant: "destructive"
      });
    }
  };
  
  // Render message content based on type
  const renderMessageContent = (message: Message) => {
    switch (message.type) {
      case MessageType.TEXT:
        return <p>{message.content}</p>;
      
      case MessageType.MEDIA:
        if (message.mediaType === 'image') {
          return (
            <div className="mt-2">
              <img 
                src={message.mediaUrl} 
                alt="Image" 
                className="max-w-[200px] rounded-lg" 
              />
            </div>
          );
        } else if (message.mediaType === 'video') {
          return (
            <div className="mt-2">
              <video 
                src={message.mediaUrl} 
                controls 
                className="max-w-[200px] rounded-lg" 
              />
            </div>
          );
        } else if (message.mediaType === 'audio') {
          return (
            <div className="mt-2">
              <audio 
                src={message.mediaUrl} 
                controls 
                className="max-w-[200px]" 
              />
            </div>
          );
        }
        return <p>{message.content}</p>;
      
      case MessageType.GIFT:
        return (
          <div className="mt-2 flex flex-col items-center">
            <p>{message.content}</p>
            <img 
              src="/user-uploads/gifts/heart.png" 
              alt="Gift" 
              className="w-24 h-24 mt-2" 
            />
          </div>
        );
      
      case MessageType.COIN_TRANSFER:
        return (
          <div className="mt-2">
            <p className="font-medium">{message.content}</p>
            <p className="text-sm text-zinc-400">
              Transaction ID: {message.id.slice(0, 8)}...
            </p>
          </div>
        );
      
      case MessageType.NOTIFICATION:
      case MessageType.SYSTEM:
        return <p className="text-sm text-zinc-400">{message.content}</p>;
      
      default:
        return <p>{message.content}</p>;
    }
  };
  
  const selectedConversation = conversations.find(
    c => c.id === selectedConversationId
  );
  
  const otherParticipant = selectedConversation 
    ? getOtherParticipant(selectedConversation) 
    : null;
  
  return (
    <div className="h-full flex flex-col md:flex-row">
      {/* Conversations sidebar */}
      <div className="md:w-1/4 lg:w-1/5 border-r border-zinc-800 overflow-y-auto pb-20 md:pb-0">
        <div className="p-4 border-b border-zinc-800">
          <h1 className="text-2xl font-bold text-white">Messages</h1>
        </div>
        
        <div className="overflow-y-auto">
          {conversations.map(conversation => {
            const otherUser = getOtherParticipant(conversation);
            if (!otherUser) return null;
            
            return (
              <div
                key={conversation.id}
                className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-zinc-800 transition-colors ${
                  selectedConversationId === conversation.id
                    ? "bg-zinc-800"
                    : ""
                }`}
                onClick={() => {
                  setSelectedConversationId(conversation.id);
                  loadMessages(conversation.id);
                }}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={otherUser.profilePic} alt={otherUser.name} />
                    <AvatarFallback>{otherUser.name[0]}</AvatarFallback>
                  </Avatar>
                  
                  {otherUser.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-white truncate">
                      {otherUser.name}
                    </h3>
                    
                    {conversation.lastMessage && (
                      <span className="text-xs text-zinc-500">
                        {new Date(conversation.lastMessage.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    {conversation.lastMessage ? (
                      <p className="text-sm text-zinc-400 truncate">
                        {conversation.lastMessage.content}
                      </p>
                    ) : (
                      <p className="text-sm text-zinc-500 italic">No messages yet</p>
                    )}
                    
                    {conversation.unreadCount > 0 && (
                      <span className="bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-2">
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
      
      {/* Chat area */}
      <div className="flex-1 flex flex-col h-full">
        {selectedConversation && otherParticipant ? (
          <>
            {/* Chat header */}
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={otherParticipant.profilePic} alt={otherParticipant.name} />
                    <AvatarFallback>{otherParticipant.name[0]}</AvatarFallback>
                  </Avatar>
                  
                  {otherParticipant.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900" />
                  )}
                </div>
                
                <div>
                  <h2 className="font-medium text-white">{otherParticipant.name}</h2>
                  <p className="text-xs text-zinc-400">
                    {otherParticipant.online ? 'Online now' : otherParticipant.lastActive || 'Offline'}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="icon" variant="ghost">
                  <Phone size={18} />
                </Button>
                <Button size="icon" variant="ghost">
                  <VideoIcon size={18} />
                </Button>
              </div>
            </div>
            
            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => {
                const isCurrentUser = message.senderId === currentUserId;
                const isSystem = message.senderId === 'system';
                const messageUser = isCurrentUser 
                  ? getUserById(currentUserId) 
                  : (isSystem ? null : getUserById(message.senderId));
                
                if (isSystem) {
                  return (
                    <div key={message.id} className="flex justify-center">
                      <div className="bg-zinc-800 rounded-md px-4 py-2 max-w-[80%]">
                        <p className="text-sm text-zinc-400">{message.content}</p>
                      </div>
                    </div>
                  );
                }
                
                return (
                  <div
                    key={message.id}
                    className={`flex items-start gap-3 ${
                      isCurrentUser ? "flex-row-reverse" : ""
                    }`}
                  >
                    <Avatar className="mt-1">
                      <AvatarImage 
                        src={messageUser?.profilePic} 
                        alt={messageUser?.name || 'User'} 
                      />
                      <AvatarFallback>
                        {messageUser?.name?.[0] || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[70%] ${
                        isCurrentUser
                          ? "bg-rose-500 text-white"
                          : "bg-zinc-800 text-white"
                      }`}
                    >
                      {renderMessageContent(message)}
                      <div className="text-xs mt-1 opacity-70">
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Media uploader overlay */}
            {showMediaUploader && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10">
                <div className="bg-zinc-900 p-6 rounded-lg max-w-md w-full">
                  <h3 className="text-xl font-bold mb-4">Upload Media</h3>
                  <MediaUploader 
                    onFileSelect={handleFileSelect}
                    accept="image/*,video/*,audio/*"
                    maxSize={10 * 1024 * 1024} // 10MB
                  />
                  <div className="mt-4 flex justify-end">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowMediaUploader(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Gift selector overlay */}
            {showGiftSelector && (
              <GiftSelector
                open={showGiftSelector}
                onOpenChange={setShowGiftSelector}
                onGiftSelect={handleGiftSelect}
                balance={getUserBalance(currentUserId)}
                recipientName={otherParticipant.name}
                onSelect={handleGiftSelect}
                onClose={() => setShowGiftSelector(false)}
              />
            )}
            
            {/* Coin transfer overlay */}
            {showCoinTransfer && (
              <CoinTransfer
                open={showCoinTransfer}
                onOpenChange={setShowCoinTransfer}
                balance={getUserBalance(currentUserId)}
                recipientName={otherParticipant.name}
                onTransfer={handleCoinTransfer}
                onClose={() => setShowCoinTransfer(false)}
              />
            )}
            
            {/* Message input */}
            <div className="p-4 border-t border-zinc-800">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1"
                />
                <Button type="submit">
                  <Send size={18} />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
            <MessageSquare size={48} className="text-zinc-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your Messages</h2>
            <p className="text-zinc-400 mb-4">
              Select a conversation to start chatting
            </p>
            <Link to="/browse">
              <Button>Browse Profiles</Button>
            </Link>
          </div>
        )}
      </div>
      
      {/* Chat sidebar with actions */}
      {selectedConversation && otherParticipant && (
        <ChatSidebar
          isFriend={isFriend}
          onToggleFriend={() => {
            setIsFriend(!isFriend);
            toast({
              title: isFriend ? "Friend removed" : "Friend added",
              description: isFriend
                ? `${otherParticipant.name} has been removed from your friends`
                : `${otherParticipant.name} has been added to your friends`
            });
          }}
          onEmojiSelect={(emoji) => {
            setMessageInput(prev => prev + emoji);
          }}
          onImageAttach={() => setShowMediaUploader(true)}
          onGiftSelect={() => setShowGiftSelector(true)}
          onCoinTransfer={() => setShowCoinTransfer(true)}
        />
      )}
    </div>
  );
};

export default MessagesPage;
