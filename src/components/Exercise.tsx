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
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { Link } from 'lucide-react';

const exerciseSchema = z.object({
  solution: z
    .string()
    .min(1, "Solution must be at least 1 characters long")
    .max(25, "Solution must be at most 25 characters long"),
});

type ExerciseSchema = z.infer<typeof exerciseSchema>;

export default function Exercise() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const form = useForm<ExerciseSchema>({
    resolver: zodResolver(exerciseSchema),
    defaultValues: {
      solution: "",
    },
  });

  const { isFetching, data, refetchExercise } = useRandomExercise();
  const exercise = data && data.length > 0 ? data[0] : null;
  const router = useRouter();

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (!exercise) {
    return <div>No exercise found.</div>;
  }

  const onSubmit: SubmitHandler<ExerciseSchema> = (values) => {
    if (values.solution === exercise?.solution) {
      setIsDialogOpen(true);
    } else {
      alert('ICH HAB GESAGT DAS IST FALSCH DU BLÖDE SAU DU');
    }
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    router.push('/home');
  };

  const handleAction = () => {
    setIsDialogOpen(false);
    refetchExercise();  // Fetch a new exercise
  };

  const handleSkip = () => {
    refetchExercise();  // Fetch a new exercise
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
                      <Button onClick={handleSkip}>Skip Exercise</Button>
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
  );
}
