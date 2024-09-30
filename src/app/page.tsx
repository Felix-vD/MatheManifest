"use client"
import Exercise from "@/components/Exercise";
import LoginForm from "@/components/Login";
import Nav from "@/components/Nav";
import SignUpForm from "@/components/SignUp";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "postcss";
import { createClient } from "@utils/supabase/clients";
import { FcGoogle } from "react-icons/fc";
import { FaSquareGithub } from "react-icons/fa6";
import Link from "next/link";
import WelcomePage from "./welcome/page";
export default function Home() {
  // const setNewUser = async () => {
  //   const { data, error } = await supabase
  //     .from("user")
  //     .insert({ 
  //       name: 'random name'
  //     })

  //     if(data) console.log(data)
      
  //     if(error) console.log(error)
  // };
  // setNewUser(); 
  
  return (
    // <div className="flex items-center justify-center">
    //     <Tabs defaultValue="signup" className="w-[400px]">
    //       <TabsList className="grid w-full grid-cols-2">
    //         <TabsTrigger value="signup">SignUp</TabsTrigger>
    //         <TabsTrigger value="login">Login</TabsTrigger>
    //       </TabsList>
    //       <TabsContent value="signup">
    //         <Card>
    //           <CardHeader>
    //             <CardTitle>SignUp</CardTitle>
    //             <CardDescription>
    //               If you don't have an account, you can sign up here.
    //             </CardDescription>
    //           </CardHeader>
    //           <CardContent className="space-y-2">
    //             <div className="space-y-1">
    //               <SignUpForm></SignUpForm>
    //             </div>
    //           </CardContent>
    //         </Card>
    //       </TabsContent>
    //       <TabsContent value="login">
    //         <Card>
    //           <CardHeader>
    //             <CardTitle>Login</CardTitle>
    //             <CardDescription>
    //               If you already have an account, you can login here.
    //             </CardDescription>
    //           </CardHeader>
    //           <CardContent className="space-y-2">
    //             <div className="space-y-1">
    //               <LoginForm></LoginForm>
    //             </div>
    //           </CardContent>
    //         </Card>
    //       </TabsContent>
    //     </Tabs>
    // </div>

    <div className="flex justify-center items-center" >
      <WelcomePage></WelcomePage>
    </div>
  );
}
