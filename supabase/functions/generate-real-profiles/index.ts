
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// International names and data
const internationalData = {
  usa: {
    maleNames: ['Michael', 'Christopher', 'Matthew', 'Joshua', 'Andrew', 'Daniel', 'Anthony', 'Mark', 'Donald', 'Steven', 'Paul', 'Kenneth', 'Joshua', 'Kevin', 'Brian', 'George', 'Timothy', 'Ronald', 'Jason', 'Edward'],
    femaleNames: ['Jessica', 'Ashley', 'Amanda', 'Sarah', 'Stephanie', 'Melissa', 'Nicole', 'Jennifer', 'Heather', 'Amy', 'Angela', 'Tiffany', 'Michelle', 'Kimberly', 'Lisa', 'Emily', 'Rachel', 'Samantha', 'Christina', 'Lauren'],
    lastNames: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'],
    cities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte', 'San Francisco', 'Indianapolis', 'Seattle', 'Denver', 'Boston']
  },
  uk: {
    maleNames: ['Oliver', 'Harry', 'George', 'Noah', 'Jack', 'Jacob', 'Leo', 'Oscar', 'Charlie', 'Muhammad', 'Henry', 'William', 'Alfie', 'Joshua', 'Thomas', 'James', 'Isaac', 'Edward', 'Lucas', 'Alexander'],
    femaleNames: ['Olivia', 'Amelia', 'Isla', 'Ava', 'Mia', 'Isabella', 'Sophia', 'Grace', 'Lily', 'Freya', 'Emily', 'Ivy', 'Ella', 'Rosie', 'Evie', 'Florence', 'Poppy', 'Charlotte', 'Willow', 'Evelyn'],
    lastNames: ['Smith', 'Jones', 'Taylor', 'Williams', 'Brown', 'Davies', 'Evans', 'Wilson', 'Thomas', 'Roberts', 'Johnson', 'Lewis', 'Walker', 'Robinson', 'Wood', 'Thompson', 'White', 'Watson', 'Jackson', 'Wright'],
    cities: ['London', 'Birmingham', 'Manchester', 'Glasgow', 'Liverpool', 'Edinburgh', 'Leeds', 'Sheffield', 'Bristol', 'Cardiff', 'Leicester', 'Belfast', 'Nottingham', 'Newcastle', 'Brighton', 'Portsmouth', 'Southampton', 'Reading', 'Derby', 'Plymouth']
  },
  france: {
    maleNames: ['Gabriel', 'Raphael', 'Leo', 'Louis', 'Lucas', 'Adam', 'Arthur', 'Hugo', 'Jules', 'Mael', 'Noah', 'Ethan', 'Mathis', 'Nathan', 'Theo', 'Nolan', 'Tom', 'Clement', 'Paul', 'Gabin'],
    femaleNames: ['Emma', 'Louise', 'Chloe', 'Manon', 'Ines', 'Lola', 'Mila', 'Camille', 'Rose', 'Lea', 'Zoe', 'Alice', 'Elena', 'Lina', 'Jade', 'Clara', 'Marie', 'Ambre', 'Anna', 'Romy'],
    lastNames: ['Martin', 'Bernard', 'Thomas', 'Petit', 'Robert', 'Richard', 'Durand', 'Dubois', 'Moreau', 'Laurent', 'Simon', 'Michel', 'Lefebvre', 'Leroy', 'Roux', 'David', 'Bertrand', 'Morel', 'Fournier', 'Girard'],
    cities: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Montpellier', 'Strasbourg', 'Bordeaux', 'Lille', 'Rennes', 'Reims', 'Saint-Etienne', 'Toulon', 'Le Havre', 'Grenoble', 'Dijon', 'Angers', 'Nimes', 'Villeurbanne']
  },
  spain: {
    maleNames: ['Hugo', 'Mateo', 'Martin', 'Lucas', 'Leo', 'Daniel', 'Alejandro', 'Manuel', 'Pablo', 'Alvaro', 'Adrian', 'David', 'Diego', 'Mario', 'Carlos', 'Marco', 'Antonio', 'Angel', 'Jose', 'Gonzalo'],
    femaleNames: ['Lucia', 'Sofia', 'Maria', 'Martina', 'Paula', 'Julia', 'Daniela', 'Valeria', 'Alba', 'Emma', 'Carla', 'Alma', 'Olivia', 'Noa', 'Sara', 'Carmen', 'Lara', 'Claudia', 'Vera', 'Alejandra'],
    lastNames: ['Garcia', 'Rodriguez', 'Gonzalez', 'Fernandez', 'Lopez', 'Martinez', 'Sanchez', 'Perez', 'Gomez', 'Martin', 'Jimenez', 'Ruiz', 'Hernandez', 'Diaz', 'Moreno', 'Alvarez', 'Munoz', 'Romero', 'Alonso', 'Gutierrez'],
    cities: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 'Malaga', 'Murcia', 'Palma', 'Las Palmas', 'Bilbao', 'Alicante', 'Cordoba', 'Valladolid', 'Vigo', 'Gijon', 'Hospitalet', 'La Coruna', 'Granada', 'Vitoria', 'Elche']
  },
  italy: {
    maleNames: ['Leonardo', 'Francesco', 'Lorenzo', 'Alessandro', 'Andrea', 'Mattia', 'Gabriele', 'Tommaso', 'Riccardo', 'Edoardo', 'Matteo', 'Giuseppe', 'Federico', 'Antonio', 'Diego', 'Davide', 'Christian', 'Nicolò', 'Samuele', 'Pietro'],
    femaleNames: ['Sofia', 'Giulia', 'Aurora', 'Alice', 'Ginevra', 'Emma', 'Giorgia', 'Greta', 'Beatrice', 'Anna', 'Matilde', 'Vittoria', 'Noemi', 'Francesca', 'Sara', 'Azzurra', 'Iris', 'Ludovica', 'Martina', 'Gaia'],
    lastNames: ['Rossi', 'Russo', 'Ferrari', 'Esposito', 'Bianchi', 'Romano', 'Colombo', 'Ricci', 'Marino', 'Greco', 'Bruno', 'Gallo', 'Conti', 'De Luca', 'Mancini', 'Costa', 'Giordano', 'Rizzo', 'Lombardi', 'Moretti'],
    cities: ['Rome', 'Milan', 'Naples', 'Turin', 'Palermo', 'Genoa', 'Bologna', 'Florence', 'Bari', 'Catania', 'Venice', 'Verona', 'Messina', 'Padua', 'Trieste', 'Brescia', 'Taranto', 'Prato', 'Parma', 'Modena']
  },
  canada: {
    maleNames: ['Liam', 'Noah', 'Oliver', 'William', 'Benjamin', 'Lucas', 'Henry', 'Alexander', 'Mason', 'Michael', 'Ethan', 'Daniel', 'Jacob', 'Logan', 'Jackson', 'Sebastian', 'Jack', 'Owen', 'Theo', 'Aiden'],
    femaleNames: ['Olivia', 'Emma', 'Charlotte', 'Amelia', 'Ava', 'Sophia', 'Isabella', 'Mia', 'Evelyn', 'Harper', 'Luna', 'Camila', 'Gianna', 'Elizabeth', 'Eleanor', 'Ella', 'Abigail', 'Sofia', 'Avery', 'Scarlett'],
    lastNames: ['Smith', 'Brown', 'Tremblay', 'Martin', 'Roy', 'Wilson', 'MacDonald', 'Johnson', 'Taylor', 'Anderson', 'Campbell', 'Lee', 'Thompson', 'Clark', 'Lewis', 'Walker', 'Hall', 'Young', 'Allen', 'King'],
    cities: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg', 'Quebec City', 'Hamilton', 'Kitchener', 'London', 'Victoria', 'Halifax', 'Oshawa', 'Windsor', 'Saskatoon', 'St. Catharines', 'Regina', 'Sherbrooke', 'Barrie']
  },
  australia: {
    maleNames: ['Oliver', 'William', 'Jack', 'Noah', 'Thomas', 'James', 'Lucas', 'Henry', 'Ethan', 'Mason', 'Alexander', 'Jacob', 'Michael', 'Benjamin', 'Leo', 'Samuel', 'Hunter', 'Lachlan', 'Charlie', 'Max'],
    femaleNames: ['Charlotte', 'Olivia', 'Amelia', 'Isla', 'Mia', 'Grace', 'Ava', 'Zoe', 'Emma', 'Sophia', 'Chloe', 'Matilda', 'Emily', 'Ella', 'Harper', 'Ruby', 'Evie', 'Sophie', 'Lily', 'Willow'],
    lastNames: ['Smith', 'Jones', 'Williams', 'Brown', 'Wilson', 'Taylor', 'Johnson', 'White', 'Martin', 'Anderson', 'Thompson', 'Nguyen', 'Thomas', 'Walker', 'Harris', 'Lee', 'Ryan', 'Robinson', 'Kelly', 'King'],
    cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Newcastle', 'Canberra', 'Sunshine Coast', 'Wollongong', 'Geelong', 'Hobart', 'Townsville', 'Cairns', 'Darwin', 'Toowoomba', 'Ballarat', 'Bendigo', 'Albury', 'Launceston']
  },
  germany: {
    maleNames: ['Alexander', 'Andreas', 'Christian', 'Daniel', 'David', 'Florian', 'Jan', 'Johannes', 'Jonas', 'Julian', 'Kevin', 'Lars', 'Lukas', 'Marcel', 'Marco', 'Mario', 'Markus', 'Martin', 'Matthias', 'Max'],
    femaleNames: ['Alexandra', 'Andrea', 'Angela', 'Anna', 'Anne', 'Bianca', 'Carmen', 'Christina', 'Claudia', 'Diana', 'Elena', 'Eva', 'Franziska', 'Hannah', 'Jana', 'Jessica', 'Julia', 'Katharina', 'Laura', 'Lisa'],
    lastNames: ['Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Schulz', 'Hoffmann', 'Schäfer', 'Koch', 'Bauer', 'Richter', 'Klein', 'Wolf', 'Schröder', 'Neumann', 'Schwarz', 'Zimmermann'],
    cities: ['Berlin', 'Hamburg', 'München', 'Köln', 'Frankfurt am Main', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig', 'Bremen', 'Dresden', 'Hannover', 'Nürnberg', 'Duisburg', 'Bochum', 'Wuppertal', 'Bielefeld', 'Bonn', 'Münster']
  }
}

