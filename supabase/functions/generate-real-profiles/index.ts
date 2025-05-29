
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import { createProfile } from './utils/profileCreator.ts'
import { getRandomElement } from './utils/helpers.ts'
import { maleNames, femaleNames, lastNames } from './data/germanData.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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
    const { error: clearPhotosError } = await supabase.from('profile_photos').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    if (clearPhotosError) console.log('Error clearing photos:', clearPhotosError)
    
    const { error: clearPrefsError } = await supabase.from('user_preferences').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    if (clearPrefsError) console.log('Error clearing preferences:', clearPrefsError)
    
    const { error: clearProfilesError } = await supabase.from('profiles').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    if (clearProfilesError) console.log('Error clearing profiles:', clearProfilesError)

    const createdProfiles = []
    
    // Generate 25 male profiles
    for (let i = 0; i < 25; i++) {
      const firstName = getRandomElement(maleNames)
      const lastName = getRandomElement(lastNames)
      
      const profile = await createProfile(supabase, firstName, lastName, 'male', i + 1)
      if (profile) {
        createdProfiles.push(profile)
      }
    }

    // Generate 25 female profiles
    for (let i = 0; i < 25; i++) {
      const firstName = getRandomElement(femaleNames)
      const lastName = getRandomElement(lastNames)
      
      const profile = await createProfile(supabase, firstName, lastName, 'female', i + 1)
      if (profile) {
        createdProfiles.push(profile)
      }
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
