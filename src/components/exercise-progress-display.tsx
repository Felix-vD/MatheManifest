'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import useRanking from '@/app/hook/useRanking'

export default function ExerciseProgressDisplay() {
  const [solvedExercises, setSolvedExercises] = useState<number>(0)
  const { data: rankingData, isLoading } = useRanking()

  useEffect(() => {
    if (!isLoading && rankingData) {
      setSolvedExercises(rankingData.total_solved || 0)
    }
  }, [rankingData, isLoading])

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Exercise Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-2xl font-bold">
          {isLoading ? 'Loading...' : `${solvedExercises} Exercises Solved`}
        </p>
      </CardContent>
    </Card>
  )
}