const occupations = [
  'Software Engineer', 'Teacher', 'Artist', 'Chef', 'Designer', 'Doctor', 'Writer',
  'Musician', 'Athlete', 'Accountant', 'Lawyer', 'Journalist', 'Nurse', 'Pilot',
  'Architect', 'Librarian', 'Scientist', 'Marketing Manager', 'Entrepreneur', 'Consultant',
  'Photographer', 'Therapist', 'Engineer', 'Sales Manager', 'Financial Advisor',
  'Event Planner', 'Graphic Designer', 'Real Estate Agent', 'Project Manager', 'Translator'
]

const interests = [
  'Reading', 'Hiking', 'Photography', 'Cooking', 'Traveling', 'Gaming', 'Movies',
  'Music', 'Sports', 'Dancing', 'Painting', 'Writing', 'Yoga', 'Meditation',
  'Gardening', 'Cycling', 'Swimming', 'Skiing', 'Surfing', 'Climbing',
  'Wine Tasting', 'Coffee Culture', 'Art Galleries', 'Theater', 'Concerts'
]

const educationLevels = [
  'High School', 'Vocational Training', 'Bachelor\'s Degree', 'Master\'s Degree', 
  'Doctorate', 'Some College', 'Professional Certification'
]

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

function getRandomElements<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

