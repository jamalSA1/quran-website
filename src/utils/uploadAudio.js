import { supabase } from '../supabaseConfig';

export const uploadAudio = async (audioFile, fileName) => {
  try {
    const { data, error } = await supabase.storage
      .from('quran-audio')
      .upload(`audio/${fileName}`, audioFile, {
        cacheControl: '3600',
        contentType: 'audio/mpeg'
      });

    if (error) throw error;
    return data.path;
  } catch (error) {
    console.error('Error uploading audio:', error.message);
    throw error;
  }
};