
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  authorId: string;
  date: string;
  comments: number;
  likes: number;
  category: string;
  readTime: number;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "5 Tips for Creating an Authentic Dating Profile",
    excerpt: "Learn how to showcase the real you and attract meaningful connections with these expert tips...",
    content: "Creating an authentic dating profile is the foundation of successful online dating. Here are my top 5 tips: 1) Use recent, genuine photos that show your personality. 2) Write a bio that reflects your true interests and values. 3) Be specific about what you're looking for. 4) Show, don't just tell - include examples of your hobbies. 5) Be honest about your lifestyle and expectations. Remember, authenticity attracts the right people!",
    image: "/lovable-uploads/ab2b4a57-9177-4693-9a88-23d89544a07b.png",
    author: "SophiaBloom",
    authorId: "1",
    date: "May 2, 2023",
    comments: 24,
    likes: 89,
    category: "Dating Tips",
    readTime: 5
  },
  {
    id: 2,
    title: "The Psychology Behind Successful Relationships",
    excerpt: "Understanding attachment styles and communication patterns can dramatically improve your connections...",
    content: "Successful relationships are built on understanding. As someone who's studied human psychology, I've learned that attachment styles play a huge role in how we connect. Secure attachment leads to healthier relationships, while anxious or avoidant styles can create challenges. The key is awareness and communication. When you understand your own patterns and those of your partner, you can work together to create a stronger bond.",
    image: "/lovable-uploads/6d9b54c2-64d4-44f3-959b-b0c71fff7a04.png",
    author: "AmyTherapist",
    authorId: "36",
    date: "April 15, 2023",
    comments: 42,
    likes: 156,
    category: "Relationships",
    readTime: 8
  },
  {
    id: 3,
    title: "Dating Across Cultures: Embracing Differences",
    excerpt: "How cultural diversity can enrich your relationship and broaden your horizons when dating...",
    content: "As a travel blogger who's dated across different cultures, I've learned that diversity in relationships brings incredible richness. Different cultural backgrounds offer new perspectives on love, family, and life goals. The key is approaching differences with curiosity rather than judgment. Learn about each other's traditions, try new foods together, and celebrate what makes you unique while finding common ground.",
    image: "/lovable-uploads/7973c816-d414-4bfa-b312-1407036a6e21.png",
    author: "AnnaTravel",
    authorId: "22",
    date: "March 28, 2023",
    comments: 18,
    likes: 73,
    category: "Cultural Dating",
    readTime: 6
  },
  {
    id: 4,
    title: "Finding Love in the Digital Age: Navigating Online Dating",
    excerpt: "The landscape of dating has transformed dramatically over the past decade. With most romantic connections now beginning online...",
    content: "Online dating has revolutionized how we meet potential partners. As a journalist covering modern relationships, I've seen both the challenges and opportunities it presents. The key is treating online dating as a tool, not a replacement for genuine connection. Use it to meet people you wouldn't normally encounter, but don't forget the importance of real-world chemistry and face-to-face interaction.",
    image: "/lovable-uploads/e50ff5ee-d6a3-49e9-b666-e7f48dfdfb8b.png",
    author: "ChloeJournalist",
    authorId: "46",
    date: "May 10, 2023",
    comments: 36,
    likes: 124,
    category: "Online Dating",
    readTime: 7
  },
  {
    id: 5,
    title: "Adventure Dating: Finding Love Through Shared Experiences",
    excerpt: "Why outdoor adventures create the perfect setting for meaningful connections and lasting relationships...",
    content: "Some of my best dates have been on mountain trails or rock climbing walls. Adventure dating removes the pressure of traditional dinner dates and reveals character in authentic ways. When you're facing challenges together, whether it's navigating a hiking trail or learning to surf, you see how someone handles stress, supports others, and embraces new experiences. These shared adventures create bonds that last.",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=400&fit=crop",
    author: "LiamAdventure",
    authorId: "3",
    date: "April 22, 2023",
    comments: 31,
    likes: 98,
    category: "Adventure Dating",
    readTime: 5
  },
  {
    id: 6,
    title: "The Art of Digital Communication in Modern Romance",
    excerpt: "Mastering the nuances of texting, video calls, and social media in romantic relationships...",
    content: "As a software engineer who met my partner online, I understand the importance of digital communication in modern dating. The key is finding balance - use technology to stay connected, but don't let it replace meaningful in-person interaction. Be authentic in your messages, respect response times, and remember that tone can be easily misunderstood in text. Video calls are great for maintaining connection between dates.",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600&h=400&fit=crop",
    author: "NoahTech",
    authorId: "5",
    date: "March 15, 2023",
    comments: 22,
    likes: 67,
    category: "Digital Dating",
    readTime: 6
  },
  {
    id: 7,
    title: "Wellness and Dating: Bringing Your Best Self to Relationships",
    excerpt: "How self-care and mindfulness practices can transform your dating experience and attract healthier connections...",
    content: "Your relationship with yourself sets the foundation for all other relationships. Through yoga and mindfulness practice, I've learned that when you're centered and confident in who you are, you naturally attract people who appreciate your authentic self. Prioritize your mental and physical health, practice self-compassion, and approach dating from a place of abundance rather than need.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop",
    author: "EmmaRose",
    authorId: "2",
    date: "May 1, 2023",
    comments: 45,
    likes: 132,
    category: "Wellness",
    readTime: 7
  },
  {
    id: 8,
    title: "Creative Dates: Beyond Dinner and Movies",
    excerpt: "Inspiring date ideas that showcase personality and create memorable experiences together...",
    content: "As an artist, I believe creativity should extend to dating. Some of my favorite dates have involved painting together, visiting galleries, or collaborating on a creative project. These experiences reveal so much more about a person than traditional dates. Try cooking a meal together, attending a pottery class, or exploring street art in your city. Creative dates are conversation starters and memory makers.",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop",
    author: "IsabellaArt",
    authorId: "4",
    date: "April 8, 2023",
    comments: 28,
    likes: 85,
    category: "Date Ideas",
    readTime: 5
  },
  {
    id: 9,
    title: "Food as a Love Language: Culinary Dating Adventures",
    excerpt: "Discovering compatibility through shared meals and cooking experiences...",
    content: "Food has always been my love language. Some of the most intimate moments happen in the kitchen - cooking together, sharing family recipes, or discovering new flavors. Food dates reveal cultural backgrounds, dietary preferences, and even relationship dynamics. Whether you're taking a cooking class together or exploring local farmers markets, culinary adventures create delicious memories and deeper connections.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
    author: "AvaChef",
    authorId: "6",
    date: "March 20, 2023",
    comments: 38,
    likes: 107,
    category: "Food & Dating",
    readTime: 6
  },
  {
    id: 10,
    title: "Long-Distance Love: Making Digital Romance Work",
    excerpt: "Strategies for maintaining intimacy and connection across miles in modern relationships...",
    content: "Long-distance relationships require extra creativity and commitment, but they can be incredibly rewarding. As someone who's navigated love across continents, I've learned that communication is everything. Schedule regular video dates, send thoughtful messages, and plan visits to look forward to. Use technology creatively - watch movies together online, play games, or take virtual tours. The effort you put in shows true dedication.",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600&h=400&fit=crop",
    author: "SaraWriter",
    authorId: "16",
    date: "April 12, 2023",
    comments: 33,
    likes: 91,
    category: "Long Distance",
    readTime: 8
  },
  {
    id: 11,
    title: "Fitness and Dating: Working Out Together",
    excerpt: "How shared fitness goals can strengthen relationships and create healthier lifestyle habits...",
    content: "Working out with a partner isn't just about physical health - it's about supporting each other's goals and building trust. As a personal trainer, I've seen couples transform together through fitness. Whether it's morning runs, gym sessions, or trying new sports, exercising together creates accountability and shared accomplishments. Plus, those endorphins make everything more fun!",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
    author: "EthanFit",
    authorId: "7",
    date: "March 25, 2023",
    comments: 26,
    likes: 78,
    category: "Fitness Dating",
    readTime: 5
  },
  {
    id: 12,
    title: "Literary Love: Bonding Through Books and Stories",
    excerpt: "How shared reading experiences and storytelling can deepen romantic connections...",
    content: "There's something magical about sharing stories with someone you care about. Book clubs, poetry readings, or simply reading the same novel can spark incredible conversations about life, values, and dreams. As a literature teacher, I've found that the books we love reveal so much about who we are. Consider starting a two-person book club with your partner - it's intellectual intimacy at its finest.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop",
    author: "CharlotteBooks",
    authorId: "8",
    date: "April 18, 2023",
    comments: 19,
    likes: 64,
    category: "Intellectual Dating",
    readTime: 6
  },
  {
    id: 13,
    title: "Music and Romance: Creating Your Love Soundtrack",
    excerpt: "The role of music in relationships and how to create meaningful musical experiences together...",
    content: "Music has the power to transport us to specific moments and emotions. As a musician, I believe every relationship deserves its own soundtrack. Share your favorite songs, attend concerts together, or even create music if you're both musically inclined. Music dates can be as simple as a vinyl listening session or as elaborate as learning to dance together. Let music be the thread that weaves through your love story.",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
    author: "OliverMusic",
    authorId: "9",
    date: "May 5, 2023",
    comments: 41,
    likes: 119,
    category: "Music & Dating",
    readTime: 7
  },
  {
    id: 14,
    title: "Ocean Love: Dating by the Water",
    excerpt: "Why coastal and water-based dates create romantic magic and lasting memories...",
    content: "There's something inherently romantic about water - whether it's ocean waves, a quiet lake, or even a fountain in the city. As a marine biology student, I've had countless beautiful moments by the water with people I care about. Beach walks, sunset picnics, or boat rides create a natural backdrop for intimate conversations. The rhythm of water has a calming effect that helps people open up and connect.",
    image: "https://images.unsplash.com/photo-1502780402662-acc01917424e?w=600&h=400&fit=crop",
    author: "ZoeExplorer",
    authorId: "10",
    date: "March 30, 2023",
    comments: 34,
    likes: 95,
    category: "Nature Dating",
    readTime: 5
  },
  {
    id: 15,
    title: "Gaming Together: Finding Love in Virtual Worlds",
    excerpt: "How online gaming can bring couples together and create shared adventures...",
    content: "Don't underestimate the power of gaming in relationships! Some of my strongest connections have been forged through cooperative gameplay. Whether you're solving puzzles together, competing in friendly matches, or exploring virtual worlds, gaming reveals problem-solving skills, teamwork, and how someone handles both victory and defeat. It's also incredibly fun and accessible - you can game together from anywhere!",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop",
    author: "MaxGamer",
    authorId: "11",
    date: "April 25, 2023",
    comments: 29,
    likes: 82,
    category: "Gaming",
    readTime: 6
  }
];

export const getBlogPosts = (): BlogPost[] => blogPosts;

export const getBlogPostById = (id: number): BlogPost | undefined => {
  return blogPosts.find(post => post.id === id);
};

export const getBlogPostsByAuthor = (authorId: string): BlogPost[] => {
  return blogPosts.filter(post => post.authorId === authorId);
};

export const getBlogPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(post => post.category === category);
};