function generateNickname(firstName: string, country: string): string {
  const styles = [
    `${firstName}${Math.floor(Math.random() * 99) + 1}`,
    `${firstName}${country}`,
    `Cool${firstName}`,
    `${firstName.substring(0, 3)}${Math.floor(Math.random() * 999) + 1}`
  ]
  return getRandomElement(styles)
}

function generateEmail(firstName: string, lastName: string, country: string): string {
  const domains = {
    usa: ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'],
    uk: ['gmail.com', 'outlook.com', 'btinternet.com', 'sky.com'],
    france: ['gmail.com', 'orange.fr', 'wanadoo.fr', 'free.fr'],
    spain: ['gmail.com', 'outlook.com', 'hotmail.com', 'terra.es'],
    italy: ['gmail.com', 'libero.it', 'tin.it', 'alice.it'],
    canada: ['gmail.com', 'yahoo.ca', 'outlook.com', 'rogers.com'],
    australia: ['gmail.com', 'outlook.com', 'optusnet.com.au', 'bigpond.com'],
    germany: ['gmail.com', 'web.de', 'gmx.de', 't-online.de']
  }
  
  const countryDomains = domains[country as keyof typeof domains] || domains.usa
  const cleanFirst = firstName.toLowerCase().replace(/[äöüß]/g, (char) => {
    const map: { [key: string]: string } = { 'ä': 'ae', 'ö': 'oe', 'ü': 'ue', 'ß': 'ss' }
    return map[char] || char
  })
  const cleanLast = lastName.toLowerCase().replace(/[äöüß]/g, (char) => {
    const map: { [key: string]: string } = { 'ä': 'ae', 'ö': 'oe', 'ü': 'ue', 'ß': 'ss' }
    return map[char] || char
  })
  
  const styles = [
    `${cleanFirst}.${cleanLast}`,
    `${cleanFirst}${cleanLast}`,
    `${cleanFirst}.${cleanLast}${Math.floor(Math.random() * 99) + 1}`,
    `${cleanFirst}${Math.floor(Math.random() * 999) + 1}`
  ]
  
  return `${getRandomElement(styles)}@${getRandomElement(countryDomains)}`
}

