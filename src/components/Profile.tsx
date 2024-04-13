"use client"
import React from 'react';
import {Button} from "./ui/button";
import Link from 'next/link';
import useUser from '@/app/hook/useUser';

export default function Profile() {
    const { isFetching, data } = useUser();
    if(isFetching){
        return <div>Loading...</div>
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
                    <h1>{data.display_name}</h1>

                    : <div>
                        <h1>{data.email[0]}</h1>
                    </div>}   
                </>
                
            )}
        </div>
    )


}
