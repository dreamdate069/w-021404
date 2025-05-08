
import React, { useState, useEffect } from 'react';

interface VideoChatProps {
  isActive: boolean;
  partnerName: string;
}

const VideoChat: React.FC<VideoChatProps> = ({ isActive, partnerName }) => {
  const [isConnecting, setIsConnecting] = useState(true);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        setIsConnecting(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="flex flex-1 flex-col animate-fade-in">
      {isConnecting ? (
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-custom-pink border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white">Connecting to {partnerName}...</p>
          </div>
        </div>
      ) : (
        <div className="relative flex-1 bg-black">
          {/* Placeholder for the video stream */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src="/lovable-uploads/6d9b54c2-64d4-44f3-959b-b0c71fff7a04.png" 
              alt={`${partnerName}'s video feed`} 
              className="h-full w-full object-cover opacity-50"
            />
            <div className="absolute bottom-4 right-4 w-32 h-32 bg-zinc-800 rounded-md overflow-hidden border-2 border-white">
              <div className="w-full h-full flex items-center justify-center text-white text-xs">
                Your Camera
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"></path>
                <line x1="23" y1="1" x2="1" y2="23"></line>
              </svg>
            </button>
            <button className="bg-zinc-700 hover:bg-zinc-600 text-white p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 7 L 1 7"></path>
                <path d="M11 17 L13 17"></path>
                <path d="M23 17 L 15 17"></path>
                <path d="M9 17 L 1 17"></path>
              </svg>
            </button>
            <button className="bg-zinc-700 hover:bg-zinc-600 text-white p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="23 7 16 12 23 17 23 7"></polygon>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoChat;
