"use client"
// pages/exercise/[id].tsx
import {  NextPage } from 'next';

import TestExercise from '@/components/TestExercise';
const ExercisePage: NextPage = () => {
  

  

  // Handling the scenario where exercise is null or data is still fetching
  

  return (
    <TestExercise></TestExercise>
  );
};

export default ExercisePage;
