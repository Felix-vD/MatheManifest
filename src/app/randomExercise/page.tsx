"use client"
// pages/exercise/[id].tsx
import { GetServerSideProps, NextPage } from 'next';
import Exercise from '@/components/Exercise';
import UnsolvedRandomExercise from '@/components/UnsolvedRandomExercise';
const ExercisePage: NextPage = () => {
  

  

  // Handling the scenario where exercise is null or data is still fetching
  

  return (
     <UnsolvedRandomExercise></UnsolvedRandomExercise>
    //<EnhancedExerciseComponent></EnhancedExerciseComponent>
  );
};

export default ExercisePage;
