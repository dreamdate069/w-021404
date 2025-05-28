import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import { HfInference } from 'https://esm.sh/@huggingface/inference@2.3.2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// German names data
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

const nicknameStyles = [
  'Cool', 'Sweet', 'Wild', 'Happy', 'Sunny', 'Free', 'Bold', 'Cute', 'Smart', 'Fun',
  'Dreamy', 'Lucky', 'Bright', 'Swift', 'Calm', 'Brave', 'Kind', 'Pure', 'True', 'Wise'
]

const cities = [
  'Berlin', 'Hamburg', 'München', 'Köln', 'Frankfurt am Main', 'Stuttgart', 
  'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig', 'Bremen', 'Dresden', 'Hannover',
  'Nürnberg', 'Duisburg', 'Bochum', 'Wuppertal', 'Bielefeld', 'Bonn', 'Münster'
]

const occupations = [
  'Software Engineer', 'Teacher', 'Artist', 'Chef', 'Designer', 'Doctor', 'Writer',
  'Musician', 'Athlete', 'Accountant', 'Lawyer', 'Journalist', 'Nurse', 'Pilot',
  'Architect', 'Librarian', 'Scientist', 'Politician', 'Entrepreneur', 'Consultant'
]

const interests = [
  'Reading', 'Hiking', 'Photography', 'Cooking', 'Traveling', 'Gaming', 'Movies',
  'Music', 'Sports', 'Dancing', 'Painting', 'Writing', 'Yoga', 'Meditation',
  'Gardening', 'Cycling', 'Swimming', 'Skiing', 'Surfing', 'Climbing', 'Fishing',
  'Camping', 'Running', 'Volunteering', 'Learning new languages'
]

const educationLevels = [
  'High School', 'Bachelor\'s Degree', 'Master\'s Degree', 'Doctorate', 'Associate\'s Degree',
  'Vocational School', 'Some College', 'No Formal Education'
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
    `${getRandomElement(nicknameStyles)}${firstName}`,
    `${firstName}${getRandomElement(nicknameStyles)}`,
    `${firstName.substring(0, 3)}${getRandomElement(nicknameStyles)}`,
    `${getRandomElement(nicknameStyles)}${Math.floor(Math.random() * 999) + 1}`
  ]
  return getRandomElement(styles)
}

function generateBio(nickname: string, age: number, occupation: string, interests: string[]): string {
  const templates = [
    `Hi, I'm ${nickname}! I'm ${age} years old and work as a ${occupation}. I love ${interests.slice(0, 3).join(', ')} and always looking for new adventures. Let's explore life together!`,
    `${nickname} here, ${age} years young and passionate about life! As a ${occupation}, I find joy in my work, but I also love ${interests.slice(0, 2).join(' and ')}. Looking for someone special to share experiences with.`,
    `Hello! I'm ${nickname}, a ${age}-year-old ${occupation} who believes in living life to the fullest. My interests include ${interests.slice(0, 3).join(', ')}. I'm here to meet genuine people and create meaningful connections.`,
    `${nickname}, ${age}, ${occupation} by day, adventure seeker by night! I'm passionate about ${interests.slice(0, 2).join(' and ')}, and I love meeting new people. Life's too short not to enjoy every moment!`
  ]
  return getRandomElement(templates)
}

