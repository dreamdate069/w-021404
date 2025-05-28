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
    nickname: 'Alex_Berlin',
    age: 28,
    image: '/user-uploads/profile-pics/1.png',
    images: [
      '/user-uploads/profile-pics/1.png',
      '/user-uploads/profile-pics/design (1).png',
      '/user-uploads/profile-pics/Untitled design (1).png'
    ],
    location: 'Berlin',
    bio: 'Hi, I\'m Alex! Software engineer by day, adventure seeker by night. Love hiking, photography, and discovering new coffee shops around the city.',
    interests: ['Photography', 'Hiking', 'Coffee', 'Technology', 'Travel'],
    online: true,
    lastActive: 'Online now'
  },
  {
    id: '2', 
    nickname: 'SarahSunshine',
    age: 25,
    image: '/user-uploads/profile-pics/(3).png',
    images: [
      '/user-uploads/profile-pics/(3).png',
      '/user-uploads/profile-pics/Untitled design (3).png',
      '/user-uploads/profile-pics/Untitled design (4).png'
    ],
    location: 'Hamburg',
    bio: 'Creative soul with a passion for art and music. Looking for someone who appreciates the little things in life and isn\'t afraid to be spontaneous!',
    interests: ['Art', 'Music', 'Dancing', 'Cooking', 'Museums'],
    online: false,
    lastActive: '2 hours ago'
  },
  {
    id: '3',
    nickname: 'MikeTheHiker',
    age: 32,
    image: '/user-uploads/profile-pics/(2).png',
    images: [
      '/user-uploads/profile-pics/(2).png',
      '/user-uploads/profile-pics/design (2).png',
      '/user-uploads/profile-pics/design (3).png'
    ],
    location: 'Munich',
    bio: 'Outdoor enthusiast and travel addict. Always up for a new adventure, whether it\'s hiking in the Alps or exploring hidden gems in the city.',
    interests: ['Hiking', 'Travel', 'Skiing', 'Mountaineering', 'Camping'],
    online: false,
    lastActive: '1 day ago'
  },
  {
    id: '4',
    nickname: 'LisaBookLover',
    age: 29,
    image: '/user-uploads/profile-pics/(4).png',
    images: [
      '/user-uploads/profile-pics/(4).png',
      '/user-uploads/profile-pics/Untitled design.png',
      '/user-uploads/profile-pics/Untitled design (2).png'
    ],
    location: 'Cologne',
    bio: 'Bookworm and coffee lover. Looking for someone to share cozy nights in with a good book and a warm cup of coffee.',
    interests: ['Reading', 'Coffee', 'Writing', 'Movies', 'Board Games'],
    online: true,
    lastActive: 'Online now'
  },
  {
    id: '5',
    nickname: 'Tom_Tech',
    age: 35,
    image: '/user-uploads/profile-pics/(5).png',
    location: 'Berlin',
    bio: 'Tech enthusiast and gamer. When I\'m not coding, you can find me exploring the latest gadgets or lost in a virtual world.',
    interests: ['Technology', 'Gaming', 'Coding', 'Sci-Fi', 'Gadgets'],
    online: false,
    lastActive: '3 hours ago'
  },
  {
    id: '6',
    nickname: 'EvaArtist',
    age: 27,
    image: '/user-uploads/profile-pics/(6).png',
    location: 'Hamburg',
    bio: 'Passionate artist and nature lover. I find inspiration in the world around me and love to express myself through painting and photography.',
    interests: ['Art', 'Photography', 'Nature', 'Travel', 'Yoga'],
    online: true,
    lastActive: 'Online now'
  },
  {
    id: '7',
    nickname: 'DanielFoodie',
    age: 31,
    image: '/user-uploads/profile-pics/(7).png',
    location: 'Munich',
    bio: 'Foodie and travel enthusiast. Always on the lookout for new culinary experiences and hidden gems around the world.',
    interests: ['Food', 'Travel', 'Cooking', 'Wine', 'Restaurants'],
    online: false,
    lastActive: '1 day ago'
  },
  {
    id: '8',
    nickname: 'SophieFit',
    age: 26,
    image: '/user-uploads/profile-pics/(8).png',
    location: 'Cologne',
    bio: 'Fitness junkie and health enthusiast. I believe in living a balanced lifestyle and love to inspire others to reach their full potential.',
    interests: ['Fitness', 'Health', 'Yoga', 'Nutrition', 'Running'],
    online: true,
    lastActive: 'Online now'
  },
  {
    id: '9',
    nickname: 'ChrisMusic',
    age: 33,
    image: '/user-uploads/profile-pics/(9).png',
    location: 'Berlin',
    bio: 'Music lover and concert-goer. I enjoy discovering new artists and sharing my passion for music with others.',
    interests: ['Music', 'Concerts', 'Festivals', 'Dancing', 'DJing'],
    online: false,
    lastActive: '2 hours ago'
  },
  {
    id: '10',
    nickname: 'AnnaTraveler',
    age: 29,
    image: '/user-uploads/profile-pics/(10).png',
    location: 'Hamburg',
    bio: 'World traveler and adventure seeker. I\'m always planning my next trip and love to explore new cultures and meet new people.',
    interests: ['Travel', 'Culture', 'Adventure', 'Photography', 'Languages'],
    online: true,
    lastActive: 'Online now'
  }
];

export const getAllMembers = (): Member[] => members;

export const getMemberById = (id: string): Member | undefined => {
  return members.find(member => member.id === id);
};