function generateSecurePassword(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
  let password = ''
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password
}

async function generateBioWithAI(nickname: string, age: number, occupation: string, location: string, interests: string[], country: string): Promise<string> {
  try {
    const openRouterKey = Deno.env.get('openrouter')
    if (!openRouterKey) {
      return generateFallbackBio(nickname, age, occupation, location, interests, country)
    }

    const prompt = `Write a brief, authentic dating profile bio (2-3 sentences) for ${nickname}, a ${age}-year-old ${occupation} from ${location}, ${country}. Include interests: ${interests.slice(0, 3).join(', ')}. Make it personal, engaging, and in first person. Keep it under 150 characters.`

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openRouterKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-haiku',
        messages: [
          { role: 'user', content: prompt }
        ],
        max_tokens: 100,
        temperature: 0.7
      })
    })

    if (response.ok) {
      const data = await response.json()
      return data.choices[0]?.message?.content?.trim() || generateFallbackBio(nickname, age, occupation, location, interests, country)
    }
  } catch (error) {
    console.error('Error generating bio with AI:', error)
  }

  return generateFallbackBio(nickname, age, occupation, location, interests, country)
}

function generateFallbackBio(nickname: string, age: number, occupation: string, location: string, interests: string[], country: string): string {
  const templates = [
    `Hi! I'm ${nickname}, ${age} years old and working as a ${occupation} in ${location}. I love ${interests.slice(0, 3).join(', ')} and enjoy exploring ${country}'s beautiful places.`,
    `${nickname} here! Living in ${location} as a ${occupation}. Passionate about ${interests.slice(0, 2).join(' and ')}. Always up for discovering new places in ${country}.`,
    `Hi there! I'm ${nickname}, a ${age}-year-old ${occupation} from ${location}. My hobbies include ${interests.slice(0, 3).join(', ')}. Love the culture and lifestyle in ${country}.`
  ]
  return getRandomElement(templates)
}

async function generateConsistentImages(gender: string, age: number, ethnicity: string = 'European'): Promise<string[]> {
  const images: string[] = []
  
  try {
    const huggingfaceKey = Deno.env.get('Huggingface')
    const replicateKey = Deno.env.get('Replicate')
    
    if (!huggingfaceKey && !replicateKey) {
      console.log('No image generation APIs available, using placeholder images')
      return getPlaceholderImages(gender)
    }

    const basePrompt = `professional portrait photo of a ${age}-year-old ${ethnicity} ${gender}, attractive, friendly smile, realistic, high quality, natural lighting`
    
    const prompts = [
      `${basePrompt}, headshot, clean background`,
      `${basePrompt}, casual outdoor setting, natural pose`,
      `${basePrompt}, indoor setting, warm lighting`,
      `${basePrompt}, lifestyle photo, candid moment`
    ]

    const imageCount = Math.floor(Math.random() * 3) + 2

    for (let i = 0; i < imageCount; i++) {
      try {
        let imageUrl = null
        
        if (huggingfaceKey && i < 2) {
          imageUrl = await generateHuggingFaceImage(prompts[i], huggingfaceKey)
        }
        
        if (!imageUrl && replicateKey) {
          imageUrl = await generateReplicateImage(prompts[i], replicateKey)
        }
        
        if (imageUrl) {
          images.push(imageUrl)
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000))
      } catch (error) {
        console.error(`Error generating image ${i + 1}:`, error)
      }
    }
  } catch (error) {
    console.error('Error in generateConsistentImages:', error)
  }

  if (images.length === 0) {
    return getPlaceholderImages(gender)
  }

  return images
}

