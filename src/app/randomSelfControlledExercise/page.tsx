"use client"
// pages/exercise/[id].tsx
import { NextPage } from 'next';

import RandomSelfControlledExercise from '@/components/randomSelfControlledExercise';

const ExercisePage: NextPage = () => {
  

  

  // Handling the scenario where exercise is null or data is still fetching
  

  return (
     <RandomSelfControlledExercise></RandomSelfControlledExercise>
    //<EnhancedExerciseComponent></EnhancedExerciseComponent>
  );
};

export default ExercisePage;
