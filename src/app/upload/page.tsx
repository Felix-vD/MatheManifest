"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import useExamData, { type ExamGroup, type Topic, type Chapter } from "../hook/useExamData"
import { supabaseBrowser } from "@utils/supabase/browser"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const NewExerciseForm: React.FC = () => {
  const { data: examData, isLoading, error } = useExamData()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm()

  const [topics, setTopics] = useState<Topic[]>([])
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [formMessage, setFormMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const selectedExamGroup = watch("examGroup")
  const selectedTopic = watch("topic")

  useEffect(() => {
    if (selectedExamGroup && examData) {
      const examGroup = examData.find((group) => group.id.toString() === selectedExamGroup)
      setTopics(examGroup?.topics || [])
      setValue("topic", "")
      setChapters([])
      setValue("chapter", "")
    }
  }, [selectedExamGroup, examData, setValue])

  useEffect(() => {
    if (selectedTopic) {
      const topic = topics.find((t) => t.id.toString() === selectedTopic)
      setChapters(topic?.chapters || [])
      setValue("chapter", "")
    }
  }, [selectedTopic, topics, setValue])

  const clearSelections = () => {
    setValue("examGroup", "")
    setValue("topic", "")
    setValue("chapter", "")
  }

  const onSubmit = async (data: any) => {
    const payload = {
      title: data.exerciseName,
      solution: Number.parseFloat(data.solution),
      url: data.url,
      points: Number.parseInt(data.points, 10),
      chapter_id: data.chapter,
      type_id: null,
    }

    const supabase = supabaseBrowser()
    const { error } = await supabase.from("exercises").insert(payload)

    if (error) {
      console.error("Error inserting exercise:", error.message)
      setFormMessage({ type: "error", text: "Failed to create exercise. Please try again." })
    } else {
      setFormMessage({ type: "success", text: "Exercise created successfully!" })
      reset({
        exerciseName: "",
        url: "",
        solution: "",
        points: "",
      })
      clearSelections()
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Exercise</CardTitle>
      </CardHeader>
      <CardContent>
        {formMessage && (
          <div className={`mb-4 p-2 rounded ${formMessage.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {formMessage.text}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="examGroup">Exam Group</Label>
            <Select onValueChange={(value) => setValue("examGroup", value)} value={selectedExamGroup}>
              <SelectTrigger>
                <SelectValue placeholder="Select Exam Group" />
              </SelectTrigger>
              <SelectContent>
                {examData?.map((group: ExamGroup) => (
                  <SelectItem key={group.id} value={group.id.toString()}>
                    {group.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="topic">Topic</Label>
            <Select onValueChange={(value) => setValue("topic", value)} value={selectedTopic} disabled={!selectedExamGroup}>
              <SelectTrigger>
                <SelectValue placeholder="Select Topic" />
              </SelectTrigger>
              <SelectContent>
                {topics.map((topic: Topic) => (
                  <SelectItem key={topic.id} value={topic.id.toString()}>
                    {topic.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="chapter">Chapter</Label>
            <Select onValueChange={(value) => setValue("chapter", value)} value={watch("chapter")} disabled={!selectedTopic}>
              <SelectTrigger>
                <SelectValue placeholder="Select Chapter" />
              </SelectTrigger>
              <SelectContent>
                {chapters.map((chapter: Chapter) => (
                  <SelectItem key={chapter.id} value={chapter.id.toString()}>
                    {chapter.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Input id="exerciseName" placeholder="Exercise Name" {...register("exerciseName", { required: true })} />
          <Input id="url" placeholder="URL" {...register("url", { required: true })} />
          <Input id="solution" type="number" step="0.01" placeholder="Solution (Float)" {...register("solution", { required: true })} />
          <Input id="points" type="number" placeholder="Points" {...register("points", { required: true })} />

          <Button type="submit" className="w-full">
            Create Exercise
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default NewExerciseForm
