
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import Replicate from "https://esm.sh/replicate@0.25.2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// German names and locations data
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
  'Nürnberg', 'Duisburg', 'Bochum', 'Wuppertal', 'Bielefeld', 'Bonn', 'Münster',
  'Karlsruhe', 'Mannheim', 'Augsburg', 'Wiesbaden', 'Gelsenkirchen', 'Mönchengladbach',
  'Braunschweig', 'Chemnitz', 'Kiel', 'Aachen', 'Halle', 'Magdeburg', 'Freiburg',
  'Krefeld', 'Lübeck', 'Oberhausen', 'Erfurt', 'Mainz', 'Rostock', 'Kassel'
]

const occupations = [
  'Software Engineer', 'Teacher', 'Artist', 'Chef', 'Designer', 'Doctor', 'Writer',
  'Musician', 'Athlete', 'Accountant', 'Lawyer', 'Journalist', 'Nurse', 'Pilot',
  'Architect', 'Librarian', 'Scientist', 'Marketing Manager', 'Entrepreneur', 'Consultant',
  'Photographer', 'Translator', 'Social Worker', 'Engineer', 'Psychologist'
]

const interests = [
  'Reading', 'Hiking', 'Photography', 'Cooking', 'Traveling', 'Gaming', 'Movies',
  'Music', 'Sports', 'Dancing', 'Painting', 'Writing', 'Yoga', 'Meditation',
  'Gardening', 'Cycling', 'Swimming', 'Skiing', 'Surfing', 'Climbing', 'Fishing',
  'Camping', 'Running', 'Volunteering', 'Learning Languages', 'Theater', 'Wine Tasting',
  'Board Games', 'Karaoke', 'Fitness'
]

const educationLevels = [
  'High School', 'Vocational Training', 'Bachelor\'s Degree', 'Master\'s Degree', 
  'Doctorate', 'Some College'
]

