'use client'

import { useState, useEffect } from 'react'
import Confetti from 'react-confetti'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function Celebration() {
  const [windowDimension, setWindowDimension] = useState({ width: 0, height: 0 })
  const router = useRouter()

  useEffect(() => {
    setWindowDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }, [])

  const goToDashboard = () => {
    router.push('/dashboard')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <Confetti
        width={windowDimension.width}
        height={windowDimension.height}
        recycle={false}
        numberOfPieces={1000}
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="text-center"
      >
        <h1 className="text-6xl font-bold text-white mb-6">🎉 Congratulations! 🎉</h1>
        <p className="text-2xl text-white mb-8">You&apos;ve solved all the exercises!</p>
      </motion.div>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button 
          onClick={goToDashboard}
          size="lg"
          className="bg-white text-purple-600 hover:bg-purple-100 transition-colors duration-200"
        >
          Back to Dashboard
        </Button>
      </motion.div>
    </div>
  )
}