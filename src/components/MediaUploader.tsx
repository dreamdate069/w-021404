import React, { useState, useRef } from 'react';
import { Upload, X, File, Image, Video, FileAudio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { storeFile, FileType } from '@/utils/fileStorage';

interface MediaUploaderProps {
  onFileSelect: (file: File, filePath?: string) => void;
  accept?: string;
  maxSize?: number; // in bytes
  className?: string;
  fileType?: FileType;
}

const MediaUploader: React.FC<MediaUploaderProps> = ({
  onFileSelect,
  accept = 'image/*,video/*,audio/*',
  maxSize = 10 * 1024 * 1024, // 10MB default
  className,
  fileType = 'media'
}) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileMediaType, setFileMediaType] = useState<'image' | 'video' | 'audio' | 'file' | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: `File size should be less than ${Math.round(maxSize / (1024 * 1024))}MB`,
        variant: "destructive"
      });
      return;
    }

    await processFile(file);
  };

  const processFile = async (file: File) => {
    try {
      setIsUploading(true);
      
      // Set file name
      setFileName(file.name);

      // Determine file type
      if (file.type.startsWith('image/')) {
        setFileMediaType('image');
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else if (file.type.startsWith('video/')) {
        setFileMediaType('video');
        setPreviewUrl(URL.createObjectURL(file));
      } else if (file.type.startsWith('audio/')) {
        setFileMediaType('audio');
        setPreviewUrl(null);
      } else {
        setFileMediaType('file');
        setPreviewUrl(null);
      }

      // Pass the file directly to onFileSelect
      // The filePath will be determined by the storeFile function later
      onFileSelect(file);
    } catch (error) {
      console.error('Error processing file:', error);
      toast({
        title: "Upload failed",
        description: "There was an error processing your file",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: `File size should be less than ${Math.round(maxSize / (1024 * 1024))}MB`,
        variant: "destructive"
      });
      return;
    }

    // Check if file type is accepted
    const fileType = file.type;
    const acceptedTypes = accept.split(',');
    
    const isAccepted = acceptedTypes.some(type => {
      if (type.endsWith('/*')) {
        const mainType = type.split('/')[0];
        return fileType.startsWith(`${mainType}/`);
      }
      return type === fileType;
    });

    if (!isAccepted) {
      toast({
        title: "Invalid file type",
        description: `Please upload a file with one of these formats: ${accept}`,
        variant: "destructive"
      });
      return;
    }

    await processFile(file);
  };

  const handleClearFile = () => {
    setPreviewUrl(null);
    setFileMediaType(null);
    setFileName('');
    
    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={cn("relative", className)}>
      {isUploading && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20 rounded-md">
          <p className="text-white">Uploading...</p>
        </div>
      )}
      
      {previewUrl || fileMediaType ? (
        <div className="relative rounded-md overflow-hidden border border-zinc-800 p-2">
          <button 
            onClick={handleClearFile}
            className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-1 z-10 hover:bg-black"
          >
            <X size={16} />
          </button>
          
          {fileMediaType === 'image' && previewUrl && (
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="w-full h-auto max-h-[200px] rounded-md object-contain" 
            />
          )}
          
          {fileMediaType === 'video' && previewUrl && (
            <video 
              src={previewUrl} 
              controls 
              className="w-full h-auto max-h-[200px] rounded-md" 
            />
          )}
          
          {(fileMediaType === 'audio' || fileMediaType === 'file') && (
            <div className="flex items-center gap-2 p-2">
              {fileMediaType === 'audio' ? <FileAudio size={24} /> : <File size={24} />}
              <span className="text-sm text-white truncate">{fileName}</span>
            </div>
          )}
        </div>
      ) : (
        <div 
          className={cn(
            "border-2 border-dashed border-zinc-700 rounded-md p-4 flex flex-col items-center justify-center cursor-pointer",
            isDragging ? "bg-zinc-800 border-custom-pink" : "hover:bg-zinc-800",
            className
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="mb-2 text-zinc-400" size={24} />
          <p className="text-zinc-400 mb-1">Drag & drop your file here</p>
          <p className="text-zinc-500 text-xs">or click to browse</p>
          <p className="text-zinc-600 text-xs mt-1">
            Max size: {Math.round(maxSize / (1024 * 1024))}MB
          </p>
          
          <div className="flex gap-2 mt-3">
            <Button 
              variant="ghost" 
              className="text-xs flex items-center gap-1 p-1.5"
              onClick={(e) => {
                e.stopPropagation();
                if (fileInputRef.current) {
                  fileInputRef.current.setAttribute('accept', 'image/*');
                  fileInputRef.current.click();
                }
              }}
            >
              <Image size={14} />
              <span>Image</span>
            </Button>
            
            <Button 
              variant="ghost" 
              className="text-xs flex items-center gap-1 p-1.5"
              onClick={(e) => {
                e.stopPropagation();
                if (fileInputRef.current) {
                  fileInputRef.current.setAttribute('accept', 'video/*');
                  fileInputRef.current.click();
                }
              }}
            >
              <Video size={14} />
              <span>Video</span>
            </Button>
            
            <Button 
              variant="ghost" 
              className="text-xs flex items-center gap-1 p-1.5"
              onClick={(e) => {
                e.stopPropagation();
                if (fileInputRef.current) {
                  fileInputRef.current.setAttribute('accept', 'audio/*');
                  fileInputRef.current.click();
                }
              }}
            >
              <FileAudio size={14} />
              <span>Audio</span>
            </Button>
          </div>
        </div>
      )}
      
      <input 
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept={accept}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default MediaUploader;
