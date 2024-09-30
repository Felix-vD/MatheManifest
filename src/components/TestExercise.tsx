import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, useFieldArray, } from "react-hook-form";
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
import useRandomTestExercise from '@/app/hook/useTestExercise';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { createExerciseUI, checkSolution, submitAll } from '@/lib/exerciseRender';

// type Exercise = {
//   name: string;
//   solution: (string | number)[][]; // Array of arrays of strings or numbers
// };
// New schema for the exercise solution
const exerciseSchema = z.object({
  solution: z.array(
    z.array(
      z
        .string()
        .transform((val) => parseFloat(val))
        .refine((val) => !isNaN(val), {
          message: "Must be a number",
        })
    )
  ),
});

// Define type of exercise schema
type ExerciseSchema = z.infer<typeof exerciseSchema>;


// Define use state for dialog and set default values for solution form
export default function TestExercise() {
  
  const { isFetching, data } = useRandomTestExercise();
  console.log(data?.int_array);
  // Define the expected type for the data
  type SolutionArrayType = number[][];
  const solutionArray: SolutionArrayType = data?.int_array ;
  
  // Set up form with React Hook Form and Zod validation
  const form = useForm<ExerciseSchema>({
    resolver: zodResolver(exerciseSchema),
    mode:  "onBlur",
    defaultValues: {
      solution: solutionArray || [], // Set default values to the solution array
    },
  });
  
  const { fields, append } = useFieldArray({
    name: "solution", // The correct key for useFieldArray
    control: form.control,
  });

 const onSubmit = (values: ExerciseSchema) => {
    console.log(values);
  };
  const checkAnswer = (
    exerciseIndex: number,
    subExerciseIndex: number,
    userInput: number
  ): string | null => {
    const correctValue = solutionArray[exerciseIndex]?.[subExerciseIndex];
    if (correctValue === undefined) return null;

    const numericInput = userInput;
    return numericInput === correctValue
      ? 'Correct!'
      : ``;
  };

  const labels = ['a)', 'b)', 'c)', 'd)', 'e)', 'f)', 'g)', 'h)', 'i)', 'j)'];
 
  return (
<<<<<<< HEAD
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="solution"
                render={({ field }) => (
                  <>
                    <FormItem className="block">
                      <FormLabel>Lösung</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center gap-3">
                      <FormControl className="flex-grow">
                        <Input placeholder="Gib hier deine Lösung ein." {...field} />
                      </FormControl>
                      <Button type="submit" className="flex-none">Submit</Button>
                      <Button variant="secondary" type="button" onClick={handleSkip}>Skip Exercise</Button>
                    </FormItem>
                    <FormMessage />
                  </>
                )}
              />
            </form>
          </Form>
        </CardFooter>
      </Card>
      
      <AlertDialogDemo
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        title="Gold richtig minjung!"
        description="Willst du noch eine Aufgabe machen?"
        onCancel={handleCancel}
        onAction={handleAction}
      />
    </div>
=======
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {solutionArray?.map((exercise, exerciseIndex) => (
          <Card key={exerciseIndex}>
            <CardHeader>
              <CardTitle>Aufgabe {exerciseIndex + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              {exercise.map((_, subExerciseIndex) => (
                <FormField
                  key={subExerciseIndex}
                  control={form.control}
                  name={`solution.${exerciseIndex}.${subExerciseIndex}`}
                  render={({ field }) => {
                    // Here we pass `field.value` as a string, which is the correct type.
                    const feedbackMessage = checkAnswer(exerciseIndex, subExerciseIndex, field.value);
                    return (
                      <FormItem>
                        <FormLabel>{labels[subExerciseIndex]}</FormLabel>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <FormControl>
                            <Input {...field} type="number" />
                          </FormControl>
                          <Button
                            type="button"
                            onClick={() => {
                              // Trigger validation and feedback rendering
                              form.trigger(`solution.${exerciseIndex}.${subExerciseIndex}`);
                            }}
                            style={{ marginLeft: '10px' }}
                          >
                            Check
                          </Button>
                        </div>
                        <FormMessage />
                        {feedbackMessage && (
                          <div style={{ 
                            marginTop: '5px',
                            color: feedbackMessage.startsWith('Correct') ? 'green' : 'red',      
                            height: '1em', // Fixed height to maintain space
                            lineHeight: '1em',  }}>
                            {feedbackMessage}
                          </div>
                        )}
                      </FormItem>
                    );
                  }}
                />
              ))}
            </CardContent>
          </Card>
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </Form>

>>>>>>> d9cf169b45a705d382a612e7cd37f9e61c5134f7
  );
}
