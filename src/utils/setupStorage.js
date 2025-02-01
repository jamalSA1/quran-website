import { supabase } from '../supabaseConfig';

export const setupSupabaseStorage = async () => {
  try {
    // First check if bucket exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('Error listing buckets:', listError.message);
      return;
    }

    console.log('Current buckets:', buckets); // Add this to see existing buckets

    const bucketExists = buckets?.some(bucket => bucket.name === 'quran-audio');
    console.log('Bucket exists?', bucketExists); // Add this to check bucket status

    if (!bucketExists) {
      console.log('Creating new bucket...'); // Add this to track creation
      const { data, error } = await supabase.storage.createBucket('quran-audio', {
        public: true,
        allowedMimeTypes: ['audio/mpeg'],
        fileSizeLimit: 52428800 // 50MB
      });
      
      if (error) {
        console.error('Error creating bucket:', error.message);
        return;
      }
      
      console.log('Bucket created successfully:', data);
    } else {
      console.log('Bucket already exists');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};