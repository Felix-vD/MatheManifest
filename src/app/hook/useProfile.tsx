"use client"
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';

const initProfile = {
    email: '',
    display_name: '',
};

export default function useProfile() {
    return useQuery({
        // The queryKey is used to generate a unique key for the query in the cache.
        queryKey: ['profile'],
        // The queryFn is called to fetch the data for the query.
        queryFn: async () => {
            const supabase = createClient();
            const { data } = await supabase.auth.getSession();
            // Check if the session and user data exists
            if (data.session?.user) {
                // Fetch user information profile from the profiles table
                const { data: user } = await supabase
                    .from('profiles')
                    .select("email, display_name")
                    .eq("id", data.session.user.id)
                    .single();
                return user;
            }
            return initProfile;
        }
    });
}
