"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertDialogDemo } from "@/components/ExerciseModal"
import useRandomExercise from "@/app/hook/useExercise"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import useUser from "@/app/hook/useUser"
import { useUpdateTotalSolved } from "@/app/hook/useIncrementRanking"
import { Eye, EyeOff, Check, X } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Types for MCQ structure
interface MCQOption {
  id: string
  label: string
  text: string
  isCorrect: boolean
}

interface MCQQuestion {
  type: "multiple_choice"
  multipleAnswersAllowed: boolean
  options: MCQOption[]
}

interface MCQSolution extends Array<MCQQuestion> {}

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

  // State for MCQ answers
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, string[]>>({})
  const [mcqFeedback, setMcqFeedback] = useState<Record<number, { isCorrect: boolean; message: string }>>({})
  const [allQuestionsCorrect, setAllQuestionsCorrect] = useState(false)

  // Parse MCQ solution
  const parseMCQSolution = (solutionString: string): MCQSolution | null => {
    try {
      return JSON.parse(solutionString) as MCQSolution
    } catch (error) {
      console.error("Error parsing MCQ solution:", error)
      return null
    }
  }

  // Handle MCQ answer selection
  const handleMCQAnswer = (questionIndex: number, optionId: string, isMultiple: boolean) => {
    setMcqAnswers(prev => {
      const currentAnswers = prev[questionIndex] || []
      
      if (isMultiple) {
        // For multiple choice, toggle the option
        const newAnswers = currentAnswers.includes(optionId)
          ? currentAnswers.filter(id => id !== optionId)
          : [...currentAnswers, optionId]
        return { ...prev, [questionIndex]: newAnswers }
      } else {
        // For single choice, replace the answer
        return { ...prev, [questionIndex]: [optionId] }
      }
    })
  }

  // Check MCQ answer for a specific question
  const checkMCQAnswer = (questionIndex: number, question: MCQQuestion) => {
    const userAnswers = mcqAnswers[questionIndex] || []
    const correctAnswers = question.options.filter(opt => opt.isCorrect).map(opt => opt.id)
    
    const isCorrect = userAnswers.length === correctAnswers.length && 
                     userAnswers.every(answer => correctAnswers.includes(answer))
    
    let message = ""
    if (isCorrect) {
      message = "Richtig! ✓"
    } else if (userAnswers.length === 0) {
      message = "Bitte wählen Sie eine Antwort aus."
    } else if (question.multipleAnswersAllowed) {
      const missingAnswers = correctAnswers.filter(correct => !userAnswers.includes(correct))
      const wrongAnswers = userAnswers.filter(answer => !correctAnswers.includes(answer))
      
      if (missingAnswers.length > 0 && wrongAnswers.length > 0) {
        message = "Teilweise richtig. Einige Antworten fehlen und einige sind falsch."
      } else if (missingAnswers.length > 0) {
        message = "Teilweise richtig. Einige richtige Antworten fehlen."
      } else if (wrongAnswers.length > 0) {
        message = "Teilweise richtig. Einige ausgewählte Antworten sind falsch."
      }
    } else {
      message = "Falsch. Versuchen Sie es erneut."
    }
    
    setMcqFeedback(prev => ({
      ...prev,
      [questionIndex]: { isCorrect, message }
    }))
  }

  // Check if all MCQ questions are answered correctly
  const checkAllMCQAnswers = (mcqSolution: MCQSolution) => {
    const allCorrect = mcqSolution.every((_, index) => mcqFeedback[index]?.isCorrect)
    setAllQuestionsCorrect(allCorrect)
    return allCorrect
  }

  // Render MCQ solution
  const renderMCQSolution = (mcqSolution: MCQSolution) => {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-center">Fragen beantworten:</h3>
        {mcqSolution.map((question, questionIndex) => (
          <Card key={questionIndex} className="border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="text-base">Frage {questionIndex + 1}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {question.multipleAnswersAllowed ? (
                // Multiple choice with checkboxes
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    (Mehrere Antworten möglich)
                  </p>
                  {question.options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`q${questionIndex}-${option.id}`}
                        checked={(mcqAnswers[questionIndex] || []).includes(option.id)}
                        onCheckedChange={() => handleMCQAnswer(questionIndex, option.id, true)}
                      />
                      <Label
                        htmlFor={`q${questionIndex}-${option.id}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        <span className="font-medium">{option.label}:</span> {option.text}
                      </Label>
                    </div>
                  ))}
                </div>
              ) : (
                // Single choice with radio buttons
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    (Eine Antwort auswählen)
                  </p>
                  <RadioGroup
                    value={(mcqAnswers[questionIndex] || [])[0] || ""}
                    onValueChange={(value: string) => handleMCQAnswer(questionIndex, value, false)}
                  >
                    {question.options.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.id} id={`q${questionIndex}-${option.id}`} />
                        <Label
                          htmlFor={`q${questionIndex}-${option.id}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          <span className="font-medium">{option.label}:</span> {option.text}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => checkMCQAnswer(questionIndex, question)}
                  disabled={!(mcqAnswers[questionIndex]?.length > 0)}
                >
                  <Check className="h-4 w-4 mr-1" />
                  Antwort prüfen
                </Button>
                
                {mcqFeedback[questionIndex] && (
                  <Alert className={`flex-1 ${mcqFeedback[questionIndex].isCorrect ? 'border-green-500' : 'border-red-500'}`}>
                    <AlertDescription className="flex items-center gap-2">
                      {mcqFeedback[questionIndex].isCorrect ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <X className="h-4 w-4 text-red-600" />
                      )}
                      {mcqFeedback[questionIndex].message}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  // Render solution based on exercise type
  const renderSolution = () => {
    if (!exercise) return null
    
    const exerciseMethod = exercise.method || "one_solution" // Default to existing behavior
    
    switch (exerciseMethod) {
      case "MCQ":
        const mcqSolution = parseMCQSolution(exercise.solution)
        if (mcqSolution) {
          checkAllMCQAnswers(mcqSolution)
          return renderMCQSolution(mcqSolution)
        }
        return <p className="text-red-500">Fehler beim Laden der MCQ-Fragen.</p>
      
      case "open_ended":
        // TODO: Implement open-ended question rendering
        return <p className="text-center">Open-ended questions coming soon...</p>
      
      case "one_solution":
      default:
        // Existing simple solution display
        return (
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Lösung:</h3>
            <p className="text-lg font-mono bg-background p-3 rounded border inline-block">{exercise.solution}</p>
          </div>
        )
    }
  }

  // Handle solved action
  const handleSolved = async () => {
    const exerciseMethod = exercise?.method || "one_solution"
    
    if (exerciseMethod === "MCQ") {
      const mcqSolution = parseMCQSolution(exercise.solution)
      if (mcqSolution && !checkAllMCQAnswers(mcqSolution)) {
        alert("Bitte beantworten Sie alle Fragen korrekt, bevor Sie fortfahren.")
        return
      }
    }
    
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
    console.log("User attempted but didn't solve the exercise")
    refetchExercise()
    setShowSolution(false)
    setMcqAnswers({})
    setMcqFeedback({})
    setAllQuestionsCorrect(false)
  }

  // Handle cancel action in exercise dialog
  const handleCancel = () => {
    setIsDialogOpen(false)
    router.push("/home")
  }

  // Handle action in exercise dialog
  const handleAction = () => {
    setIsDialogOpen(false)
    refetchExercise()
    setShowSolution(false)
    setMcqAnswers({})
    setMcqFeedback({})
    setAllQuestionsCorrect(false)
  }

  // Handle skip action
  const handleSkip = () => {
    refetchExercise()
    setShowSolution(false)
    setMcqAnswers({})
    setMcqFeedback({})
    setAllQuestionsCorrect(false)
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

  const exerciseMethod = exercise.method || "one_solution"

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
            {renderSolution()}
          </CardContent>
        )}

        <CardFooter className="flex flex-col gap-4">
          {/* Show/Hide solution button */}
          <div className="w-full flex justify-center">
            <Button variant="outline" onClick={toggleSolution} className="flex items-center gap-2 bg-transparent">
              {showSolution ? (
                <>
                  <EyeOff className="h-4 w-4" />
                  {exerciseMethod === "MCQ" ? "Fragen verstecken" : "Lösung verstecken"}
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" />
                  {exerciseMethod === "MCQ" ? "Fragen anzeigen" : "Lösung anzeigen"}
                </>
              )}
            </Button>
          </div>

          {/* Action buttons */}
          <div className="w-full flex justify-center gap-3 flex-wrap">
            <Button 
              onClick={handleSolved} 
              className="bg-green-600 hover:bg-green-700"
              disabled={exerciseMethod === "MCQ" && showSolution && !allQuestionsCorrect}
            >
              {exerciseMethod === "MCQ" ? "Abgeschlossen!" : "Gelöst!"}
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
