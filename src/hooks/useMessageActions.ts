
import { useToast } from '@/hooks/use-toast';
import { 
  sendTextMessage, 
  sendMediaMessage, 
  sendGiftMessage, 
  sendCoinTransferMessage, 
  sendSystemMessage,
  getUserById
} from '@/utils/chatUtils';
import { getUserBalance } from '@/utils/dreamCoinUtils';

export const useMessageActions = (
  loadConversations: () => void,
  loadMessages: (conversationId: string) => void
) => {
  const { toast } = useToast();
  
  // Handle send message
  const handleSendMessage = (conversationId: string, content: string) => {
    if (!conversationId) return;
    
    // Send message
    sendTextMessage(conversationId, content);
    
    // Refresh conversations and messages
    loadConversations();
    loadMessages(conversationId);
  };
  
  // Handle file select 
  const handleFileSelect = (conversationId: string, file: File) => {
    if (!conversationId) return;
    
    // Determine media type
    let mediaType: 'image' | 'video' | 'audio' = 'image';
    if (file.type.startsWith('video/')) {
      mediaType = 'video';
    } else if (file.type.startsWith('audio/')) {
      mediaType = 'audio';
    }
    
    // In a real app, we would upload the file to a server here
    sendMediaMessage(conversationId, file, mediaType);
    
    // Refresh conversations and messages
    loadConversations();
    loadMessages(conversationId);
    
    toast({
      title: "Media sent",
      description: `Your ${mediaType} has been sent`
    });
  };
  
  // Handle gift selection
  const handleGiftSelect = (conversationId: string, giftId: string, otherParticipantId: string) => {
    if (!conversationId) return;
    
    try {
      // Send gift
      sendGiftMessage(conversationId, giftId, otherParticipantId);
      
      // Refresh conversations and messages
      loadConversations();
      loadMessages(conversationId);
      
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
  const handleCoinTransfer = (conversationId: string, amount: number, otherParticipantId: string) => {
    if (!conversationId) return;
    
    try {
      // Send coins
      sendCoinTransferMessage(conversationId, amount, otherParticipantId);
      
      // Refresh conversations and messages
      loadConversations();
      loadMessages(conversationId);
      
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
  
  // Handle poke
  const handlePoke = (conversationId: string, otherParticipantName: string) => {
    if (!conversationId) return;
    
    try {
      // Send system message about poke
      sendSystemMessage(
        conversationId, 
        `You poked ${otherParticipantName}! They'll be notified.`
      );
      
      // Refresh conversations and messages
      loadConversations();
      loadMessages(conversationId);
      
      toast({
        title: "Poke sent",
        description: `You poked ${otherParticipantName}!`
      });
    } catch (error) {
      toast({
        title: "Error sending poke",
        description: (error as Error).message,
        variant: "destructive"
      });
    }
  };
  
  return {
    handleSendMessage,
    handleFileSelect,
    handleGiftSelect,
    handleCoinTransfer,
    handlePoke
  };
};

export default useMessageActions;
