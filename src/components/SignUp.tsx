"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription, 
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FcGoogle } from "react-icons/fc";
import { FaSquareGithub } from "react-icons/fa6";
import { createClient } from "@utils/supabase/clients";
const signupSchema = z.object({
    username: z.string().min(2, "Username must be at least 2 characters long").max(25, "Username must be at most 25 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long").max(50, "Password must be at most 50 characters long"),
  });

  const handeLoginWithOAuth = (provider:'github' | 'google') => {
    const supabase = createClient();
    supabase.auth.signInWithOAuth({ 
        provider,
        options:{
            redirectTo: location.origin + "/auth/callback"
        } 
    });
  };
export default function SignUpForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    })
    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                    <Input placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <div className="flex flex-col gap-5">
                <Button type="submit" className="block w-full flex items-center gap-2">SignUp</Button>
                <Button className="block w-full flex items-center gap-2" variant="outline" onClick={() => handeLoginWithOAuth("github")}><FaSquareGithub className="w-6 h-6"/>GitHub</Button>
                <Button className="block w-full flex items-center gap-2" variant="outline" onClick={() => handeLoginWithOAuth("google")}> <FcGoogle className="w-6 h-6" /> Google</Button>
            </div>
            
        </form>
        </Form>
    )
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof signupSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
}
