"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, useMotionValue, useTransform, animate } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Trophy } from 'lucide-react'

import { Card, CardContent } from "@/components/ui/card"

// Custom hook for counter animation
function useCounter(end: number, duration: number = 2) {
  const nodeRef = useRef<HTMLSpanElement>(null)
  
  useEffect(() => {
    const node = nodeRef.current
    if (node) {
      const controls = animate(0, end, {
        duration,
        onUpdate(value) {
          node.textContent = Math.round(value).toString()
        },
      })
      return () => controls.stop()
    }
  }, [end])

  return nodeRef
}

// Custom hook for circular progress
function useCircularProgress(percentage: number) {
  const circumference = 2 * Math.PI * 120 // 2πr where r = 120 (radius of our circle)
  const strokeDashoffset = circumference - (percentage / 100) * circumference
  return useTransform(useMotionValue(strokeDashoffset), (latest) => latest)
}

export function ExerciseProgress({ exercisesSolved = 75, totalExercises = 100 }: { exercisesSolved?: number, totalExercises?: number }) {
  const [showConfetti, setShowConfetti] = useState(false)
  const progress = (exercisesSolved / totalExercises) * 100
  const counterRef = useCounter(exercisesSolved)
  const strokeDashoffset = useCircularProgress(progress)
  const controls = useAnimation()

  useEffect(() => {
    controls.start({ strokeDashoffset, transition: { duration: 2, ease: "easeInOut" } })
    
    // Trigger confetti for milestones
    if (exercisesSolved === 50 || exercisesSolved === 100) {
      setShowConfetti(true)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
      setTimeout(() => setShowConfetti(false), 5000)
    }
  }, [exercisesSolved, controls, strokeDashoffset])

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden">
      <CardContent className="p-6">
        <div className="relative flex flex-col items-center justify-center">
          <svg className="w-64 h-64" viewBox="0 0 264 264">
            <circle cx="132" cy="132" r="120" fill="none" stroke="#e2e8f0" strokeWidth="12" />
            <motion.circle
              cx="132"
              cy="132"
              r="120"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="12"
              strokeDasharray={2 * Math.PI * 120}
              initial={{ strokeDashoffset: 2 * Math.PI * 120 }}
              animate={controls}
              style={{ rotate: -90, transformOrigin: "50% 50%" }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span 
              ref={counterRef} 
              className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
              aria-live="polite"
              aria-atomic="true"
            >
              0
            </span>
            <span className="text-xl text-gray-600 dark:text-gray-400">exercises solved</span>
          </div>
          {showConfetti && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <Trophy className="w-16 h-16 text-yellow-400 animate-bounce" />
            </motion.div>
          )}
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total Progress: {progress.toFixed(1)}% ({exercisesSolved} / {totalExercises})
          </p>
        </div>
      </CardContent>
    </Card>
  )
}