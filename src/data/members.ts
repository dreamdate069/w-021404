
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
  },
  // Adding 40 new profiles
  {
    id: '11',
    nickname: 'MaxGamer',
    age: 26,
    image: 'https://images.unsplash.com/photo-1521038199265-bc482db0f923?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1521038199265-bc482db0f923?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Stuttgart',
    bio: 'Professional gamer and content creator. Streaming my adventures and building amazing gaming communities.',
    interests: ['Gaming', 'Streaming', 'Technology', 'Esports', 'Community Building'],
    online: true,
    lastActive: 'Online now'
  },
  {
    id: '12',
    nickname: 'LunaArtist',
    age: 24,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1546961329-78bef0414d7c?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Frankfurt',
    bio: 'Contemporary painter exploring emotions through abstract art. Gallery exhibitions and private commissions.',
    interests: ['Painting', 'Art Galleries', 'Abstract Art', 'Color Theory', 'Art History'],
    online: false,
    lastActive: '5 hours ago'
  },
  {
    id: '13',
    nickname: 'DanielDoctor',
    age: 34,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Düsseldorf',
    bio: 'Emergency medicine physician with a passion for helping others. Love outdoor activities and medical research.',
    interests: ['Medicine', 'Research', 'Hiking', 'Emergency Care', 'Volunteer Work'],
    online: true,
    lastActive: 'Online now'
  },
  {
    id: '14',
    nickname: 'MiaFashion',
    age: 25,
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Berlin',
    bio: 'Fashion stylist and trend forecaster. Creating looks that tell stories and express individuality.',
    interests: ['Fashion', 'Styling', 'Trends', 'Photography', 'Design'],
    online: false,
    lastActive: '1 hour ago'
  },
  {
    id: '15',
    nickname: 'TomChef',
    age: 29,
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Munich',
    bio: 'Michelin-starred chef specializing in modern European cuisine. Creating culinary experiences that delight.',
    interests: ['Cooking', 'Fine Dining', 'Wine Pairing', 'Food Innovation', 'Restaurant Management'],
    online: true,
    lastActive: 'Online now'
  },
  {
    id: '16',
    nickname: 'SaraWriter',
    age: 27,
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Hamburg',
    bio: 'Freelance journalist and novelist. Passionate about storytelling and investigating untold stories.',
    interests: ['Writing', 'Journalism', 'Novels', 'Research', 'Current Affairs'],
    online: false,
    lastActive: '3 hours ago'
  },
  {
    id: '17',
    nickname: 'AlexSurfer',
    age: 28,
    image: 'https://images.unsplash.com/photo-1531727991582-cfd25ce79613?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1531727991582-cfd25ce79613?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Bremen',
    bio: 'Professional surfer and marine conservationist. Riding waves while protecting our oceans.',
    interests: ['Surfing', 'Ocean Conservation', 'Marine Life', 'Travel', 'Environmental Activism'],
    online: true,
    lastActive: 'Online now'
  },
  {
    id: '18',
    nickname: 'NinaYoga',
    age: 26,
    image: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Cologne',
    bio: 'Certified yoga instructor and mindfulness coach. Helping people find inner peace and physical strength.',
    interests: ['Yoga', 'Meditation', 'Mindfulness', 'Wellness', 'Spiritual Growth'],
    online: false,
    lastActive: '2 hours ago'
  },
  {
    id: '19',
    nickname: 'RyanRock',
    age: 31,
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Leipzig',
    bio: 'Rock musician and sound engineer. Creating music that moves souls and engineering perfect sound.',
    interests: ['Rock Music', 'Sound Engineering', 'Live Concerts', 'Music Production', 'Guitar'],
    online: true,
    lastActive: 'Online now'
  },
  {
    id: '20',
    nickname: 'EvaDesigner',
    age: 25,
    image: 'https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Stuttgart',
    bio: 'UX/UI designer passionate about creating intuitive digital experiences that make a difference.',
    interests: ['UX Design', 'UI Design', 'Digital Art', 'User Research', 'Innovation'],
    online: false,
    lastActive: '4 hours ago'
  },
  {
    id: '21',
    nickname: 'LukasBiker',
    age: 33,
    image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1601412436009-d964bd02edbc?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Dresden',
    bio: 'Motorcycle enthusiast and mechanical engineer. Building custom bikes and exploring the open road.',
    interests: ['Motorcycles', 'Engineering', 'Customization', 'Road Trips', 'Mechanics'],
    online: true,
    lastActive: 'Online now'
  },
  {
    id: '22',
    nickname: 'AnnaTravel',
    age: 24,
    image: 'https://images.unsplash.com/photo-1546961329-78bef0414d7c?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1546961329-78bef0414d7c?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1559941899-ca3003e8db45?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Frankfurt',
    bio: 'Travel blogger and cultural enthusiast. Documenting adventures and connecting with locals worldwide.',
    interests: ['Travel', 'Blogging', 'Cultures', 'Languages', 'Adventure'],
    online: false,
    lastActive: '6 hours ago'
  },
  {
    id: '23',
    nickname: 'FelixScience',
    age: 30,
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Hannover',
    bio: 'Research scientist in renewable energy. Working towards a sustainable future through innovation.',
    interests: ['Renewable Energy', 'Research', 'Innovation', 'Sustainability', 'Technology'],
    online: true,
    lastActive: 'Online now'
  },
  {
    id: '24',
    nickname: 'SophieTeacher',
    age: 27,
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Nuremberg',
    bio: 'Elementary school teacher passionate about education and child development. Inspiring young minds.',
    interests: ['Education', 'Child Development', 'Reading', 'Arts & Crafts', 'Teaching'],
    online: false,
    lastActive: '1 hour ago'
  },
  {
    id: '25',
    nickname: 'JakeFitness',
    age: 28,
    image: 'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Duisburg',
    bio: 'CrossFit trainer and nutrition specialist. Helping people achieve their fitness goals and live healthier.',
    interests: ['CrossFit', 'Nutrition', 'Fitness Training', 'Health Coaching', 'Wellness'],
    online: true,
    lastActive: 'Online now'
  },
  {
    id: '26',
    nickname: 'LenaPhotographer',
    age: 26,
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1559941899-ca3003e8db45?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Wuppertal',
    bio: 'Wedding and portrait photographer capturing life\'s most precious moments with artistic vision.',
    interests: ['Photography', 'Weddings', 'Portraits', 'Art', 'Visual Storytelling'],
    online: false,
    lastActive: '2 hours ago'
  },
  {
    id: '27',
    nickname: 'PaulEngineer',
    age: 32,
    image: 'https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1601412436009-d964bd02edbc?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Bielefeld',
    bio: 'Aerospace engineer working on next-generation aircraft design. Passionate about aviation and innovation.',
    interests: ['Aerospace', 'Aviation', 'Engineering', 'Innovation', 'Technology'],
    online: true,
    lastActive: 'Online now'
  },
  {
    id: '28',
    nickname: 'JuliaDancer',
    age: 23,
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Bonn',
    bio: 'Professional ballet dancer and choreographer. Expressing emotions through movement and grace.',
    interests: ['Ballet', 'Dance', 'Choreography', 'Performance Art', 'Classical Music'],
    online: false,
    lastActive: '4 hours ago'
  },
  {
    id: '29',
    nickname: 'MarcoAthlete',
    age: 29,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Münster',
    bio: 'Professional triathlete competing internationally. Training hard and inspiring others to push their limits.',
    interests: ['Triathlon', 'Swimming', 'Cycling', 'Running', 'Competition'],
    online: true,
    lastActive: 'Online now'
  },
  {
    id: '30',
    nickname: 'LisaVet',
    age: 31,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1559941899-ca3003e8db45?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Karlsruhe',
    bio: 'Veterinarian specializing in wildlife conservation. Caring for animals and protecting endangered species.',
    interests: ['Veterinary Medicine', 'Wildlife Conservation', 'Animal Care', 'Nature', 'Environmental Protection'],
    online: false,
    lastActive: '3 hours ago'
  },
  {
    id: '31',
    nickname: 'BenArchitect',
    age: 34,
    image: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Mannheim',
    bio: 'Sustainable architect designing eco-friendly buildings. Creating spaces that harmonize with nature.',
    interests: ['Architecture', 'Sustainability', 'Green Building', 'Design', 'Urban Planning'],
    online: true,
    lastActive: 'Online now'
  },
  {
    id: '32',
    nickname: 'ClaraMedic',
    age: 28,
    image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Augsburg',
    bio: 'Pediatric nurse with a heart for helping children heal. Bringing comfort and care to young patients.',
    interests: ['Pediatric Care', 'Nursing', 'Child Health', 'Medical Care', 'Healing'],
    online: false,
    lastActive: '1 hour ago'
  },
  {
    id: '33',
    nickname: 'TimPilot',
    age: 35,
    image: 'https://images.unsplash.com/photo-1601412436009-d964bd02edbc?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1601412436009-d964bd02edbc?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Braunschweig',
    bio: 'Commercial airline pilot with a passion for aviation and exploring the world from above.',
    interests: ['Aviation', 'Flying', 'Travel', 'Technology', 'Adventure'],
    online: true,
    lastActive: 'Online now'
  },
  {
    id: '34',
    nickname: 'KateLawyer',
    age: 30,
    image: 'https://images.unsplash.com/photo-1559941899-ca3003e8db45?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1559941899-ca3003e8db45?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Kiel',
    bio: 'Human rights lawyer fighting for justice and equality. Dedicated to making the world a fairer place.',
    interests: ['Law', 'Human Rights', 'Justice', 'Social Change', 'Advocacy'],
    online: false,
    lastActive: '2 hours ago'
  },
  {
    id: '35',
    nickname: 'RobertChef',
    age: 33,
    image: 'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Erfurt',
    bio: 'Pastry chef specializing in artisanal desserts. Creating sweet masterpieces that bring joy to every bite.',
    interests: ['Pastry', 'Baking', 'Desserts', 'Culinary Arts', 'Food Presentation'],
    online: true,
    lastActive: 'Online now'
  },
  {
    id: '36',
    nickname: 'AmyTherapist',
    age: 29,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1559941899-ca3003e8db45?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Mainz',
    bio: 'Clinical psychologist helping people overcome challenges and find their path to mental wellness.',
    interests: ['Psychology', 'Mental Health', 'Therapy', 'Wellness', 'Personal Growth'],
    online: false,
    lastActive: '5 hours ago'
  },
  {
    id: '37',
    nickname: 'SteveCoach',
    age: 36,
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1601412436009-d964bd02edbc?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Magdeburg',
    bio: 'Life coach and motivational speaker empowering people to achieve their dreams and live authentically.',
    interests: ['Life Coaching', 'Motivation', 'Personal Development', 'Speaking', 'Leadership'],
    online: true,
    lastActive: 'Online now'
  },
  {
    id: '38',
    nickname: 'RachelScientist',
    age: 27,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Rostock',
    bio: 'Marine biologist researching coral reef conservation. Diving deep to protect our ocean ecosystems.',
    interests: ['Marine Biology', 'Conservation', 'Scuba Diving', 'Research', 'Ocean Protection'],
    online: false,
    lastActive: '3 hours ago'
  },
  {
    id: '39',
    nickname: 'KevinArtist',
    age: 25,
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1601412436009-d964bd02edbc?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Potsdam',
    bio: 'Street artist and muralist transforming urban spaces with vibrant, meaningful art.',
    interests: ['Street Art', 'Murals', 'Urban Art', 'Spray Painting', 'Community Art'],
    online: true,
    lastActive: 'Online now'
  },
  {
    id: '40',
    nickname: 'GraceMusician',
    age: 26,
    image: 'https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Oldenburg',
    bio: 'Professional pianist and composer creating emotional journeys through classical and contemporary music.',
    interests: ['Piano', 'Classical Music', 'Composition', 'Music Theory', 'Performance'],
    online: false,
    lastActive: '1 hour ago'
  },
  {
    id: '41',
    nickname: 'JohnTrainer',
    age: 32,
    image: 'https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Osnabrück',
    bio: 'Personal trainer and fitness influencer motivating people to transform their lives through fitness.',
    interests: ['Personal Training', 'Fitness', 'Bodybuilding', 'Nutrition', 'Motivation'],
    online: true,
    lastActive: 'Online now'
  },
  {
    id: '42',
    nickname: 'EllaWildlife',
    age: 28,
    image: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Lübeck',
    bio: 'Wildlife photographer documenting endangered species and raising awareness about conservation.',
    interests: ['Wildlife Photography', 'Conservation', 'Nature', 'Travel', 'Environmental Activism'],
    online: false,
    lastActive: '2 hours ago'
  },
  {
    id: '43',
    nickname: 'MattCoder',
    age: 27,
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Freiburg',
    bio: 'Full-stack developer creating innovative web applications and contributing to open-source projects.',
    interests: ['Programming', 'Web Development', 'Open Source', 'Technology', 'Innovation'],
    online: true,
    lastActive: 'Online now'
  },
  {
    id: '44',
    nickname: 'VioletFlorist',
    age: 24,
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Göttingen',
    bio: 'Creative florist designing beautiful arrangements and bringing nature\'s beauty into special occasions.',
    interests: ['Floral Design', 'Gardening', 'Nature', 'Art', 'Weddings'],
    online: false,
    lastActive: '4 hours ago'
  },
  {
    id: '45',
    nickname: 'BradClimber',
    age: 30,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Würzburg',
    bio: 'Professional rock climber and outdoor guide leading adventures in Germany\'s most beautiful landscapes.',
    interests: ['Rock Climbing', 'Mountaineering', 'Outdoor Guide', 'Adventure', 'Nature'],
    online: true,
    lastActive: 'Online now'
  },
  {
    id: '46',
    nickname: 'ChloeJournalist',
    age: 26,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1559941899-ca3003e8db45?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Ulm',
    bio: 'Investigative journalist uncovering important stories and giving voice to the voiceless.',
    interests: ['Journalism', 'Investigation', 'Writing', 'Current Affairs', 'Social Justice'],
    online: false,
    lastActive: '3 hours ago'
  },
  {
    id: '47',
    nickname: 'OscarChef',
    age: 31,
    image: 'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Regensburg',
    bio: 'Sous chef at a top restaurant, passionate about fusion cuisine and culinary innovation.',
    interests: ['Fusion Cuisine', 'Culinary Innovation', 'Fine Dining', 'Food Art', 'Gastronomy'],
    online: true,
    lastActive: 'Online now'
  },
  {
    id: '48',
    nickname: 'IvyDesigner',
    age: 25,
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1559941899-ca3003e8db45?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Wolfsburg',
    bio: 'Graphic designer creating visual identities for brands and helping businesses tell their stories.',
    interests: ['Graphic Design', 'Branding', 'Visual Identity', 'Creative Direction', 'Digital Art'],
    online: false,
    lastActive: '1 hour ago'
  },
  {
    id: '49',
    nickname: 'LeoRunner',
    age: 29,
    image: 'https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1601412436009-d964bd02edbc?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Ingolstadt',
    bio: 'Marathon runner and running coach inspiring others to achieve their personal best.',
    interests: ['Marathon Running', 'Endurance Training', 'Coaching', 'Fitness', 'Mental Strength'],
    online: true,
    lastActive: 'Online now'
  },
  {
    id: '50',
    nickname: 'RubyBaker',
    age: 27,
    image: 'https://images.unsplash.com/photo-1546961329-78bef0414d7c?w=400&h=600&fit=crop&crop=face',
    images: [
      'https://images.unsplash.com/photo-1546961329-78bef0414d7c?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1559941899-ca3003e8db45?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&h=600&fit=crop&crop=face'
    ],
    location: 'Heilbronn',
    bio: 'Artisan baker specializing in traditional German breads and modern pastries.',
    interests: ['Artisan Baking', 'Traditional Recipes', 'Bread Making', 'Pastries', 'Culinary Heritage'],
    online: false,
    lastActive: '2 hours ago'
  }
];

export const getAllMembers = (): Member[] => members;

export const getMemberById = (id: string): Member | undefined => {
  return members.find(member => member.id === id);
};
