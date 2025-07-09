"use client"
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';

const ranking = {
    total_solved: 0,
};

export default function useRanking() {
    return useQuery({
        // The queryKey is used to generate a unique key for the query in the cache.
        queryKey: ['ranking'],
        // The queryFn is called to fetch the data for the query.
        queryFn: async () => {
            const supabase = createClient();
            const { data } = await supabase.auth.getSession();
            // Check if the session and user data exists
            if (data.session?.user) {
                // Fetch user information profile from the profiles table
                const { data: ranking } = await supabase
                    .from('rankingprogress')
                    .select("*")
                    .eq("id", data.session.user.id)
                    .single();
                return ranking;
            }
            return ranking;
        }
    });
}
