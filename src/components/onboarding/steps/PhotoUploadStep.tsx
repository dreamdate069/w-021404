
import React, { useState } from 'react';
import { Camera, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OnboardingData } from '../OnboardingFlow';

interface PhotoUploadStepProps {
  data: Partial<OnboardingData>;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev?: () => void;
}

const PhotoUploadStep: React.FC<PhotoUploadStepProps> = ({ data, onUpdate, onNext, onPrev }) => {
  const [photos, setPhotos] = useState<File[]>(data.photos || []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (photos.length + files.length <= 6) {
      const newPhotos = [...photos, ...files];
      setPhotos(newPhotos);
      onUpdate({ photos: newPhotos });
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos);
    onUpdate({ photos: newPhotos });
  };

  const canProceed = photos.length >= 2;

  return (
    <div>
      <div className="text-center mb-6">
        <Camera className="w-12 h-12 text-pink-500 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Add Your Photos</h2>
        <p className="text-gray-600">Add at least 2 photos to show your personality</p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {photos.map((photo, index) => (
          <div key={index} className="relative aspect-square">
            <img
              src={URL.createObjectURL(photo)}
              alt={`Photo ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
            <button
              onClick={() => removePhoto(index)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
        
        {photos.length < 6 && (
          <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-pink-500 transition-colors">
            <Plus className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-500 mt-1">Add Photo</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        )}
      </div>

      <div className="text-center mb-6">
        <p className="text-sm text-gray-500">
          {photos.length}/6 photos • {Math.max(0, 2 - photos.length)} more needed
        </p>
      </div>

      <div className="flex gap-3">
        {onPrev && (
          <Button variant="outline" onClick={onPrev} className="flex-1">
            Back
          </Button>
        )}
        <Button 
          onClick={onNext} 
          disabled={!canProceed}
          className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default PhotoUploadStep;
