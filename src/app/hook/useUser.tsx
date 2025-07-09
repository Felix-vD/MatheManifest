"use client"
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { FaDisplay } from 'react-icons/fa6';

const initUser = {
    created_at: "",
    display_name: "",
    email: "",
    id: "",
    image_url: "",
    avatar: "",
    grade: "",
    calculator: ""
}

export default function useUser() {
    return useQuery({
        // The queryKey is used to generate a unique key for the query in the cache.
        queryKey: ['user'],
        // The queryFn is called to fetch the data for the query.
        queryFn: async () => {
            const supabase = createClient();
            const { data } = await supabase.auth.getSession();
            if (data.session?.user) {
                const profileData = await supabase
                    .from('profiles')
                    .select("*")
                    .eq("id", data.session.user.id)
                    .single();

                return profileData.data || initUser;
            }
            return initUser;
        }
    });
}