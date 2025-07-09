"use client"
// pages/exercise/[id].tsx
import { NextPage } from 'next';

import Exercise from '@/components/Exercise';

const ExercisePage: NextPage = () => {
  

  

  // Handling the scenario where exercise is null or data is still fetching
  

  return (
     <Exercise></Exercise>
    //<EnhancedExerciseComponent></EnhancedExerciseComponent>
  );
};

export default ExercisePage;
