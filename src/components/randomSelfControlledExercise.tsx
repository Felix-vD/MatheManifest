"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertDialogDemo } from "@/components/ExerciseModal"
import useRandomExercise from "@/app/hook/useExercise"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import useUser from "@/app/hook/useUser"
import { useUpdateTotalSolved } from "@/app/hook/useIncrementRanking"
import { Eye, EyeOff } from "lucide-react"

export default function Exercise() {
  const { isFetching: isFetchingUser, data: userData } = useUser()

  // Fetch the exercise data
  const { isFetching, data, refetchExercise } = useRandomExercise()

  // Get hook to increment total solved exercises
  const { updateTotalSolved } = useUpdateTotalSolved()

  // Check if exercise data is received
  const exercise = data && data.length > 0 ? data[0] : null

  // Create router to manage rerouting on user actions
  const router = useRouter()

  // Use state for exercise completed dialog field
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // State to control solution visibility
  const [showSolution, setShowSolution] = useState(false)

  // Handle solved action
  const handleSolved = async () => {
    try {
      await updateTotalSolved(userData?.id)
      console.log("Exercise saved successfully")
      setIsDialogOpen(true)
      console.log("Exercise solved successfully")
    } catch (error) {
      console.error("Error incrementing total solved count:", error)
    }
  }

  // Handle didn't solve action
  const handleDidntSolve = () => {
    // You can add any logic here for tracking attempts
    console.log("User attempted but didn't solve the exercise")
    refetchExercise() // Fetch a new exercise
    setShowSolution(false) // Hide solution for new exercise
  }

  // Handle cancel action in exercise dialog
  const handleCancel = () => {
    setIsDialogOpen(false)
    router.push("/home")
  }

  // Handle action in exercise dialog
  const handleAction = () => {
    setIsDialogOpen(false)
    refetchExercise() // Fetch a new exercise
    setShowSolution(false) // Hide solution for new exercise
  }

  // Handle skip action
  const handleSkip = () => {
    refetchExercise() // Fetch a new exercise
    setShowSolution(false) // Hide solution for new exercise
  }

  // Toggle solution visibility
  const toggleSolution = () => {
    setShowSolution(!showSolution)
  }

  // Display loading state
  if (isFetching) {
    return <div>Loading...</div>
  }

  // Display message if no exercise found
  if (!exercise) {
    return <div>No exercise found.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <CardTitle>{exercise.title}</CardTitle>
          <CardDescription>{exercise.description}</CardDescription>
        </CardHeader>

        <CardContent className="p-0" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <embed src={`${exercise.url}#toolbar=0`} width="800" height="1131" />
        </CardContent>

        {/* Solution display section */}
        {showSolution && (
          <CardContent className="border-t bg-muted/50">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Lösung:</h3>
              <p className="text-lg font-mono bg-background p-3 rounded border inline-block">{exercise.solution}</p>
            </div>
          </CardContent>
        )}

        <CardFooter className="flex flex-col gap-4">
          {/* Show/Hide solution button */}
          <div className="w-full flex justify-center">
            <Button variant="outline" onClick={toggleSolution} className="flex items-center gap-2 bg-transparent">
              {showSolution ? (
                <>
                  <EyeOff className="h-4 w-4" />
                  Lösung verstecken
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" />
                  Lösung anzeigen
                </>
              )}
            </Button>
          </div>

          {/* Action buttons */}
          <div className="w-full flex justify-center gap-3 flex-wrap">
            <Button onClick={handleSolved} className="bg-green-600 hover:bg-green-700">
              Gelöst!
            </Button>

            <Button variant="destructive" onClick={handleDidntSolve}>
              Nicht gelöst
            </Button>

            <Button variant="secondary" onClick={handleSkip}>
              Überspringen
            </Button>
          </div>
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
