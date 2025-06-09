
import React, { useState } from 'react';
import WelcomeStep from './steps/WelcomeStep';
import PhotoUploadStep from './steps/PhotoUploadStep';
import LocationStep from './steps/LocationStep';
import PreferencesStep from './steps/PreferencesStep';
import ProfileCompletionStep from './steps/ProfileCompletionStep';
import { motion, AnimatePresence } from 'framer-motion';

export interface OnboardingData {
  photos: File[];
  location: string;
  preferences: {
    ageRange: [number, number];
    distance: number;
    interestedIn: string[];
  };
  profile: {
    bio: string;
    interests: string[];
    occupation: string;
    education: string;
  };
}

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState<Partial<OnboardingData>>({});

  const steps = [
    { component: WelcomeStep, title: "Welcome" },
    { component: PhotoUploadStep, title: "Add Photos" },
    { component: LocationStep, title: "Location" },
    { component: PreferencesStep, title: "Preferences" },
    { component: ProfileCompletionStep, title: "Profile" }
  ];

  const updateData = (stepData: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...stepData }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(onboardingData as OnboardingData);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600 flex items-center justify-center p-4">
      <motion.div 
        className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Progress Bar */}
        <div className="bg-gray-100 h-2">
          <motion.div 
            className="bg-gradient-to-r from-pink-500 to-purple-600 h-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            <CurrentStepComponent
              data={onboardingData}
              onUpdate={updateData}
              onNext={nextStep}
              onPrev={currentStep > 0 ? prevStep : undefined}
              isLast={currentStep === steps.length - 1}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default OnboardingFlow;
