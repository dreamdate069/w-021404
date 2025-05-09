
import { v4 as uuidv4 } from 'uuid';

// Define file storage type
export type FileType = 'profile-pic' | 'gift' | 'media';

/**
 * Storage paths for different file types
 */
export const STORAGE_PATHS = {
  'profile-pic': '/user-uploads/profile-pics/',
  'gift': '/user-uploads/gifts/',
  'media': '/user-uploads/media/'
};

/**
 * Generates a unique filename with UUID while preserving the extension
 * @param file Original file
 * @returns Unique filename with extension
 */
export const generateUniqueFileName = (file: File): string => {
  // Extract file extension
  const extension = file.name.split('.').pop() || '';
  // Generate UUID
  const uuid = uuidv4();
  
  return `${uuid}.${extension}`;
};

/**
 * Stores a file with a UUID-based filename in the appropriate directory
 * @param file The file to store
 * @param type Type of file (profile-pic, gift, media)
 * @returns Promise with the path to the stored file
 */
export const storeFile = async (file: File, type: FileType): Promise<string> => {
  const fileName = generateUniqueFileName(file);
  const filePath = `${STORAGE_PATHS[type]}${fileName}`;
  
  // In a real app, this would upload to a server or cloud storage
  // For simulation purposes, we'll just return the path
  console.log(`File would be stored at: ${filePath}`);
  
  // Mock successful upload - in a real app, this would be an actual upload
  // For now, we're just returning the path where it would be stored
  return filePath;
};

/**
 * Gets the appropriate storage path for a file type
 * @param type Type of file (profile-pic, gift, media)
 * @returns Path for storing this type of file
 */
export const getStoragePath = (type: FileType): string => {
  return STORAGE_PATHS[type];
};

/**
 * Gets a properly formatted file URL for the given path
 * @param filePath Path to the file
 * @returns URL that can be used in img src, etc.
 */
export const getFileUrl = (filePath: string): string => {
  // In a real app with cloud storage, this might format a complete URL
  // For our local storage simulation, just return the path
  return filePath;
};
