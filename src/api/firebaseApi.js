// src/api/firebaseApi.js

import { db } from '../firebase-config'; // Your Firebase config
import { collection, getDocs, query, where } from 'firebase/firestore';

export const fetchTopics = async () => {
  const querySnapshot = await getDocs(collection(db, 'Themen'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
// Using "Themen", "Kapitel", "Unterkapitel", and "Aufgaben"
export const fetchChapters = async (topicId) => {
  const q = query(collection(db, 'Kapitel'), where('topicId', '==', topicId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ ...doc.data() }));
};


export const fetchSubchapters = async (topicId, chapterId) => {
  const q = query(collection(db, 'Unterkapitel'), where('topicId', '==', topicId), where('chapterId', '==', chapterId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const fetchExercises = async (topicId, chapterId, subchapterId) => {
  const q = query(collection(db, 'Aufgaben'), where('topicId', '==', topicId), where('chapterId', '==', chapterId), where('subchapterId', '==', subchapterId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
// Fetch exercises based on the provided ids. Each id is optional except topicId.
export const fetchExercisesFlexible = async (topicId, chapterId = null, subchapterId = null, exerciseId = null) => {
  let conditions = [where('topicId', '==', topicId)];
  
  // Dynamically add conditions based on the presence of chapterId and subchapterId
  if (chapterId) conditions.push(where('chapterId', '==', chapterId));
  if (subchapterId) conditions.push(where('subchapterId', '==', subchapterId));
  if (exerciseId) conditions.push(where('id', '==', exerciseId)); 
  
  const q = query(collection(db, 'Aufgaben'), ...conditions);
  const querySnapshot = await getDocs(q);
  const exercises = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
  // If you want to select a random exercise from the list
  if (exercises.length > 0) {
    const randomIndex = Math.floor(Math.random() * exercises.length);
    return exercises[randomIndex]; // Returns a single random exercise
  } else {
    return null; // or handle the case where there are no exercises
  }
};

// Implement fetchChapters and fetchSubchapters similarly, using the selectedIds to filter data