async function generateHuggingFaceImage(prompt: string, apiKey: string): Promise<string | null> {
  try {
    const response = await fetch('https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          num_inference_steps: 4,
          guidance_scale: 3.5
        }
      })
    })

    if (response.ok) {
      const imageBlob = await response.blob()
      const arrayBuffer = await imageBlob.arrayBuffer()
      const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))
      return `data:image/jpeg;base64,${base64}`
    }
  } catch (error) {
    console.error('Hugging Face API error:', error)
  }
  return null
}

async function generateReplicateImage(prompt: string, apiKey: string): Promise<string | null> {
  try {
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: "black-forest-labs/flux-schnell",
        input: {
          prompt: prompt,
          go_fast: true,
          megapixels: "1",
          aspect_ratio: "1:1",
          output_format: "webp",
          output_quality: 80,
          num_inference_steps: 4
        }
      })
    })

    if (response.ok) {
      const prediction = await response.json()
      
      let result = prediction
      for (let i = 0; i < 30; i++) {
        if (result.status === 'succeeded') {
          return result.output[0]
        }
        if (result.status === 'failed') {
          break
        }
        
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        const statusResponse = await fetch(`https://api.replicate.com/v1/predictions/${result.id}`, {
          headers: { 'Authorization': `Token ${apiKey}` }
        })
        
        if (statusResponse.ok) {
          result = await statusResponse.json()
        }
      }
    }
  } catch (error) {
    console.error('Replicate API error:', error)
  }
  return null
}

