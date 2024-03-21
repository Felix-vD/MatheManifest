"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
  import { Button } from "@/components/ui/button"
  import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
 
  const exerciseSchema = z.object({
    solution: z.string().min(2, "Username must be at least 2 characters long").max(25, "Username must be at most 25 characters long"),
    
  });
export default function Exercise() {
    const form = useForm<z.infer<typeof exerciseSchema>>({
        resolver: zodResolver(exerciseSchema),
        defaultValues: {
          solution: "",
        },
        })
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Aufgabe 1</CardTitle>
                    <CardDescription>Kurvendiskussion gibts in wirklichkeit gar nicht. Alles eine CIA Spy Op</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>
                        <iframe src="/testpdf.pdf" width="100%" height="600px">
                        This browser does not support PDFs. Please download the PDF to view it: <a href="/path/to/your/document.pdf">Download PDF</a>.
                        </iframe>
                    </p>
                </CardContent>
                <CardFooter>
                <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                        control={form.control}
                        name="solution"
                        render={({ field }) => (
                    <FormItem>
                    <FormLabel>Lösung</FormLabel>
                    <FormControl>
                        <Input placeholder="Lösung" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                 )}
                /> 
                <Button type="submit">Submit</Button>
            </form>
            </Form>
                </CardFooter>
            </Card>
        </div>
    )
    function onSubmit(values: z.infer<typeof exerciseSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    
    console.log(values)
  }
}