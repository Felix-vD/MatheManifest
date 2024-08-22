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
import useRandomTestExercise from '@/app/hook/useTestExercise';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';


type Exercise = {
  name: string;
  solution: (string | number)[][]; // Array of arrays of strings or numbers
};
// New schema for the exercise solution
const exerciseSchema = z.object({
  solution: z.array(
    z.array(z.string().min(1, "Solution must be at least 1 character long"))
  ),
});
// Define type of exercise schema
type ExerciseSchema = z.infer<typeof exerciseSchema>;

// Define use state for dialog and set default values for solution form
export default function TestExercise() {
  const { isFetching, data, refetchExercise } = useRandomTestExercise();
  console.log(data);
  const exercise = data || null;
  console.log(exercise);
  // Create router manage rerouting on user actions
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Set up form with React Hook Form and Zod validation
  const form = useForm<ExerciseSchema>({
    resolver: zodResolver(exerciseSchema),
    defaultValues: {
      solution: exercise?.int_array.map((row: number[]) => row.map(() => "")) || [],
    },
  });
  
  
  

  // Display loading state
  if (isFetching) {
    return <div>Loading...</div>;
  }

  // Display message if no exercise found
  if (!exercise) {
    
    return <div>No exercise found.</div>;
  }

  // Handle form submission
  const onSubmit: SubmitHandler<ExerciseSchema> = (values) => {
    if (values.solution === exercise?.solution) {
      setIsDialogOpen(true);
    } else {
      alert('ICH HAB GESAGT DAS IST FALSCH DU BLÖDE SAU DU');
      form.reset();
    }
  };

  // Handle cancel action in exercise dialog
  const handleCancel = () => {
    setIsDialogOpen(false);
    router.push('/home');
  };

  // Handle action in exercise dialog
  const handleAction = () => {
    setIsDialogOpen(false);
    refetchExercise(); // Fetch a new exercise
    form.reset();  
  };

  // Handle skip action
  const handleSkip = () => {
    refetchExercise(); // Fetch a new exercise
    form.reset();  
  };

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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {exercise.int_array.map((row: number[], rowIndex: number) => (
  <div key={rowIndex} className="mb-4">
    <div><strong>Aufgabe {rowIndex + 1}:</strong></div>
    {row.map((solution: number, colIndex: number) => (
      <FormField
        key={colIndex}
        control={form.control}
        name={`solution.${rowIndex}.${colIndex}`}
        render={({ field }) => (
          <>
            <FormItem className="block">
              <FormLabel>
                {String.fromCharCode(97 + colIndex)}) Lösung {colIndex + 1}
              </FormLabel>
            </FormItem>
            <FormItem className="flex items-center gap-3">
              <FormControl className="flex-grow">
                <Input
                  placeholder={`Gib die Lösung für ${String.fromCharCode(97 + colIndex)}) ein.`}
                  {...field}
                />
              </FormControl>
              <Button
                type="button"
                onClick={() => {
                  if (field.value === String(solution)) {
                    alert(`Correct solution for Aufgabe ${rowIndex + 1}, part ${String.fromCharCode(97 + colIndex)}`);
                  } else {
                    alert(`Incorrect solution for Aufgabe ${rowIndex + 1}, part ${String.fromCharCode(97 + colIndex)}`);
                  }
                }}
              >
                Check Solution
              </Button>
            </FormItem>
            <FormMessage />
          </>
        )}
      />
    ))}
  </div>
))}

              <Button type="submit" className="mt-4">Final Submit</Button>
              <Button variant="secondary" type="button" onClick={handleSkip} className="ml-2">
                Skip Exercise
              </Button>
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
  );
}
