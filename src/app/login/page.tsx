"use client";
import { login, signup } from './actions'
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
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { createClient } from "@/utils/supabase/client";
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

//Login Page

export default function LoginPage() {
  
  //define login schema with zod object
  const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long").max(50, "Password must be at most 50 characters long"),
  });
  //set default values for form loginSchema
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    })
  //function to handle login with OAuth
    const handeLoginWithOAuth = (provider:'github' | 'google') => {
      const supabase = createClient();
      supabase.auth.signInWithOAuth({ 
          provider,
          options:{
              redirectTo: location.origin + "/auth/callback"
          } 
      });
    };
  
  
  return (
    <div className="flex items-center justify-center">
        <Tabs defaultValue="signup" className="w-[800px]">
        <TabsList>
            <TabsTrigger value="signup">SignUp</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        
        <TabsContent value="signup">
            <Card>
            <CardHeader>
                <CardTitle>SignUps</CardTitle>
                <CardDescription>
                    If you don&apos;t have an account, you can sign up here.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Form {...form}>
                    <form>
                      <FormField
                        //control={Form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your email address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        //control={Form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your email address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex flex-col gap-5">
                        <Button type="submit" className="block w-full flex items-center gap-2">Login</Button>
                      </div>
                    </form>
                  </Form>
                </div>
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
                <div className="space-y-1">
                <Form {...form}>
                  <form>
                    <FormField
                      //control={Form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      //control={Form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex flex-col gap-5">
                      <Button type="submit" className="block w-full flex items-center gap-2">Login</Button>
                    </div>
                  </form>
                </Form>
                </div>
            </CardContent>
            </Card>
        </TabsContent>
        </Tabs>
    </div>
    

  )
}

{/* <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={login}>Log in</button>
      <button formAction={signup}>Sign up</button> */}