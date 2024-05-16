"use client"
// pages/exercise/[id].tsx
import { GetServerSideProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';  // Adjust the path as necessary
import useRandomExercise from '../hook/useExercise';
import { useSearchParams } from 'next/navigation';
import Exercise from '@/components/Exercise';
const ExercisePage: NextPage = () => {
  const searchParams = useSearchParams();
  const timestamp  = searchParams.get("timestamp");
  const { isFetching, data } = useRandomExercise(Number(timestamp));
  const [userSolution, setUserSolution] = useState('');

  // Check if data is loaded and not empty
  const exercise = data && data.length > 0 ? data[0] : null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userSolution === exercise?.solution) {
      alert('Correct answer!');
      // Optionally, redirect or fetch the next exercise
    } else {
      alert('ICH HAB GESAGT DAS IST FALSCH DU BLÖDE SAU DU');
    }
  };

  // Handling the scenario where exercise is null or data is still fetching
  if (isFetching || !exercise) {
    return <div>Loading...</div>;
  }

  return (
    <Exercise></Exercise>
  );
};

export default ExercisePage;
