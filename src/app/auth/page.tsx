'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FcGoogle } from "react-icons/fc";
import { FaSquareGithub } from "react-icons/fa6";
import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { Boxes } from "@/components/ui/background-boxes";

export default function LoginPage() {

  // create router for redirection
  const router = useRouter();

  // create schema for form input validation
  const signupSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long").max(50, "Password must be at most 50 characters long"),
  });

  // set default values for schema and resolver to be used in useForm
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // set states for loading and error messages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // handleOAuthLogin function to handle OAuth login
  const handleOAuthLogin = async (provider: 'github' | 'google') => {
    setLoading(true);
    const supabase = createClient();
    
    // More robust URL detection
    let siteUrl: string;
    console.log('=== OAuth URL Debug ===');
    console.log('process.env.NEXT_PUBLIC_SITE_URL:', process.env.NEXT_PUBLIC_SITE_URL);
    console.log('typeof window:', typeof window);
    console.log('process.env.NODE_ENV:', process.env.NODE_ENV);
    
    if (process.env.NODE_ENV === 'production') {
      siteUrl = 'https://rechenkunst.vercel.app';
      console.log('Using production URL:', siteUrl);
    } else {
      siteUrl = window.location.origin;
      console.log('Using localhost URL:', siteUrl);
    }
    
    console.log('Final OAuth redirect URL:', siteUrl);
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${siteUrl}/auth/callback`,
      },
    });
    if (error) setError(error.message);
    setLoading(false);
  };

  // handleSignUp function to handle sign up 
  const handleSignUp = async (data: z.infer<typeof signupSchema>) => {
    setLoading(true);
    setError(null);
    console.log('Signup data:', data);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });
    if (error) setError(error.message);
    setLoading(false);
    revalidatePath('/', 'layout')
    redirect('/auth/callback')
  };

  // handleLogin function to handle login
  const handleLogin = async (data: z.infer<typeof signupSchema>) => {
    setLoading(true);
    setError(null);
    console.log('Login data:', data)
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error) setError(error.message);
    else router.push('/dashboard');
    setLoading(false);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-900 flex items-center justify-center">
      
      <div className="relative z-20 flex items-center justify-center h-screen">
        <Tabs defaultValue="signup" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>
                  If you do not have an account, you can sign up here.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Form {...form}>
                  <form className="space-y-8" onSubmit={form.handleSubmit(handleSignUp)}>
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
                            <Input type="password" placeholder="Enter your password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex flex-col gap-5">
                      <Button type="submit" disabled={loading} className="block w-full flex items-center gap-2">
                        {loading ? 'Loading...' : 'Sign Up'}
                      </Button>
                      
                    </div>
                  </form>
                </Form>
                {error && <p className="text-red-500">{error}</p>}
                <Button className="block w-full flex items-center gap-2" variant="outline" onClick={() => handleOAuthLogin("google")}>
                        <FaSquareGithub className="w-6 h-6" />GitHub
                      </Button>
                      <Button className="block w-full flex items-center gap-2" variant="outline" onClick={() => handleOAuthLogin("google")}>
                        <FcGoogle className="w-6 h-6" /> Google
                      </Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  If you already have an account, you can login here.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Form {...form}>
                  <form className="space-y-8" onSubmit={form.handleSubmit(handleLogin)}>
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
                            <Input type="password" placeholder="Enter your password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex flex-col gap-5">
                      <Button type="submit" disabled={loading} className="block w-full flex items-center gap-2">
                        {loading ? 'Loading...' : 'Login'}
                      </Button>
                      <Button className="block w-full flex items-center gap-2" variant="outline" onClick={() => handleOAuthLogin("github")}>
                        <FaSquareGithub className="w-6 h-6" />GitHub
                      </Button>
                      <Button className="block w-full flex items-center gap-2" variant="outline" onClick={() => handleOAuthLogin("google")}>
                        <FcGoogle className="w-6 h-6" /> Google
                      </Button>
                    </div>
                  </form>
                </Form>
                {error && <p className="text-red-500">{error}</p>}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
