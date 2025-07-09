// "use client";

// import { useState, useEffect } from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import useExamData, { type ExamGroup, type Topic, type Chapter } from "../hook/useExamData";
// import { createClient } from '@/utils/supabase/client'; 
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";

// // Define types for subsolutions and exercise solutions.
// type SubSolution = {
//   id?: string;
//   value: string;
// };

// type ExerciseSolution = {
//   id?: string;
//   subsolutions: SubSolution[];
// };

// type FormValues = {
//   examGroup?: string;
//   topic?: string;
//   chapter?: string;
//   exerciseName: string;
//   url: string;
//   points: string;
//   solutions: ExerciseSolution[];
// };

// // This type alias represents the nested path in FormValues.
// type NestedSolutionPath = `solutions.${number}.subsolutions`;

// const NewExerciseForm: React.FC = () => {
//   const { data: examData } = useExamData();
//   const {
//     register,
//     handleSubmit,
//     watch,
//     setValue,
//     reset,
//     control,
//     formState: { errors },
//   } = useForm<FormValues>({
//     defaultValues: {
//       exerciseName: "",
//       url: "",
//       points: "",
//       solutions: [],
//     },
//   });

//   // Outer field array for exercises.
//   const { fields: exerciseFields, append: appendExercise, remove: removeExercise } = useFieldArray({
//     control,
//     name: "solutions",
//   });

//   // Create an array of subsolution field arrays, one for each exercise
//   const subSolutionFieldArrays = exerciseFields.map((_, exerciseIndex) =>
//     useFieldArray<FormValues, NestedSolutionPath>({
//       control,
//       name: `solutions.${exerciseIndex}.subsolutions` as NestedSolutionPath,
//     })
//   );

//   const [topics, setTopics] = useState<Topic[]>([]);
//   const [chapters, setChapters] = useState<Chapter[]>([]);
//   const [formMessage, setFormMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

//   const selectedExamGroup = watch("examGroup");
//   const selectedTopic = watch("topic");

//   useEffect(() => {
//     if (selectedExamGroup && examData) {
//       const examGroup = examData.find((group) => group.id.toString() === selectedExamGroup);
//       setTopics(examGroup?.topics || []);
//       setValue("topic", "");
//       setChapters([]);
//       setValue("chapter", "");
//     }
//   }, [selectedExamGroup, examData, setValue]);

//   useEffect(() => {
//     if (selectedTopic) {
//       const topic = topics.find((t) => t.id.toString() === selectedTopic);
//       setChapters(topic?.chapters || []);
//       setValue("chapter", "");
//     }
//   }, [selectedTopic, topics, setValue]);

//   const clearSelections = () => {
//     setValue("examGroup", "");
//     setValue("topic", "");
//     setValue("chapter", "");
//   };

//   const onSubmit = async (data: FormValues) => {
//     // Convert each subsolution value from string to float.
//     const parsedSolutions = data.solutions.map((exercise) =>
//       exercise.subsolutions.map((sol) => parseFloat(sol.value))
//     );

//     const payload = {
//       title: data.exerciseName,
//       solution: parsedSolutions,
//       url: data.url,
//       points: Number.parseInt(data.points, 10),
//       chapter_id: data.chapter,
//       type_id: null,
//     };

//     const supabase = createClient();
//     const { error } = await supabase.from("exercises").insert(payload);

//     if (error) {
//       console.error("Error inserting exercise:", error.message);
//       setFormMessage({ type: "error", text: "Failed to create exercise. Please try again." });
//     } else {
//       setFormMessage({ type: "success", text: "Exercise created successfully!" });
//       reset({
//         exerciseName: "",
//         url: "",
//         points: "",
//         solutions: [],
//       });
//       clearSelections();
//     }
//   };

//   return (
//     <Card className="w-full max-w-2xl mx-auto">
//       <CardHeader>
//         <CardTitle>Create New Exercise</CardTitle>
//       </CardHeader>
//       <CardContent>
//         {formMessage && (
//           <div
//             className={`mb-4 p-2 rounded ${
//               formMessage.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//             }`}
//           >
//             {formMessage.text}
//           </div>
//         )}
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           {/* Exam Group, Topic, and Chapter selects */}
//           <div className="space-y-2">
//             <Label htmlFor="examGroup">Exam Group</Label>
//             <Select onValueChange={(value) => setValue("examGroup", value)} value={watch("examGroup")}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select Exam Group" />
//               </SelectTrigger>
//               <SelectContent>
//                 {examData?.map((group: ExamGroup) => (
//                   <SelectItem key={group.id} value={group.id.toString()}>
//                     {group.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="topic">Topic</Label>
//             <Select onValueChange={(value) => setValue("topic", value)} value={watch("topic")} disabled={!watch("examGroup")}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select Topic" />
//               </SelectTrigger>
//               <SelectContent>
//                 {topics.map((topic: Topic) => (
//                   <SelectItem key={topic.id} value={topic.id.toString()}>
//                     {topic.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="chapter">Chapter</Label>
//             <Select onValueChange={(value) => setValue("chapter", value)} value={watch("chapter")} disabled={!watch("topic")}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select Chapter" />
//               </SelectTrigger>
//               <SelectContent>
//                 {chapters.map((chapter: Chapter) => (
//                   <SelectItem key={chapter.id} value={chapter.id.toString()}>
//                     {chapter.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <Input id="exerciseName" placeholder="Exercise Name" {...register("exerciseName", { required: true })} />
//           <Input id="url" placeholder="URL" {...register("url", { required: true })} />
//           <Input id="points" type="number" placeholder="Points" {...register("points", { required: true })} />

//           {/* Nested Solutions Input */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-medium">Solutions (Nested Array Input)</h3>
//             {exerciseFields.map((exercise, exerciseIndex) => {
//               // Use the pre-created subSolutionFieldArrays instead of calling useFieldArray here
//               const { fields: subSolutionFields, append: appendSubSolution, remove: removeSubSolution } =
//                 subSolutionFieldArrays[exerciseIndex];
//               return (
//                 <div key={exercise.id} className="p-4 border rounded">
//                   <div className="flex items-center justify-between">
//                     <span className="font-medium">Exercise {exerciseIndex + 1}</span>
//                     <Button type="button" variant="destructive" onClick={() => removeExercise(exerciseIndex)}>
//                       Remove Exercise
//                     </Button>
//                   </div>
//                   {subSolutionFields.map((sub, subIndex) => (
//                     <div key={sub.id} className="flex items-center space-x-2 mt-2">
//                       <Input
//                         placeholder={`Solution ${subIndex + 1}`}
//                         {...register(
//                           `solutions.${exerciseIndex}.subsolutions.${subIndex}.value` as const,
//                           { required: true }
//                         )}
//                       />
//                       <Button type="button" variant="destructive" onClick={() => removeSubSolution(subIndex)}>
//                         Remove
//                       </Button>
//                     </div>
//                   ))}
//                   <Button type="button" onClick={() => appendSubSolution({ value: "" })} className="mt-2">
//                     Add Sub-solution
//                   </Button>
//                 </div>
//               );
//             })}
//             <Button type="button" onClick={() => appendExercise({ subsolutions: [] })}>
//               Add Exercise
//             </Button>
//           </div>

//           <Button type="submit" className="w-full">
//             Create Exercise
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// };

// export default NewExerciseForm;
