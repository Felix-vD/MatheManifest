"use client"
// pages/exercise/[id].tsx
import { GetServerSideProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';  // Adjust the path as necessary
import useRandomExercise from '../hook/useExercise';

const ExercisePage: NextPage = () => {
  const { isFetching, data } = useRandomExercise();
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
    <div>
      <h1>{exercise.title}</h1>
      <iframe src={exercise.url} style={{ width: '100%', height: '500px' }} />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userSolution}
          onChange={(e) => setUserSolution(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ExercisePage;
