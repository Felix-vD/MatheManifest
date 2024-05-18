"use client"
// pages/exercise/[id].tsx
import { GetServerSideProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';  // Adjust the path as necessary
import useRandomExercise from '../hook/useExercise';
import { useSearchParams } from 'next/navigation';
import Exercise from '@/components/Exercise';
const ExercisePage: NextPage = () => {
  

  

  // Handling the scenario where exercise is null or data is still fetching
  

  return (
    <Exercise></Exercise>
  );
};

export default ExercisePage;
