import { useState, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createBrowserClient } from '@supabase/ssr'; // Adjust the path as necessary
import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";

import useRandomExercise from '@/app/hook/useExercise'; // Adjust the path as necessary
import { useSearchParams } from 'next/navigation';
import { Input } from './ui/input';
import { Button } from './ui/button';
const exerciseSchema = z.object({
    solution: z.string().min(1, "Solution must be at least 2 characters long").max(25, "Solution must be at most 25 characters long"),
});

export default function Exercise() {
    const form = useForm<z.infer<typeof exerciseSchema>>({
        resolver: zodResolver(exerciseSchema),
        defaultValues: { 
            solution: "" 
        },
    });
    
   
    const searchParams = useSearchParams();
    const timestamp  = searchParams.get("timestamp");
    const { isFetching, data } = useRandomExercise(Number(timestamp));
    const exercise = data && data.length > 0 ? data[0] : null;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (data.solution === exercise?.solution) {
          alert('Correct answer!');
          

          // Optionally, redirect or fetch the next exercise
        } else {
          alert('ICH HAB GESAGT DAS IST FALSCH DU BLÖDE SAU DU');
        }
      };

    if (isFetching) {
        return <div>Loading...</div>;
    }

    if (!exercise) {
        return <div>No exercise found.</div>;
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>{exercise.title}</CardTitle>
                    <CardDescription>{exercise.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <iframe src={exercise.url} width="100%" height="600px" />
                </CardContent>
                <CardFooter>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className = "space-y-8">
                        <FormField
                        control = {form.control}
                        name="solution"
                        render={({field}) => (
                            <>
                            <FormItem className="block">
                                <FormLabel>Lösung</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center gap-3">
                                <FormControl className="flex-grow">
                                    <Input placeholder="Gib hier deine Lösung ein." {...field}/>
                                </FormControl>
                                <Button type="submit" className="flex-none">Submit</Button>
                            </FormItem>
                            <FormMessage/>
                            </>

                            
                            
                        )}
                        />
                        </form>
                    </Form>
                </CardFooter>
            </Card>
        </div>
        
    );
    // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof exerciseSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(exercise.solution)
    if (exercise.solution === exercise?.solution) {
        
        const searchParams = useSearchParams();
    const timestamp  = searchParams.get("timestamp");
    const { isFetching, data } = useRandomExercise(Number(timestamp));
    const exercise = data && data.length > 0 ? data[0] : null;


        // Optionally, redirect or fetch the next exercise
      } else {
        alert('ICH HAB GESAGT DAS IST FALSCH DU BLÖDE SAU DU');
      }
    console.log(values)
  }
}
