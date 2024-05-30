"use client"
import React from 'react';
import {Button} from "./ui/button";
import Link from 'next/link';
import useUser from '@/app/hook/useUser';
import { useQueryClient } from '@tanstack/react-query';
import { createClient } from '@utils/supabase/clients';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Profile() {
    const { isFetching, data } = useUser();
    const queryClient = useQueryClient();
    const router = useRouter();
    if(isFetching){
        return <div>Loading...</div>
    }

    const handleLogout = async () => {
        //call the signOut method from the auth object
        //this will sign out the current user
        const supabase = createClient();
        queryClient.clear();
        await supabase.auth.signOut();
        router.refresh();
        router.push('/');
    }




    return(
        <div>
            {!data?.id ? (
                <Link href="/auth">
                    <Button variant='outline'>SignIn</Button>
                </Link>
            ) : (
                <>
                    {data?.display_name ?
                    <h1 onClick={handleLogout}>{data.display_name}</h1>

                    : <div>
                        <h1 onClick={handleLogout}>{data.email[0]}</h1>
                    </div>}   
                </>
                
            )}
        </div>
    )


}
