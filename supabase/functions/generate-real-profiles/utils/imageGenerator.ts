
import Replicate from "https://esm.sh/replicate@0.25.2"

export const generateProfileImage = async (gender: string, age: number, scenario: string, characterSeed?: string): Promise<string> => {
  const replicateApiToken = Deno.env.get('REPLICATE_API_TOKEN')
  
  if (!replicateApiToken) {
    console.log('REPLICATE_API_TOKEN not found, using placeholder image')
    return `/user-uploads/profile-pics/placeholder-${gender}.png`
  }

  try {
    const replicate = new Replicate({
      auth: replicateApiToken,
    })

    // Create consistent character description
    const baseCharacter = characterSeed || `${age}-year-old ${gender === 'male' ? 'German man' : 'German woman'} with authentic European features`
    const prompt = `A realistic photo of a ${baseCharacter}, ${scenario}, high quality, natural lighting, photorealistic, 4k`
    
    console.log('Generating image with prompt:', prompt)

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
