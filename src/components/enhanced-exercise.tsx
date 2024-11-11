'use client'

import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AlertDialogDemo } from '@/components/ExerciseModal';
import useRandomExercise from '@/app/hook/useExercise';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

// Define the structure of our exercise data
type Exercise = {
  title: string;
  description: string;
  url: string;
  solution: (string | number)[][];
};

// Create a dynamic schema based on the exercise structure
const createExerciseSchema = (exercise: Exercise) => {
  return z.object({
    solutions: z.array(
      z.array(
        z.string().refine((val) => {
          const num = parseFloat(val);
          return !isNaN(num);
        }, {
          message: "Must be a number",
        })
      )
    ).length(exercise.solution.length)
  });
};

export function EnhancedExerciseComponent() {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const { isFetching, data: exerciseData, refetchExercise } = useRandomExercise();

  // Check if exercise data is received and cast it to our Exercise type
  const exercise = exerciseData && exerciseData.length > 0 ? exerciseData[0] as Exercise : null;

  // Create the form once we have the exercise data
  const form = useForm<z.infer<ReturnType<typeof createExerciseSchema>>>({
    resolver: zodResolver(exercise ? createExerciseSchema(exercise) : z.object({})),
    defaultValues: {
      solutions: exercise?.solution.map(subArray => subArray.map(() => "")) || []
    },
  });

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (!exercise) {
    return <div>No exercise found.</div>;
  }

  const onSubmit: SubmitHandler<z.infer<ReturnType<typeof createExerciseSchema>>> = (values) => {
    const allCorrect = values.solutions.every((subArray, i) => 
      subArray.every((value, j) => parseFloat(value) === exercise.solution[i][j])
    );

    setIsCorrect(allCorrect);
    setIsDialogOpen(true);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    router.push('/home');
  };

  const handleAction = () => {
    setIsDialogOpen(false);
    refetchExercise();
    form.reset();
  };

  const labels = ['a)', 'b)', 'c)', 'd)', 'e)', 'f)', 'g)', 'h)', 'i)', 'j)'];

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{exercise.title}</CardTitle>
          <CardDescription>{exercise.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <iframe src={exercise.url} className="w-full h-96 mb-4" title="Exercise Content" />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {exercise.solution.map((subArray, exerciseIndex) => (
                <div key={exerciseIndex} className="space-y-2">
                  <h3 className="text-lg font-semibold">Exercise {exerciseIndex + 1}</h3>
                  {subArray.map((_, subExerciseIndex) => (
                    <FormField
                      key={subExerciseIndex}
                      control={form.control}
                      name={`solutions.${exerciseIndex}.${subExerciseIndex}`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{labels[subExerciseIndex]}</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} placeholder="Enter your answer" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              ))}
              <Button type="submit" className="w-full">Submit All Answers</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <AlertDialogDemo
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        title={isCorrect ? "Congratulations!" : "Keep trying!"}
        description={isCorrect ? "All answers are correct. Would you like to try another exercise?" : "Some answers are incorrect. Would you like to try again or move to a new exercise?"}
        onCancel={handleCancel}
        onAction={handleAction}
      />
    </div>
  );
}