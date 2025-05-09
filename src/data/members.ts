
// Shared member data for consistent display across the app
export interface Member {
  id: string;
  name: string;
  age: number;
  location: string;
  image: string;
  online: boolean;
  lastActive?: string;
  bio?: string;
  images?: string[];
  interests?: string[];
}

// Complete member data with all profile information
export const MEMBERS: Record<string, Member> = {
  '1': {
    id: '1',
    name: 'Jessica',
    age: 28,
    location: 'New York',
    bio: 'Love hiking, photography, and trying new restaurants. Looking for someone who enjoys adventures and good conversation.',
    image: '/user-uploads/profile-pics/1.png',
    images: [
      '/user-uploads/profile-pics/1.png',
      '/user-uploads/profile-pics/Untitled design (3).png',
      '/user-uploads/profile-pics/Untitled design (4).png'
    ],
    interests: ['Travel', 'Photography', 'Cooking', 'Hiking', 'Movies'],
    online: true,
    lastActive: 'Online now'
  },
  '2': {
    id: '2',
    name: 'Michael',
    age: 32,
    location: 'Los Angeles',
    bio: 'Tech enthusiast and fitness lover. I enjoy outdoor activities and exploring new places. Looking for someone with similar interests.',
    image: '/user-uploads/profile-pics/(3).png',
    images: [
      '/user-uploads/profile-pics/(3).png',
      '/user-uploads/profile-pics/(4).png',
      '/user-uploads/profile-pics/design (1).png'
    ],
    interests: ['Technology', 'Fitness', 'Travel', 'Music', 'Food'],
    online: false,
    lastActive: '2 hours ago'
  },
  '3': {
    id: '3',
    name: 'Emma',
    age: 26,
    location: 'Chicago',
    bio: 'Creative soul who loves art and music. Always up for coffee shop hopping and museum visits. Looking for genuine connections.',
    image: '/user-uploads/profile-pics/(4).png',
    images: [
      '/user-uploads/profile-pics/(4).png',
      '/user-uploads/profile-pics/Untitled design (1).png',
      '/user-uploads/profile-pics/design (1).png'
    ],
    interests: ['Art', 'Music', 'Coffee', 'Reading', 'Museums'],
    online: true,
    lastActive: 'Online now'
  },
  '4': {
    id: '4',
    name: 'James',
    age: 30,
    location: 'Miami',
    bio: 'Beach lover and foodie. I enjoy trying new restaurants and exploring the outdoors. Looking for someone to share adventures with.',
    image: '/user-uploads/profile-pics/Untitled design (1).png',
    images: [
      '/user-uploads/profile-pics/Untitled design (1).png',
      '/user-uploads/profile-pics/Untitled design (5).png',
      '/user-uploads/profile-pics/design (1).png'
    ],
    interests: ['Beach', 'Food', 'Sports', 'Travel', 'Outdoors'],
    online: false,
    lastActive: '1 day ago'
  },
  '5': {
    id: '5',
    name: 'Olivia',
    age: 25,
    location: 'Seattle',
    bio: 'Coffee enthusiast and nature lover. I enjoy hiking and exploring the Pacific Northwest. Looking for someone who appreciates the outdoors.',
    image: '/user-uploads/profile-pics/Untitled design (3).png',
    images: [
      '/user-uploads/profile-pics/Untitled design (3).png',
      '/user-uploads/profile-pics/Untitled design (4).png',
      '/user-uploads/profile-pics/1.png'
    ],
    interests: ['Coffee', 'Hiking', 'Nature', 'Books', 'Photography'],
    online: true,
    lastActive: 'Online now'
  },
  '6': {
    id: '6',
    name: 'Daniel',
    age: 34,
    location: 'Boston',
    bio: 'History buff and food lover. I enjoy exploring historic sites and trying new cuisines. Looking for someone with similar interests.',
    image: '/user-uploads/profile-pics/Untitled design (4).png',
    images: [
      '/user-uploads/profile-pics/Untitled design (4).png',
      '/user-uploads/profile-pics/design (1).png',
      '/user-uploads/profile-pics/(3).png'
    ],
    interests: ['History', 'Food', 'Travel', 'Museums', 'Culture'],
    online: true,
    lastActive: '3 hours ago'
  },
  '7': {
    id: '7',
    name: 'Sophia',
    age: 27,
    location: 'Austin',
    bio: 'Music lover and foodie. I enjoy live concerts and exploring new restaurants. Looking for someone to share experiences with.',
    image: '/user-uploads/profile-pics/Untitled design (5).png',
    images: [
      '/user-uploads/profile-pics/Untitled design (5).png',
      '/user-uploads/profile-pics/1.png',
      '/user-uploads/profile-pics/Untitled design (3).png'
    ],
    interests: ['Music', 'Food', 'Concerts', 'Travel', 'Art'],
    online: false,
    lastActive: 'Yesterday'
  },
  '8': {
    id: '8',
    name: 'William',
    age: 29,
    location: 'Denver',
    bio: 'Outdoor enthusiast and craft beer lover. I enjoy hiking, camping, and trying local breweries. Looking for someone who appreciates adventure.',
    image: '/user-uploads/profile-pics/design (1).png',
    images: [
      '/user-uploads/profile-pics/design (1).png',
      '/user-uploads/profile-pics/(3).png',
      '/user-uploads/profile-pics/(4).png'
    ],
    interests: ['Hiking', 'Camping', 'Craft Beer', 'Mountains', 'Dogs'],
    online: true,
    lastActive: 'Online now'
  }
};

// Get all members as an array
export const getAllMembers = (): Member[] => {
  return Object.values(MEMBERS);
};

// Get online members
export const getOnlineMembers = (): Member[] => {
  return getAllMembers().filter(member => member.online);
};

// Get member by ID
export const getMemberById = (id: string): Member | undefined => {
  return MEMBERS[id];
};
