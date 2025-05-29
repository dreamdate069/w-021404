
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import { generateProfileImage } from './imageGenerator.ts'
import { getRandomElement, getRandomElements, generateNickname, generateBio } from './helpers.ts'
import { germanCities, occupations, interests, educationLevels, photoScenarios } from '../data/germanData.ts'

export async function createProfile(
  supabase: any,
  firstName: string,
  lastName: string,
  gender: 'male' | 'female',
  profileNumber: number
) {
  try {
    const nickname = generateNickname(firstName)
    const age = Math.floor(Math.random() * (45 - 22 + 1)) + 22
    const occupation = getRandomElement(occupations)
    const location = getRandomElement(germanCities)
    const userInterests = getRandomElements(interests, Math.floor(Math.random() * 6) + 4)
    const bio = generateBio(nickname, age, occupation, location, userInterests)
    
    console.log(`Creating ${gender} profile ${profileNumber}: ${nickname}`)
    
    // Create profile directly
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .insert({
        nickname,
        first_name: firstName,
        last_name: lastName,
        age,
        gender,
        bio,
        location,
        occupation,
        interests: userInterests,
        education: getRandomElement(educationLevels),
        height_cm: gender === 'male' 
          ? Math.floor(Math.random() * (190 - 170 + 1)) + 170
          : Math.floor(Math.random() * (175 - 155 + 1)) + 155,
        is_verified: Math.random() > 0.3,
        is_online: Math.random() > 0.6,
        relationship_status: getRandomElement(['single', 'divorced']),
        looking_for: Math.random() > 0.5 ? ['dating'] : ['friendship', 'dating']
      })
      .select()
      .single()

    if (profileError) {
      console.error('Profile error:', profileError)
      return null
    }

    // Generate character seed for consistency
    const hairColors = gender === 'male' 
      ? ['brown', 'blonde', 'black'] 
      : ['brown', 'blonde', 'black', 'auburn']
    const eyeColors = ['blue', 'green', 'brown', 'hazel']
    
    const characterSeed = `${age}-year-old German ${gender === 'male' ? 'man' : 'woman'} with ${getRandomElement(hairColors)} hair and ${getRandomElement(eyeColors)} eyes`
    
    // Generate 2-4 images for this profile
    const numPhotos = Math.floor(Math.random() * 3) + 2 // 2-4 photos
    const selectedScenarios = getRandomElements(photoScenarios, numPhotos)
    
    for (let photoIndex = 0; photoIndex < numPhotos; photoIndex++) {
      const scenario = selectedScenarios[photoIndex]
      const imageUrl = await generateProfileImage(gender, age, scenario, characterSeed)
      
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
        preferred_gender: gender === 'male' ? ['female'] : ['male'],
        min_age: Math.max(18, age - 8),
        max_age: Math.min(70, age + 8),
        max_distance_km: Math.floor(Math.random() * 100) + 20
      })

    if (preferencesError) {
      console.error('Preferences error:', preferencesError)
    }

    return { id: profile.id, name: nickname, gender }
  } catch (error) {
    console.error(`Error creating ${gender} profile ${profileNumber}:`, error)
    return null
  }
}
