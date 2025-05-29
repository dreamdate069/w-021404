
export function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

export function getRandomElements<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export function generateNickname(firstName: string): string {
  const styles = [
    `${firstName}${Math.floor(Math.random() * 99) + 1}`,
    `${firstName}Berlin`,
    `${firstName}Munich`,
    `Cool${firstName}`,
    `${firstName.substring(0, 3)}${Math.floor(Math.random() * 999) + 1}`
  ]
  return getRandomElement(styles)
}

export function generateBio(nickname: string, age: number, occupation: string, location: string, interests: string[]): string {
  const templates = [
    `Hallo! I'm ${nickname}, ${age} years old and working as a ${occupation} in ${location}. I love ${interests.slice(0, 3).join(', ')} and enjoy exploring Germany's beautiful landscapes. Looking for genuine connections!`,
    `${nickname} here! Living in ${location} as a ${occupation}. Passionate about ${interests.slice(0, 2).join(' and ')}. Always up for discovering new places in Germany and meeting interesting people.`,
    `Hi there! I'm ${nickname}, a ${age}-year-old ${occupation} from ${location}. My hobbies include ${interests.slice(0, 3).join(', ')}. Love the German culture and outdoor activities. Let's create some memories together!`,
    `${nickname}, ${age}, living in beautiful ${location}! Working as a ${occupation} and passionate about ${interests.slice(0, 2).join(' and ')}. Life's an adventure, especially in Germany!`
  ]
  return getRandomElement(templates)
}
