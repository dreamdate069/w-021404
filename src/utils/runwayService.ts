
/**
 * API Services
 * 
 * This service handles all interactions with various APIs for AI features
 * including image generation, text processing, and more.
 */

// API Base URLs
const RUNWAY_API_BASE = 'https://api.runwayml.com/v1';
const OPENROUTER_API_BASE = 'https://api.openrouter.ai/api/v1';
const HUGGINGFACE_API_BASE = 'https://api-inference.huggingface.co/models';

/**
 * Get API keys from local storage
 */
export const getRunwayApiKey = (): string | null => {
  return localStorage.getItem('runway_api_key');
};

export const getOpenRouterApiKey = (): string | null => {
  return localStorage.getItem('openrouter_api_key');
};

export const getHuggingFaceApiKey = (): string | null => {
  return localStorage.getItem('huggingface_api_key');
};

/**
 * Check if API keys are configured
 */
export const isRunwayConfigured = (): boolean => {
  return !!getRunwayApiKey();
};

export const isOpenRouterConfigured = (): boolean => {
  return !!getOpenRouterApiKey();
};

export const isHuggingFaceConfigured = (): boolean => {
  return !!getHuggingFaceApiKey();
};

/**
 * Generate an AI profile picture based on description
 * @param prompt Text description for the image
 * @returns URL to the generated image or null if failed
 */
export const generateProfilePicture = async (prompt: string): Promise<string | null> => {
  const apiKey = getRunwayApiKey();
  
  if (!apiKey) {
    console.error('Runway API key not configured');
    return null;
  }
  
  try {
    // This is a placeholder for the actual Runway API call
    // In a real implementation, this would call the Runway API with the prompt
    console.log(`Generating profile picture with prompt: ${prompt}`);
    
    // Mock response - in a real implementation, this would use the actual API
    // return URL to generated image from Runway
    return '/user-uploads/profile-pics/ai-generated-placeholder.png';
  } catch (error) {
    console.error('Error generating profile picture:', error);
    return null;
  }
};

/**
 * Generate an image for messaging or content
 * @param prompt Text description for the image
 * @param width Image width (optional)
 * @param height Image height (optional)
 * @returns URL to the generated image or null if failed
 */
export const generateImage = async (
  prompt: string, 
  width: number = 512, 
  height: number = 512
): Promise<string | null> => {
  const apiKey = getRunwayApiKey();
  
  if (!apiKey) {
    console.error('Runway API key not configured');
    return null;
  }
  
  try {
    // This is a placeholder for the actual Runway API call
    console.log(`Generating image with prompt: ${prompt}, size: ${width}x${height}`);
    
    // Mock response
    return '/user-uploads/media/ai-generated-placeholder.png';
  } catch (error) {
    console.error('Error generating image:', error);
    return null;
  }
};

/**
 * Generate text using OpenRouter API
 * @param prompt Text prompt for generation
 * @param model Model to use (optional)
 * @returns Generated text or null if failed
 */
export const generateText = async (
  prompt: string,
  model: string = 'openai/gpt-4o'
): Promise<string | null> => {
  const apiKey = getOpenRouterApiKey();
  
  if (!apiKey) {
    console.error('OpenRouter API key not configured');
    return null;
  }
  
  try {
    console.log(`Generating text with prompt: ${prompt} using model: ${model}`);
    
    // Mock response - in a real implementation, this would call the OpenRouter API
    return `This is a mock response for the prompt: "${prompt}"`;
  } catch (error) {
    console.error('Error generating text:', error);
    return null;
  }
};

/**
 * Run inference on a HuggingFace model
 * @param modelId ID of the model to use
 * @param inputs Input data for the model
 * @returns Model output or null if failed
 */
export const runHuggingFaceInference = async (
  modelId: string,
  inputs: any
): Promise<any | null> => {
  const apiKey = getHuggingFaceApiKey();
  
  if (!apiKey) {
    console.error('HuggingFace API key not configured');
    return null;
  }
  
  try {
    console.log(`Running inference on model: ${modelId}`);
    
    // Mock response - in a real implementation, this would call the HuggingFace API
    return { result: "Mock result from HuggingFace model" };
  } catch (error) {
    console.error('Error running HuggingFace inference:', error);
    return null;
  }
};

/**
 * Validate the API key
 * @param apiKey API key to validate
 * @returns Promise resolving to boolean indicating if key is valid
 */
export const validateApiKey = async (apiKey: string): Promise<boolean> => {
  try {
    // This would be replaced with an actual API call to verify the key
    // For now, just simulate a successful validation if the key exists
    return apiKey.length > 10;
  } catch (error) {
    console.error('Error validating API key:', error);
    return false;
  }
};
