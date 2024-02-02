// services/firestoreService.js

import { db } from '../firebase-config';
import { collection, getDocs, doc, listCollections } from 'firebase/firestore';

// Function to get collections or documents dynamically
export const getCollectionOrDocuments = async (pathArray) => {
  // Check if we are at the root (fetching top-level topics)
  if (pathArray.length === 0) {
    const topLevelRef = collection(db, 'Themen');
    const snapshot = await getDocs(topLevelRef);
    return snapshot.docs.map(doc => ({ id: doc.id, name: doc.id, ...doc.data() }));
  } else {
    // Fetching subcollections or documents dynamically based on the pathArray
    let currentRef = db;
    pathArray.forEach((path, index) => {
      if (index % 2 === 0) { // Collections are at even indices (0, 2, 4...)
        currentRef = collection(currentRef, path);
      } else { // Documents are at odd indices (1, 3, 5...)
        currentRef = doc(currentRef, path);
      }
    });
    
    // Attempt to list subcollections if we're at a document level
    if (pathArray.length % 2 !== 0) {
      try {
        const subcollections = await listCollections(currentRef);
        return subcollections.map(col => ({ id: col.id, name: col.id }));
      } catch (error) {
        console.error("Error listing subcollections:", error);
        return [];
      }
    }

    // If we're at a collection level, fetch documents within
    const snapshot = await getDocs(currentRef);
    return snapshot.docs.map(doc => ({ id: doc.id, name: doc.id, ...doc.data() }));
  }
};