function getPlaceholderImages(gender: string): string[] {
  const maleImages = [
    '/user-uploads/profile-pics/1.png',
    '/user-uploads/profile-pics/(3).png',
    '/user-uploads/profile-pics/(4).png'
  ]
  
  const femaleImages = [
    '/user-uploads/profile-pics/Untitled design (1).png',
    '/user-uploads/profile-pics/Untitled design (3).png',
    '/user-uploads/profile-pics/Untitled design (4).png',
    '/user-uploads/profile-pics/Untitled design (5).png'
  ]
  
  const images = gender === 'male' ? maleImages : femaleImages
  const count = Math.floor(Math.random() * 3) + 2
  return images.slice(0, count)
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    console.log('Starting international user creation with full authentication...')

    // Clear existing data first
    console.log('Clearing existing data...')
    await supabase.from('profile_photos').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    await supabase.from('user_preferences').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    await supabase.from('profiles').delete().neq('id', '00000000-0000-0000-0000-000000000000')

    const createdUsers = []
    const countries = Object.keys(internationalData)
    
    // Generate 50+ diverse international users
    const totalUsers = 60
    const usersPerCountry = Math.ceil(totalUsers / countries.length)
    
    for (const country of countries) {
      const countryData = internationalData[country as keyof typeof internationalData]
      
      // Generate male users for this country
      const maleCount = Math.floor(usersPerCountry / 2)
      for (let i = 0; i < maleCount; i++) {
        const firstName = getRandomElement(countryData.maleNames)
        const lastName = getRandomElement(countryData.lastNames)
        const nickname = generateNickname(firstName, country)
        const email = generateEmail(firstName, lastName, country)
        const password = generateSecurePassword()
        const age = Math.floor(Math.random() * (45 - 22 + 1)) + 22
        const occupation = getRandomElement(occupations)
        const location = getRandomElement(countryData.cities)
        const userInterests = getRandomElements(interests, Math.floor(Math.random() * 6) + 4)
        
        console.log(`Creating ${country} male user ${i + 1}: ${email}`)
        
        try {
          const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: {
              first_name: firstName,
              last_name: lastName,
              nickname,
              gender: 'male',
              age,
              country
            }
          })

          if (authError || !authUser.user) {
            console.error('Auth user creation error:', authError)
            continue
          }

          const bio = await generateBioWithAI(nickname, age, occupation, location, userInterests, country)
          const imageUrls = await generateConsistentImages('male', age)
          
          const { error: profileError } = await supabase
            .from('profiles')
            .update({
              bio,
              location,
              occupation,
              interests: userInterests,
              education: getRandomElement(educationLevels),
              height_cm: Math.floor(Math.random() * (190 - 170 + 1)) + 170,
              is_verified: Math.random() > 0.3,
              is_online: Math.random() > 0.6,
              relationship_status: getRandomElement(['single', 'divorced']),
              looking_for: Math.random() > 0.5 ? ['dating'] : ['friendship', 'dating']
            })
            .eq('id', authUser.user.id)

          if (profileError) {
            console.error('Profile update error:', profileError)
            continue
          }

          for (let photoIndex = 0; photoIndex < imageUrls.length; photoIndex++) {
            await supabase
              .from('profile_photos')
              .insert({
                profile_id: authUser.user.id,
                photo_url: imageUrls[photoIndex],
                photo_order: photoIndex + 1,
                is_primary: photoIndex === 0
              })
          }

          await supabase
            .from('user_preferences')
            .insert({
              profile_id: authUser.user.id,
              interested_in: ['dating', 'friendship'],
              preferred_gender: ['female'],
              min_age: Math.max(18, age - 8),
              max_age: Math.min(70, age + 8),
              max_distance_km: Math.floor(Math.random() * 100) + 20
            })

          createdUsers.push({ 
            id: authUser.user.id, 
            email, 
            name: nickname, 
            gender: 'male',
            country,
            images: imageUrls.length,
            password
          })
        } catch (error) {
          console.error(`Error creating ${country} male user:`, error)
        }
      }
      
      // Generate female users for this country
      const femaleCount = usersPerCountry - maleCount
      for (let i = 0; i < femaleCount; i++) {
        const firstName = getRandomElement(countryData.femaleNames)
        const lastName = getRandomElement(countryData.lastNames)
        const nickname = generateNickname(firstName, country)
        const email = generateEmail(firstName, lastName, country)
        const password = generateSecurePassword()
        const age = Math.floor(Math.random() * (45 - 22 + 1)) + 22
        const occupation = getRandomElement(occupations)
        const location = getRandomElement(countryData.cities)
        const userInterests = getRandomElements(interests, Math.floor(Math.random() * 6) + 4)
        
        console.log(`Creating ${country} female user ${i + 1}: ${email}`)
        
        try {
          const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: {
              first_name: firstName,
              last_name: lastName,
              nickname,
              gender: 'female',
              age,
              country
            }
          })

          if (authError || !authUser.user) {
            console.error('Auth user creation error:', authError)
            continue
          }

          const bio = await generateBioWithAI(nickname, age, occupation, location, userInterests, country)
          const imageUrls = await generateConsistentImages('female', age)
          
          const { error: profileError } = await supabase
            .from('profiles')
            .update({
              bio,
              location,
              occupation,
              interests: userInterests,
              education: getRandomElement(educationLevels),
              height_cm: Math.floor(Math.random() * (175 - 155 + 1)) + 155,
              is_verified: Math.random() > 0.3,
              is_online: Math.random() > 0.6,
              relationship_status: getRandomElement(['single', 'divorced']),
              looking_for: Math.random() > 0.5 ? ['dating'] : ['friendship', 'dating']
            })
            .eq('id', authUser.user.id)

          if (profileError) {
            console.error('Profile update error:', profileError)
            continue
          }

          for (let photoIndex = 0; photoIndex < imageUrls.length; photoIndex++) {
            await supabase
              .from('profile_photos')
              .insert({
                profile_id: authUser.user.id,
                photo_url: imageUrls[photoIndex],
                photo_order: photoIndex + 1,
                is_primary: photoIndex === 0
              })
          }

          await supabase
            .from('user_preferences')
            .insert({
              profile_id: authUser.user.id,
              interested_in: ['dating', 'friendship'],
              preferred_gender: ['male'],
              min_age: Math.max(18, age - 8),
              max_age: Math.min(70, age + 8),
              max_distance_km: Math.floor(Math.random() * 100) + 20
            })

          createdUsers.push({ 
            id: authUser.user.id, 
            email, 
            name: nickname, 
            gender: 'female',
            country,
            images: imageUrls.length,
            password
          })
        } catch (error) {
          console.error(`Error creating ${country} female user:`, error)
        }
      }
    }

    console.log(`Successfully created ${createdUsers.length} international users with full authentication`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully created ${createdUsers.length} international users with real authentication accounts`,
        users: createdUsers,
        byCountry: createdUsers.reduce((acc, user) => {
          acc[user.country] = (acc[user.country] || 0) + 1
          return acc
        }, {} as Record<string, number>)
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to generate international users', details: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
