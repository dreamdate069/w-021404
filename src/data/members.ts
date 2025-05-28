
export interface Member {
  id: string;
  nickname: string;
  age: number;
  image: string;
  images?: string[];
  location: string;
  bio: string;
  interests?: string[];
  online: boolean;
  lastActive: string;
}

const members: Member[] = [
  {
    id: '1',
    nickname: 'SophiaBloom',
    age: 25,
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b524?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1494790108755-2616b612b524?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Berlin',
    bio: 'Travel photographer with a passion for capturing life\'s beautiful moments. Love exploring new cultures and meeting creative people.',
    interests: ['Photography', 'Travel', 'Art', 'Music', 'Coffee'],
    online: true,
    lastActive: 'Online now'
  },
  {
    id: '2', 
    nickname: 'EmmaRose',
    age: 28,
    image: 'https://images.unsplash.com/photo-1488207681203-74deb9ad6c2e?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1488207681203-74deb9ad6c2e?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Hamburg',
    bio: 'Yoga instructor and wellness enthusiast. Believe in living mindfully and spreading positive energy wherever I go.',
    interests: ['Yoga', 'Wellness', 'Meditation', 'Hiking', 'Healthy Living'],
    online: false,
    lastActive: '2 hours ago'
  },
  {
    id: '3',
    nickname: 'LiamAdventure',
    age: 32,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Munich',
    bio: 'Outdoor enthusiast and mountain climber. Always seeking the next adventure, whether it\'s scaling peaks or exploring hidden trails.',
    interests: ['Mountain Climbing', 'Hiking', 'Adventure Sports', 'Photography', 'Travel'],
    online: false,
    lastActive: '1 day ago'
  },
  {
    id: '4',
    nickname: 'IsabellaArt',
    age: 26,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Cologne',
    bio: 'Digital artist and creative director. I find inspiration in everyday moments and love bringing ideas to life through visual storytelling.',
    interests: ['Digital Art', 'Design', 'Photography', 'Museums', 'Creative Writing'],
    online: true,
    lastActive: 'Online now'
  },
  {
    id: '5',
    nickname: 'NoahTech',
    age: 29,
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Berlin',
    bio: 'Software engineer by day, musician by night. Building apps that make a difference while pursuing my passion for jazz guitar.',
    interests: ['Programming', 'Music', 'Jazz', 'Technology', 'Innovation'],
    online: false,
    lastActive: '3 hours ago'
  },
  {
    id: '6',
    nickname: 'AvaChef',
    age: 24,
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1484328861630-cf73b7d34ea3?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Hamburg',
    bio: 'Culinary artist passionate about sustainable cooking. Creating delicious experiences while caring for our planet.',
    interests: ['Cooking', 'Sustainability', 'Local Markets', 'Wine', 'Food Photography'],
    online: true,
    lastActive: 'Online now'
  },
  {
    id: '7',
    nickname: 'EthanFit',
    age: 31,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1533460004989-cef01064af7e?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Munich',
    bio: 'Personal trainer and marathon runner. Helping others achieve their fitness goals while pushing my own limits.',
    interests: ['Fitness', 'Running', 'Nutrition', 'Motivation', 'Outdoor Training'],
    online: false,
    lastActive: '1 day ago'
  },
  {
    id: '8',
    nickname: 'CharlotteBooks',
    age: 27,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1494790108755-2616b612b524?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Cologne',
    bio: 'Literature teacher and aspiring novelist. Finding magic in words and sharing the love of storytelling with others.',
    interests: ['Reading', 'Writing', 'Literature', 'Poetry', 'Book Clubs'],
    online: true,
    lastActive: 'Online now'
  },
  {
    id: '9',
    nickname: 'OliverMusic',
    age: 30,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1531727991582-cfd25ce79613?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Berlin',
    bio: 'Professional violinist and music producer. Blending classical training with modern sounds to create something unique.',
    interests: ['Classical Music', 'Music Production', 'Violin', 'Concerts', 'Composition'],
    online: false,
    lastActive: '2 hours ago'
  },
  {
    id: '10',
    nickname: 'ZoeExplorer',
    age: 23,
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1488207681203-74deb9ad6c2e?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Hamburg',
    bio: 'Marine biology student with a passion for ocean conservation. Diving deep into research and adventure.',
    interests: ['Marine Biology', 'Scuba Diving', 'Conservation', 'Ocean Research', 'Adventure'],
    online: true,
    lastActive: 'Online now'
  }
];

export const getAllMembers = (): Member[] => members;

export const getMemberById = (id: string): Member | undefined => {
  return members.find(member => member.id === id);
};
