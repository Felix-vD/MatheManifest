import { useState } from 'react';
import { createClient } from '@/utils/supabase/client'; // Assuming this function initializes Supabase client

export const useUpdateTotalSolved = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateTotalSolved = async (userId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await createClient().rpc('increment_total_solved', {
        user_uuid: userId ,
      });

      if (error) {
        setError(error.message);
        console.error('Error incrementing total solved:', error);
      } else {
        console.log('Successfully incremented total solved count for user', data);
      }
    } catch (err) {
      console.error('Unexpected error incrementing total solved:', err);
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return { updateTotalSolved, isLoading, error };
};
