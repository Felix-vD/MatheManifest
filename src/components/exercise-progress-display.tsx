"use client"

import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Sparkles } from 'lucide-react'
import useRanking from '@/app/hook/useRanking'

export function ExerciseProgressDisplayComponent() {
  const [progress, setProgress] = useState(0)
  const { data: rankingData, isLoading } = useRanking()
  const totalExercises = 100 // Assuming a default total, replace as needed
  const solvedExercises = rankingData?.total_solved || 0
  const controls = useAnimation()

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        const newProgress = (solvedExercises / totalExercises) * 100
        setProgress(newProgress)
        controls.start({
          width: `${newProgress}%`,
          transition: { duration: 0.5, ease: "easeInOut" }
        })
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [solvedExercises, totalExercises, isLoading, controls])

  return (
    <Card className="w-full max-w-md overflow-hidden">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Exercise Progress</CardTitle>
        <CardDescription>Track your learning journey</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative pt-4">
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={controls}
            />
          </div>
          <motion.div
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Sparkles className="absolute right-0 top-1/2 transform -translate-y-1/2 text-yellow-400" />
          </motion.div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm font-medium">Exercises Completed</p>
          <Badge variant="secondary" className="text-lg font-bold">
            {solvedExercises} / {totalExercises}
          </Badge>
        </div>
        <motion.p 
          className="mt-2 text-center text-xl font-bold text-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {Math.round(progress)}% Complete
        </motion.p>
      </CardContent>
    </Card>
  )
}