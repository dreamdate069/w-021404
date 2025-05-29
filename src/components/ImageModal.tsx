
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageModalProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ src, alt, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div className="relative max-w-4xl max-h-full">
        <Button
          variant="ghost"
          size="icon"
          className="absolute -top-12 right-0 text-white hover:bg-white/20 z-10"
          onClick={onClose}
        >
          <X size={24} />
        </Button>
        
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-[90vh] object-contain rounded-lg animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
};

export default ImageModal;
