
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// German names and data
const maleNames = [
  'Alexander', 'Andreas', 'Christian', 'Daniel', 'David', 'Florian', 'Jan', 'Johannes', 
  'Jonas', 'Julian', 'Kevin', 'Lars', 'Lukas', 'Marcel', 'Marco', 'Mario', 'Markus', 
  'Martin', 'Matthias', 'Max', 'Michael', 'Niklas', 'Patrick', 'Paul', 'Peter', 
  'Philipp', 'Robert', 'Sebastian', 'Stefan', 'Thomas', 'Tim', 'Tobias'
]

const femaleNames = [
  'Alexandra', 'Andrea', 'Angela', 'Anna', 'Anne', 'Bianca', 'Carmen', 'Christina', 
  'Claudia', 'Diana', 'Elena', 'Eva', 'Franziska', 'Hannah', 'Jana', 'Jessica', 
  'Julia', 'Katharina', 'Katrin', 'Laura', 'Lena', 'Lisa', 'Maria', 'Marina', 
  'Melanie', 'Michelle', 'Nadine', 'Nicole', 'Petra', 'Sabine', 'Sandra', 'Stefanie'
]

const lastNames = [
  'Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker',
  'Schulz', 'Hoffmann', 'Schäfer', 'Koch', 'Bauer', 'Richter', 'Klein', 'Wolf',
  'Schröder', 'Neumann', 'Schwarz', 'Zimmermann', 'Braun', 'Krüger', 'Hofmann',
  'Hartmann', 'Lange', 'Schmitt', 'Werner', 'Schmitz', 'Krause', 'Meier'
]

const germanCities = [
  'Berlin', 'Hamburg', 'München', 'Köln', 'Frankfurt am Main', 'Stuttgart', 
  'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig', 'Bremen', 'Dresden', 'Hannover',
  'Nürnberg', 'Duisburg', 'Bochum', 'Wuppertal', 'Bielefeld', 'Bonn', 'Münster'
]

const occupations = [
  'Software Engineer', 'Teacher', 'Artist', 'Chef', 'Designer', 'Doctor', 'Writer',
  'Musician', 'Athlete', 'Accountant', 'Lawyer', 'Journalist', 'Nurse', 'Pilot',
  'Architect', 'Librarian', 'Scientist', 'Marketing Manager', 'Entrepreneur', 'Consultant'
]

const interests = [
  'Reading', 'Hiking', 'Photography', 'Cooking', 'Traveling', 'Gaming', 'Movies',
  'Music', 'Sports', 'Dancing', 'Painting', 'Writing', 'Yoga', 'Meditation',
  'Gardening', 'Cycling', 'Swimming', 'Skiing', 'Surfing', 'Climbing'
]

const educationLevels = [
  'High School', 'Vocational Training', 'Bachelor\'s Degree', 'Master\'s Degree', 
  'Doctorate', 'Some College'
]

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

function getRandomElements<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

function generateNickname(firstName: string): string {
  const styles = [
    `${firstName}${Math.floor(Math.random() * 99) + 1}`,
    `${firstName}Berlin`,
    `${firstName}Munich`,
    `Cool${firstName}`,
    `${firstName.substring(0, 3)}${Math.floor(Math.random() * 999) + 1}`
  ]
  return getRandomElement(styles)
}

function generateEmail(firstName: string, lastName: string): string {
  const domains = ['gmail.com', 'web.de', 'gmx.de', 't-online.de', 'outlook.de']
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
  
  return `${getRandomElement(styles)}@${getRandomElement(domains)}`
}

function generateSecurePassword(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
  let password = ''
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password
}

async function generateBioWithAI(nickname: string, age: number, occupation: string, location: string, interests: string[]): Promise<string> {
  try {
    const openRouterKey = Deno.env.get('openrouter')
    if (!openRouterKey) {
      return generateFallbackBio(nickname, age, occupation, location, interests)
    }

    const prompt = `Write a brief, authentic dating profile bio (2-3 sentences) for ${nickname}, a ${age}-year-old ${occupation} from ${location}, Germany. Include interests: ${interests.slice(0, 3).join(', ')}. Make it personal, engaging, and in first person. Keep it under 150 characters.`

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
      return data.choices[0]?.message?.content?.trim() || generateFallbackBio(nickname, age, occupation, location, interests)
    }
  } catch (error) {
    console.error('Error generating bio with AI:', error)
  }

  return generateFallbackBio(nickname, age, occupation, location, interests)
}

