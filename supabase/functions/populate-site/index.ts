
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

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

    console.log('Populating site with authentic German profiles...')

    // Call the existing generate-real-profiles function
    const { data, error } = await supabase.functions.invoke('generate-real-profiles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (error) {
      console.error('Error calling generate-real-profiles:', error)
      throw error
    }

    console.log('Site populated successfully:', data)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Site populated with 50 authentic German profiles',
        data: data
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error populating site:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to populate site', details: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
