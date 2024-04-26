"use client"
// pages/exercise/[id].tsx
import { GetServerSideProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';  // Adjust the path as necessary
import useRandomExercise from '../hook/useExercise';

export default function Exercise(){
// interface ExerciseProps {
//   exercise: {
//     id: number;
//     title: string;
//     description: string;
//     pdfUrl: string;
//     solution: string;
//   };
// }
const {isFetching, data} = useRandomExercise();
console.log(data);
// const ExercisePage: NextPage<ExerciseProps> = ({ exercise }) => {
//   const [userSolution, setUserSolution] = useState('');

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (userSolution === exercise.solution) {
//       alert('Correct answer!');
//       // Optionally, redirect or fetch the next exercise
//     } else {
//       alert('Incorrect answer, try again!');
//     }
//   };

  return (
    // <div>
    //   <h1>{exercise.title}</h1>
    //   <p>{exercise.description}</p>
    //   <iframe src={exercise.pdfUrl} style={{ width: '100%', height: '500px' }} />
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       type="text"
    //       value={userSolution}
    //       onChange={(e) => setUserSolution(e.target.value)}
    //       required
    //     />
    //     <button type="submit">Submit</button>
    //   </form>
    // </div>
    <div>
        <h1>Hello WOOOORLD</h1>
    </div>
  );
};