function generateFallbackBio(nickname: string, age: number, occupation: string, location: string, interests: string[]): string {
  const templates = [
    `Hi! I'm ${nickname}, ${age} years old and working as a ${occupation} in ${location}. I love ${interests.slice(0, 3).join(', ')} and enjoy exploring Germany's beautiful landscapes.`,
    `${nickname} here! Living in ${location} as a ${occupation}. Passionate about ${interests.slice(0, 2).join(' and ')}. Always up for discovering new places in Germany.`,
    `Hi there! I'm ${nickname}, a ${age}-year-old ${occupation} from ${location}. My hobbies include ${interests.slice(0, 3).join(', ')}. Love the German culture and outdoor activities.`
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

    // Generate a consistent character description
    const basePrompt = `professional portrait photo of a ${age}-year-old ${ethnicity} ${gender}, attractive, friendly smile, realistic, high quality, natural lighting`
    
    // Generate multiple poses/styles of the same person
    const prompts = [
      `${basePrompt}, headshot, clean background`,
      `${basePrompt}, casual outdoor setting, natural pose`,
      `${basePrompt}, indoor setting, warm lighting`,
      `${basePrompt}, lifestyle photo, candid moment`
    ]

    const imageCount = Math.floor(Math.random() * 3) + 2 // 2-4 images

    for (let i = 0; i < imageCount; i++) {
      try {
        let imageUrl = null
        
        // Try Hugging Face first
        if (huggingfaceKey && i < 2) {
          imageUrl = await generateHuggingFaceImage(prompts[i], huggingfaceKey)
        }
        
        // Try Replicate as fallback or for additional images
        if (!imageUrl && replicateKey) {
          imageUrl = await generateReplicateImage(prompts[i], replicateKey)
        }
        
        if (imageUrl) {
          images.push(imageUrl)
        }
        
        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000))
      } catch (error) {
        console.error(`Error generating image ${i + 1}:`, error)
      }
    }
  } catch (error) {
    console.error('Error in generateConsistentImages:', error)
  }

  // If no AI images were generated, use placeholders
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
      
      // Poll for completion
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
  const count = Math.floor(Math.random() * 3) + 2 // 2-4 images
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

    console.log('Starting authentic German user creation with full authentication...')

    // Clear existing data first
    console.log('Clearing existing data...')
    await supabase.from('profile_photos').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    await supabase.from('user_preferences').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    await supabase.from('profiles').delete().neq('id', '00000000-0000-0000-0000-000000000000')

    const createdUsers = []
    
    // Generate 25 male users
    for (let i = 0; i < 25; i++) {
      const firstName = getRandomElement(maleNames)
      const lastName = getRandomElement(lastNames)
      const nickname = generateNickname(firstName)
      const email = generateEmail(firstName, lastName)
      const password = generateSecurePassword()
      const age = Math.floor(Math.random() * (45 - 22 + 1)) + 22
      const occupation = getRandomElement(occupations)
      const location = getRandomElement(germanCities)
      const userInterests = getRandomElements(interests, Math.floor(Math.random() * 6) + 4)
      
      console.log(`Creating authentic male user ${i + 1}: ${email}`)
      
      // Create authenticated user first
      const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true, // Auto-confirm email
        user_metadata: {
          first_name: firstName,
          last_name: lastName,
          nickname,
          gender: 'male',
          age
        }
      })

      if (authError) {
        console.error('Auth user creation error:', authError)
        continue
      }

      if (!authUser.user) {
        console.error('No user returned from auth creation')
        continue
      }

      // Generate AI bio
      const bio = await generateBioWithAI(nickname, age, occupation, location, userInterests)
      
      // Generate consistent images
      const imageUrls = await generateConsistentImages('male', age)
      
      // Update the profile created by the trigger
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

      // Add generated photos
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

      // Create user preferences
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
        images: imageUrls.length,
        password // Include for reference (remove in production)
      })
    }

    // Generate 25 female users
    for (let i = 0; i < 25; i++) {
      const firstName = getRandomElement(femaleNames)
      const lastName = getRandomElement(lastNames)
      const nickname = generateNickname(firstName)
      const email = generateEmail(firstName, lastName)
      const password = generateSecurePassword()
      const age = Math.floor(Math.random() * (45 - 22 + 1)) + 22
      const occupation = getRandomElement(occupations)
      const location = getRandomElement(germanCities)
      const userInterests = getRandomElements(interests, Math.floor(Math.random() * 6) + 4)
      
      console.log(`Creating authentic female user ${i + 1}: ${email}`)
      
      // Create authenticated user first
      const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true, // Auto-confirm email
        user_metadata: {
          first_name: firstName,
          last_name: lastName,
          nickname,
          gender: 'female',
          age
        }
      })

      if (authError) {
        console.error('Auth user creation error:', authError)
        continue
      }

      if (!authUser.user) {
        console.error('No user returned from auth creation')
        continue
      }

      // Generate AI bio
      const bio = await generateBioWithAI(nickname, age, occupation, location, userInterests)
      
      // Generate consistent images
      const imageUrls = await generateConsistentImages('female', age)
      
      // Update the profile created by the trigger
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

      // Add generated photos
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

      // Create user preferences
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
        images: imageUrls.length,
        password // Include for reference (remove in production)
      })
    }

    console.log(`Successfully created ${createdUsers.length} authentic German users with full authentication`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully created ${createdUsers.length} authentic German users with real authentication accounts`,
        users: createdUsers
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to generate authentic users', details: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
