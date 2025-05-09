import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from "@/hooks/use-toast";
import DreamCoinBalance from '@/components/DreamCoinBalance';
import VideoChat from '@/components/VideoChat';
import ChatSidebar from '@/components/ChatSidebar';
import { 
  getDreamCoinBalance, 
  deductMessageCost, 
  MESSAGE_COST 
} from '@/utils/dreamCoinUtils';

// Placeholder data - will be replaced with Supabase data
const CONVERSATIONS = [{
  id: '1',
  user: {
    name: 'Jessica',
    image: '/lovable-uploads/6d9b54c2-64d4-44f3-959b-b0c71fff7a04.png',
    online: true
  },
  lastMessage: "Hey there! How's your day going so far?",
  time: '12:34 PM',
  unread: 2
}, {
  id: '2',
  user: {
    name: 'Michael',
    image: '/placeholder.svg',
    online: false
  },
  lastMessage: 'That sounds like an amazing trip!',
  time: 'Yesterday',
  unread: 0
}, {
  id: '3',
  user: {
    name: 'Emma',
    image: '/placeholder.svg',
    online: true
  },
  lastMessage: 'Would you like to meet for coffee this weekend?',
  time: 'Yesterday',
  unread: 1
}, {
  id: '4',
  user: {
    name: 'Olivia',
    image: '/lovable-uploads/7973c816-d414-4bfa-b312-1407036a6e21.png',
    online: false
  },
  lastMessage: 'Thanks for the restaurant recommendation!',
  time: 'Monday',
  unread: 0
}];

// Placeholder messages for a conversation
const INITIAL_MESSAGES = [{
  id: '1',
  sender: 'them',
  text: "Hey there! I noticed we have a lot in common. How's your day going?",
  time: '12:30 PM'
}, {
  id: '2',
  sender: 'me',
  text: "Hi Jessica! It's going well, thanks for asking. I'm just finishing up some work. How about you?",
  time: '12:32 PM'
}, {
  id: '3',
  sender: 'them',
  text: 'Pretty good! I just got back from a hike with my dog. Do you like hiking too?',
  time: '12:33 PM'
}, {
  id: '4',
  sender: 'them',
  text: 'I saw in your profile you enjoy outdoor activities!',
  time: '12:34 PM'
}];

const MessagesPage = () => {
  const { toast } = useToast();
  const [selectedConversation, setSelectedConversation] = useState(CONVERSATIONS[0]);
  const [isVideoMode, setIsVideoMode] = useState(false);
  const [dreamCoinBalance, setDreamCoinBalance] = useState(0);
  const [isFriend, setIsFriend] = useState(true);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [messageInput, setMessageInput] = useState('');
  
  // Load dreamcoin balance on mount
  useEffect(() => {
    const balance = getDreamCoinBalance();
    setDreamCoinBalance(balance);
  }, []);
  
  const handleToggleFriend = () => {
    setIsFriend(!isFriend);
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    
    // Try to deduct coins for sending message
    if (deductMessageCost()) {
      // If successful, add message and update balance
      const newMessage = {
        id: `msg-${Date.now()}`,
        sender: 'me',
        text: messageInput,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages([...messages, newMessage]);
      setMessageInput('');
      
      // Update the displayed balance
      setDreamCoinBalance(getDreamCoinBalance());
      
      // Simulate a response message after a short delay
      setTimeout(() => {
        const responseMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: 'them',
          text: `Thanks for your message! This is an automated response.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages(prevMessages => [...prevMessages, responseMessage]);
      }, 1500);
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessageInput(prev => prev + emoji);
  };
  
  const handleImageAttach = () => {
    // Image attachment functionality would go here
    toast({
      title: "Feature Coming Soon",
      description: "Image attachment will be available in the next update!"
    });
  };
  
  const handleGiftSelect = () => {
    // Gift selection functionality would go here
    toast({
      title: "Gift Shop",
      description: "Browse our gift collection to surprise your match!"
    });
  };
  
  const handleCoinTransfer = () => {
    // Coin transfer functionality would go here
    toast({
      title: "Coin Transfer",
      description: "Send DreamCoins to your friends and matches!"
    });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Conversations sidebar */}
      <div className="w-full md:w-80 border-r border-zinc-800 overflow-y-auto">
        <div className="p-4 border-b border-zinc-800">
          <h2 className="text-xl font-bold text-white mb-4">Messages</h2>
          <div className="relative">
            <Input placeholder="Search messages..." className="pl-10 bg-zinc-800 border-zinc-700 text-white" />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          </div>
        </div>
        
        <div>
          {CONVERSATIONS.map(conversation => (
            <div 
              key={conversation.id} 
              className={`flex items-center gap-3 p-4 hover:bg-zinc-800 cursor-pointer ${selectedConversation?.id === conversation.id ? 'bg-zinc-800' : ''}`} 
              onClick={() => setSelectedConversation(conversation)}
            >
              <div className="relative">
                <img src={conversation.user.image} alt={conversation.user.name} className="w-12 h-12 rounded-full object-cover" />
                {conversation.user.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className="text-white font-medium truncate">{conversation.user.name}</h3>
                  <span className="text-xs text-zinc-400">{conversation.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-zinc-400 text-sm truncate">{conversation.lastMessage}</p>
                  {conversation.unread > 0 && (
                    <span className="ml-2 bg-custom-pink text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {conversation.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Header */}
            <div className="border-b border-zinc-800 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={selectedConversation.user.image} alt={selectedConversation.user.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h3 className="text-white font-medium">{selectedConversation.user.name}</h3>
                  <span className="text-xs text-zinc-400">
                    {selectedConversation.user.online ? 'Online' : 'Offline'}
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
                    className="data-[state=checked]:bg-custom-pink text-[#e80ce8]" 
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
                <div className="flex-1 overflow-y-auto p-4 space-y-4 h-full">
                  {messages.map(message => (
                    <div key={message.id} className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] rounded-lg p-3 ${message.sender === 'me' ? 'bg-custom-pink text-white' : 'bg-zinc-800 text-white'}`}>
                        <p>{message.text}</p>
                        <span className={`text-xs block mt-1 ${message.sender === 'me' ? 'text-custom-pink/70' : 'text-zinc-400'}`}>
                          {message.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
                
              <div 
                className={`absolute inset-0 transition-opacity duration-300 ${isVideoMode ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                style={{ zIndex: isVideoMode ? 1 : 0 }}
              >
                <VideoChat isActive={isVideoMode} partnerName={selectedConversation.user.name} />
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
                    className="bg-custom-pink hover:bg-custom-pink/90"
                    onClick={handleSendMessage}
                    disabled={isVideoMode || !messageInput.trim()}
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
        onGiftSelect={handleGiftSelect}
        onCoinTransfer={handleCoinTransfer}
      />
    </div>
  );
};

export default MessagesPage;