const generateProfileImage = async (gender: string, age: number): Promise<string> => {
  const hf = new HfInference(Deno.env.get('HF_API_KEY'))

  const prompt = `Generate a realistic photo of a ${age}-year-old ${gender}, clear face, natural lighting, professional headshot`
  
  console.log('Generating image with prompt:', prompt)

  const result = await hf.textToImage({
    model: 'stabilityai/stable-diffusion-2',
    inputs: prompt,
  }) as any

  if (!result) {
    throw new Error('Failed to generate image')
  }

  const arrayBuffer = await result.arrayBuffer()
  const blob = new Blob([arrayBuffer], { type: "image/png" })
  const base64Image = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })

  console.log('Image generated successfully')
  return base64Image
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    console.log('Starting profile generation...')

    const profiles = []
    
    // Generate 25 male profiles
    for (let i = 0; i < 25; i++) {
      const firstName = getRandomElement(maleNames)
      const lastName = getRandomElement(lastNames)
      const nickname = generateNickname(firstName)
      const age = Math.floor(Math.random() * (55 - 21 + 1)) + 21
      const occupation = getRandomElement(occupations)
      const userInterests = getRandomElements(interests, Math.floor(Math.random() * 6) + 3)
      const bio = generateBio(nickname, age, occupation, userInterests)
      
      console.log(`Creating male profile ${i + 1}: ${nickname}`)
      
      // Create user in auth.users
      const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
        email: `${nickname.toLowerCase()}${i}@dreamdate.de`,
        password: 'TempPass123!',
        email_confirm: true,
        user_metadata: {
          first_name: firstName,
          last_name: lastName,
          nickname: nickname,
          gender: 'male',
          age: age
        }
      })

      if (authError) {
        console.error('Auth error:', authError)
        continue
      }

      // Generate profile image
      const profileImage = await generateProfileImage('male', age)
      
      // Update profile with complete data
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          nickname,
          bio,
          location: getRandomElement(cities),
          occupation,
          interests: userInterests,
          education: getRandomElement(educationLevels),
          height_cm: Math.floor(Math.random() * (190 - 170 + 1)) + 170,
          profile_pic_url: profileImage,
          is_verified: Math.random() > 0.3,
          is_online: Math.random() > 0.6
        })
        .eq('id', authUser.user.id)

      if (profileError) {
        console.error('Profile error:', profileError)
        continue
      }

      // Create user preferences
      const { error: preferencesError } = await supabase
        .from('user_preferences')
        .insert({
          profile_id: authUser.user.id,
          interested_in: ['female'],
          min_age: age - 5,
          max_age: age + 5,
          max_distance_km: Math.floor(Math.random() * 100) + 10
        })

      if (preferencesError) {
        console.error('Preferences error:', preferencesError)
        continue
      }

      profiles.push({ id: authUser.user.id, name: nickname, gender: 'male' })
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000))
    }

    // Generate 25 female profiles
    for (let i = 0; i < 25; i++) {
      const firstName = getRandomElement(femaleNames)
      const lastName = getRandomElement(lastNames)
      const nickname = generateNickname(firstName)
      const age = Math.floor(Math.random() * (55 - 21 + 1)) + 21
      const occupation = getRandomElement(occupations)
      const userInterests = getRandomElements(interests, Math.floor(Math.random() * 6) + 3)
      const bio = generateBio(nickname, age, occupation, userInterests)
      
      console.log(`Creating female profile ${i + 1}: ${nickname}`)
      
      // Create user in auth.users
      const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
        email: `${nickname.toLowerCase()}${i}@dreamdate.de`,
        password: 'TempPass123!',
        email_confirm: true,
        user_metadata: {
          first_name: firstName,
          last_name: lastName,
          nickname: nickname,
          gender: 'female',
          age: age
        }
      })

      if (authError) {
        console.error('Auth error:', authError)
        continue
      }

      // Generate profile image
      const profileImage = await generateProfileImage('female', age)
      
      // Update profile with complete data
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          nickname,
          bio,
          location: getRandomElement(cities),
          occupation,
          interests: userInterests,
          education: getRandomElement(educationLevels),
          height_cm: Math.floor(Math.random() * (175 - 155 + 1)) + 155,
          profile_pic_url: profileImage,
          is_verified: Math.random() > 0.3,
          is_online: Math.random() > 0.6
        })
        .eq('id', authUser.user.id)

      if (profileError) {
        console.error('Profile error:', profileError)
        continue
      }

      // Create user preferences
      const { error: preferencesError } = await supabase
        .from('user_preferences')
        .insert({
          profile_id: authUser.user.id,
          interested_in: ['male'],
          min_age: age - 5,
          max_age: age + 5,
          max_distance_km: Math.floor(Math.random() * 100) + 10
        })

      if (preferencesError) {
        console.error('Preferences error:', preferencesError)
        continue
      }

      profiles.push({ id: authUser.user.id, name: nickname, gender: 'female' })
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000))
    }

    console.log(`Successfully created ${profiles.length} profiles`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully created ${profiles.length} profiles`,
        profiles: profiles
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to generate profiles', details: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
