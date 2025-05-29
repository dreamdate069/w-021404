
import { supabase } from '@/integrations/supabase/client';

export const populateSiteWithProfiles = async () => {
  try {
    console.log('Starting site population...');
    
    const { data, error } = await supabase.functions.invoke('populate-site', {
      method: 'POST',
    });

    if (error) {
      console.error('Error populating site:', error);
      throw error;
    }

    console.log('Site populated successfully:', data);
    return data;
  } catch (error) {
    console.error('Failed to populate site:', error);
    throw error;
  }
};

// Auto-execute when this file is imported
populateSiteWithProfiles().then(() => {
  console.log('Site population completed');
}).catch((error) => {
  console.error('Site population failed:', error);
});