const photoScenarios = [
  'professional headshot with natural lighting',
  'casual outdoor photo in a German city street',
  'hiking in the Bavarian Alps',
  'at a German beer garden with friends',
  'walking through a Christmas market',
  'relaxing by a lake',
  'exploring a historic German castle',
  'at a local café reading',
  'cycling through countryside',
  'at a music festival',
  'cooking in a modern kitchen',
  'walking along the Rhine river',
  'at a German football stadium',
  'visiting a museum',
  'at a local farmer\'s market'
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

function generateBio(nickname: string, age: number, occupation: string, location: string, interests: string[]): string {
  const templates = [
    `Hallo! I'm ${nickname}, ${age} years old and working as a ${occupation} in ${location}. I love ${interests.slice(0, 3).join(', ')} and enjoy exploring Germany's beautiful landscapes. Looking for genuine connections!`,
    `${nickname} here! Living in ${location} as a ${occupation}. Passionate about ${interests.slice(0, 2).join(' and ')}. Always up for discovering new places in Germany and meeting interesting people.`,
    `Hi there! I'm ${nickname}, a ${age}-year-old ${occupation} from ${location}. My hobbies include ${interests.slice(0, 3).join(', ')}. Love the German culture and outdoor activities. Let's create some memories together!`,
    `${nickname}, ${age}, living in beautiful ${location}! Working as a ${occupation} and passionate about ${interests.slice(0, 2).join(' and ')}. Life's an adventure, especially in Germany!`
  ]
  return getRandomElement(templates)
}

const generateProfileImage = async (gender: string, age: number, scenario: string, characterSeed?: string): Promise<string> => {
  const replicate = new Replicate({
    auth: Deno.env.get('REPLICATE_API_TOKEN')!,
  })

  // Create consistent character description
  const baseCharacter = characterSeed || `${age}-year-old ${gender === 'male' ? 'German man' : 'German woman'} with authentic European features`
  const prompt = `A realistic photo of a ${baseCharacter}, ${scenario}, high quality, natural lighting, photorealistic, 4k`
  
  console.log('Generating image with prompt:', prompt)

  try {
    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input: {
          prompt: prompt,
          go_fast: true,
          megapixels: "1",
          num_outputs: 1,
          aspect_ratio: "3:4",
          output_format: "webp",
          output_quality: 80,
          num_inference_steps: 4
        }
      }
    ) as string[]

    if (output && output.length > 0) {
      console.log('Image generated successfully')
      return output[0]
    } else {
      throw new Error('No image generated')
    }
  } catch (error) {
    console.error('Error generating image:', error)
    // Return a placeholder if image generation fails
    return `/user-uploads/profile-pics/placeholder-${gender}.png`
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    console.log('Starting authentic German profile generation...')

    // Clear existing profiles first
    console.log('Clearing existing profiles...')
    await supabase.from('profile_photos').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    await supabase.from('user_preferences').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    await supabase.from('profiles').delete().neq('id', '00000000-0000-0000-0000-000000000000')

    const createdProfiles = []
    
    // Generate 25 male profiles
    for (let i = 0; i < 25; i++) {
      const firstName = getRandomElement(maleNames)
      const lastName = getRandomElement(lastNames)
      const nickname = generateNickname(firstName)
      const age = Math.floor(Math.random() * (45 - 22 + 1)) + 22
      const occupation = getRandomElement(occupations)
      const location = getRandomElement(germanCities)
      const userInterests = getRandomElements(interests, Math.floor(Math.random() * 6) + 4)
      const bio = generateBio(nickname, age, occupation, location, userInterests)
      
      console.log(`Creating male profile ${i + 1}: ${nickname}`)
      
      // Create profile directly without auth
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .insert({
          nickname,
          first_name: firstName,
          last_name: lastName,
          age,
          gender: 'male',
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
        .select()
        .single()

      if (profileError) {
        console.error('Profile error:', profileError)
        continue
      }

      // Generate character seed for consistency
      const characterSeed = `${age}-year-old German man with ${getRandomElement(['brown', 'blonde', 'black'])} hair and ${getRandomElement(['blue', 'green', 'brown'])} eyes`
      
      // Generate 2-4 images for this profile
      const numPhotos = Math.floor(Math.random() * 3) + 2 // 2-4 photos
      const selectedScenarios = getRandomElements(photoScenarios, numPhotos)
      
      for (let photoIndex = 0; photoIndex < numPhotos; photoIndex++) {
        const scenario = selectedScenarios[photoIndex]
        const imageUrl = await generateProfileImage('male', age, scenario, characterSeed)
        
        const { error: photoError } = await supabase
          .from('profile_photos')
          .insert({
            profile_id: profile.id,
            photo_url: imageUrl,
            photo_order: photoIndex + 1,
            is_primary: photoIndex === 0
          })

        if (photoError) {
          console.error('Photo error:', photoError)
        }
        
        // Small delay between image generations
        await new Promise(resolve => setTimeout(resolve, 1000))
      }

      // Create user preferences
      const { error: preferencesError } = await supabase
        .from('user_preferences')
        .insert({
          profile_id: profile.id,
          interested_in: ['dating', 'friendship'],
          preferred_gender: ['female'],
          min_age: Math.max(18, age - 8),
          max_age: Math.min(70, age + 8),
          max_distance_km: Math.floor(Math.random() * 100) + 20
        })

      if (preferencesError) {
        console.error('Preferences error:', preferencesError)
      }

      createdProfiles.push({ id: profile.id, name: nickname, gender: 'male' })
    }

    // Generate 25 female profiles
    for (let i = 0; i < 25; i++) {
      const firstName = getRandomElement(femaleNames)
      const lastName = getRandomElement(lastNames)
      const nickname = generateNickname(firstName)
      const age = Math.floor(Math.random() * (45 - 22 + 1)) + 22
      const occupation = getRandomElement(occupations)
      const location = getRandomElement(germanCities)
      const userInterests = getRandomElements(interests, Math.floor(Math.random() * 6) + 4)
      const bio = generateBio(nickname, age, occupation, location, userInterests)
      
      console.log(`Creating female profile ${i + 1}: ${nickname}`)
      
      // Create profile directly without auth
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .insert({
          nickname,
          first_name: firstName,
          last_name: lastName,
          age,
          gender: 'female',
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
        .select()
        .single()

      if (profileError) {
        console.error('Profile error:', profileError)
        continue
      }

      // Generate character seed for consistency
      const characterSeed = `${age}-year-old German woman with ${getRandomElement(['brown', 'blonde', 'black', 'auburn'])} hair and ${getRandomElement(['blue', 'green', 'brown', 'hazel'])} eyes`
      
      // Generate 2-4 images for this profile
      const numPhotos = Math.floor(Math.random() * 3) + 2 // 2-4 photos
      const selectedScenarios = getRandomElements(photoScenarios, numPhotos)
      
      for (let photoIndex = 0; photoIndex < numPhotos; photoIndex++) {
        const scenario = selectedScenarios[photoIndex]
        const imageUrl = await generateProfileImage('female', age, scenario, characterSeed)
        
        const { error: photoError } = await supabase
          .from('profile_photos')
          .insert({
            profile_id: profile.id,
            photo_url: imageUrl,
            photo_order: photoIndex + 1,
            is_primary: photoIndex === 0
          })

        if (photoError) {
          console.error('Photo error:', photoError)
        }
        
        // Small delay between image generations
        await new Promise(resolve => setTimeout(resolve, 1000))
      }

      // Create user preferences
      const { error: preferencesError } = await supabase
        .from('user_preferences')
        .insert({
          profile_id: profile.id,
          interested_in: ['dating', 'friendship'],
          preferred_gender: ['male'],
          min_age: Math.max(18, age - 8),
          max_age: Math.min(70, age + 8),
          max_distance_km: Math.floor(Math.random() * 100) + 20
        })

      if (preferencesError) {
        console.error('Preferences error:', preferencesError)
      }

      createdProfiles.push({ id: profile.id, name: nickname, gender: 'female' })
    }

    console.log(`Successfully created ${createdProfiles.length} authentic German profiles`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully created ${createdProfiles.length} authentic German profiles with consistent image sets`,
        profiles: createdProfiles
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
