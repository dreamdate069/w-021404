
import React from 'react';
import { MediaUploader } from '@/components/MediaUploader';
import { GiftSelector } from '@/components/GiftSelector';
import { CoinTransfer } from '@/components/CoinTransfer';
import { getUserBalance } from '@/utils/dreamCoinUtils';

interface ChatOverlaysProps {
  showMediaUploader: boolean;
  showGiftSelector: boolean;
  showCoinTransfer: boolean;
  recipientName?: string;
  currentUserId: string;
  onMediaUploaderClose: () => void;
  onFileSelect: (file: File) => void;
  onGiftSelectorOpenChange: (open: boolean) => void;
  onGiftSelect: (giftId: string) => void;
  onCoinTransferOpenChange: (open: boolean) => void;
  onCoinTransfer: (amount: number) => void;
}

const ChatOverlays: React.FC<ChatOverlaysProps> = ({
  showMediaUploader,
  showGiftSelector,
  showCoinTransfer,
  recipientName,
  currentUserId,
  onMediaUploaderClose,
  onFileSelect,
  onGiftSelectorOpenChange,
  onGiftSelect,
  onCoinTransferOpenChange,
  onCoinTransfer
}) => {
  return (
    <>
      {/* Media uploader overlay */}
      {showMediaUploader && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10">
          <div className="bg-zinc-900 p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Upload Media</h3>
            <MediaUploader 
              onFileSelect={onFileSelect}
              accept="image/*,video/*,audio/*"
              maxSize={10 * 1024 * 1024} // 10MB
            />
            <div className="mt-4 flex justify-end">
              <button 
                className="px-4 py-2 rounded border border-zinc-700 hover:bg-zinc-800 transition-colors"
                onClick={onMediaUploaderClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Gift selector overlay */}
      {showGiftSelector && recipientName && (
        <GiftSelector
          open={showGiftSelector}
          onOpenChange={onGiftSelectorOpenChange}
          onGiftSelect={onGiftSelect}
          balance={getUserBalance(currentUserId)}
          recipientName={recipientName}
        />
      )}
      
      {/* Coin transfer overlay */}
      {showCoinTransfer && recipientName && (
        <CoinTransfer
          open={showCoinTransfer}
          onOpenChange={onCoinTransferOpenChange}
          balance={getUserBalance(currentUserId)}
          recipientName={recipientName}
          onTransfer={onCoinTransfer}
        />
      )}
    </>
  );
};

export default ChatOverlays;
