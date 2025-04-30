import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Placeholder data - will be replaced with Supabase data
const CONVERSATIONS = [
  {
    id: '1',
    user: { name: 'Jessica', image: '/lovable-uploads/6d9b54c2-64d4-44f3-959b-b0c71fff7a04.png', online: true },
    lastMessage: "Hey there! How's your day going so far?",
    time: '12:34 PM',
    unread: 2,
  },
  {
    id: '2',
    user: { name: 'Michael', image: '/placeholder.svg', online: false },
    lastMessage: 'That sounds like an amazing trip!',
    time: 'Yesterday',
    unread: 0,
  },
  {
    id: '3',
    user: { name: 'Emma', image: '/placeholder.svg', online: true },
    lastMessage: 'Would you like to meet for coffee this weekend?',
    time: 'Yesterday',
    unread: 1,
  },
  {
    id: '4',
    user: { name: 'Olivia', image: '/lovable-uploads/7973c816-d414-4bfa-b312-1407036a6e21.png', online: false },
    lastMessage: 'Thanks for the restaurant recommendation!',
    time: 'Monday',
    unread: 0,
  }
];

// Placeholder messages for a conversation
const MESSAGES = [
  {
    id: '1',
    sender: 'them',
    text: "Hey there! I noticed we have a lot in common. How's your day going?",
    time: '12:30 PM'
  },
  {
    id: '2',
    sender: 'me',
    text: "Hi Jessica! It's going well, thanks for asking. I'm just finishing up some work. How about you?",
    time: '12:32 PM'
  },
  {
    id: '3',
    sender: 'them',
    text: 'Pretty good! I just got back from a hike with my dog. Do you like hiking too?',
    time: '12:33 PM'
  },
  {
    id: '4',
    sender: 'them',
    text: 'I saw in your profile you enjoy outdoor activities!',
    time: '12:34 PM'
  }
];

const MessagesPage = () => {
  const [selectedConversation, setSelectedConversation] = React.useState(CONVERSATIONS[0]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Conversations sidebar */}
      <div className="w-full md:w-80 border-r border-zinc-800 overflow-y-auto">
        <div className="p-4 border-b border-zinc-800">
          <h2 className="text-xl font-bold text-white mb-4">Messages</h2>
          <div className="relative">
            <Input 
              placeholder="Search messages..." 
              className="pl-10 bg-zinc-800 border-zinc-700 text-white"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          </div>
        </div>
        
        <div>
          {CONVERSATIONS.map((conversation) => (
            <div 
              key={conversation.id}
              className={`flex items-center gap-3 p-4 hover:bg-zinc-800 cursor-pointer ${
                selectedConversation?.id === conversation.id ? 'bg-zinc-800' : ''
              }`}
              onClick={() => setSelectedConversation(conversation)}
            >
              <div className="relative">
                <img 
                  src={conversation.user.image} 
                  alt={conversation.user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
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
                    <span className="ml-2 bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
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
            <div className="border-b border-zinc-800 p-4 flex items-center gap-3">
              <img 
                src={selectedConversation.user.image} 
                alt={selectedConversation.user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="text-white font-medium">{selectedConversation.user.name}</h3>
                <span className="text-xs text-zinc-400">
                  {selectedConversation.user.online ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {MESSAGES.map((message) => (
                <div 
                  key={message.id}
                  className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === 'me' 
                        ? 'bg-rose-500 text-white' 
                        : 'bg-zinc-800 text-white'
                    }`}
                  >
                    <p>{message.text}</p>
                    <span className={`text-xs block mt-1 ${
                      message.sender === 'me' ? 'text-rose-200' : 'text-zinc-400'
                    }`}>
                      {message.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Message input */}
            <div className="border-t border-zinc-800 p-4">
              <div className="flex gap-2">
                <Input 
                  placeholder="Type a message..." 
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
                <Button className="bg-rose-500 hover:bg-rose-600">Send</Button>
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
    </div>
  );
};

export default MessagesPage;
