"use client";
import { Button } from "@/components/ui/button";
import { KeyRound } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaSquareGithub } from "react-icons/fa6";
import { createClient } from "@utils/supabase/clients";

export default function auth() {

    const handeLoginWithOAuth = (provider:'github' | 'google') => {
        const supabase = createClient();
        supabase.auth.signInWithOAuth({ 
            provider,
            options:{
                redirectTo: location.origin + "/auth/callback"
            } 
        });
    };




    return <div className="flex items-center justify-center w-full h-screen">
        <div className="w-96 rounded-md border p-5 space-y-5 relative bg-black">
            <div className="flex items-center gap-2">
                <KeyRound />
                <h1 className=" text-2xl font-bold">Next + Supabase</h1>
            </div>
            <p className="text-sm">Register/SignIn Today 👇</p>
            <div className="flex flex-col gap-5">
                <Button className="block w-full flex items-center gap-2" variant="outline" onClick={() => handeLoginWithOAuth("github")}><FaSquareGithub className="w-6 h-6"/>GitHub</Button>
                <Button className="block w-full flex items-center gap-2" variant="outline" onClick={() => handeLoginWithOAuth("google")}> <FcGoogle className="w-6 h-6" /> Google</Button>
            </div>
            <div className="glowBox -z-10"></div>
        </div>
    </div>;
}
