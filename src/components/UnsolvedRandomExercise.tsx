import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Celebration } from '@/components/celebration'
import { AlertDialogDemo } from '@/components/ExerciseModal'
import getUnsolvedExercise from '@/app/hook/useUnsolvedRandomExercise'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import useUser from '@/app/hook/useUser'
// New schema for the exercise solution
const exerciseSchema = z.object({
  solution: z
    .string()
    .min(1, "Solution must be at least 1 character long")
    .max(25, "Solution must be at most 25 characters long"),
})
 
// Define type of exercise schema
type ExerciseSchema = z.infer<typeof exerciseSchema>

export default function Exercise() {
  
  const { isFetching: isFetchingUser, data: userData } = useUser();
  
  // Fetch the exercise data
  const { isFetching, data, refetchExercise } = getUnsolvedExercise()
  
  // Check if exercise data is received
  const exercise = data && data.length > 0 ? data[0] : null
  
  // Create router to manage rerouting on user actions
  const router = useRouter()
  
  // Use state for exercise completed dialog field
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  
  
  // Set up form with React Hook Form and Zod validation
  const form = useForm<ExerciseSchema>({
    resolver: zodResolver(exerciseSchema),
    defaultValues: {
      solution: "",
    },
  })
  
  // Handle form submission
  const onSubmit: SubmitHandler<ExerciseSchema> = async (values) => {
    if (values.solution === exercise?.solution) {
      
      try {
        
        const response = await fetch('/api/exercise', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          
          body: JSON.stringify({ userId: userData?.id, exerciseId: exercise.id, status: 'solved',
             exerciseTopic: exercise.topic_id, exerciseType: exercise.type_id, }),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          console.log("Exercise saved successfully");
          setIsDialogOpen(true);
        } else {
          console.error('Error saving exercise:', result.error);
        }
      } catch (error) {
        console.error('Error submitting exercise:', error);
      }
    } else {
      alert('ICH HAB GESAGT DAS IST FALSCH DU BLÖDE SAU DU');
      form.reset();
    }
  };
  

  // Handle cancel action in exercise dialog
  const handleCancel = () => {
    setIsDialogOpen(false)
    router.push('/home')
  }

  // Handle action in exercise dialog
  const handleAction = () => {
    setIsDialogOpen(false)
    refetchExercise() // Fetch a new exercise
    form.reset()  
  }

  // Handle skip action
  const handleSkip = () => {
    refetchExercise() // Fetch a new exercise
    form.reset()  
  }

  // Display loading state
  if (isFetching) {
    return <div>Loading...</div>
  }
  
  // Display message if no exercise found
  if (!exercise) {
    return <Celebration></Celebration>
  }

  return (
    <div className="container mx-auto px-4 py-8" >
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CardTitle>{exercise.title}</CardTitle>
          <CardDescription>{exercise.description}</CardDescription>
        </CardHeader>
        <CardContent className="p-0"style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <embed
          src={`${exercise.url}#toolbar=0`}
          width="800" height="1131" 
           />
        </CardContent>
        <CardFooter>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
              <FormField
                control={form.control}
                name="solution"
                render={({ field }) => (
                  <>
                    <FormItem className="block" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <FormLabel>Lösungen</FormLabel>
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
  )
}