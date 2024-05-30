"use client"
import { createClient } from '@utils/supabase/clients';
import { useQuery } from '@tanstack/react-query';
import { FaDisplay } from 'react-icons/fa6';

const initUser = {
    created_at: "",
    display_name: "" ,
    email: "",
    id: "",
    image_url: "",
}


export default function useUser() {
    return useQuery({
        // The queryKey is used to generate a unique key for the query in the cache.
        queryKey: ['user'],
        // The queryFn is called to fetch the data for the query.
        queryFn: async ()=>{
            const supabase = createClient();
            const{data} = await supabase.auth.getSession();
            //? is equivalent to if(data && data.session && data.session.user), checking if data.session.user exists, if not it
            //short circuits and returns null
            if(data.session?.user){
                //fetch user information proifle from the profiles table
                const{data: user} = await supabase
                .from('profiles')
                .select("*")
                .eq("id", data.session.user.id)
                .single();
                return user;
            }
            return initUser;
        }   
    })
}