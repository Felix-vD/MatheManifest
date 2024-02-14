import React from "react";
import { collection } from "@firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../../firebase-config"; // Adjust the import path as needed
import styles from "./DataTable.module.css";

export default function DataTable({ path, subcollections, onNavigate}) {
  const query = collection(db, path);
  const [documents, loading, error] = useCollectionData(query, { idField: 'id' });
   // Click handler for subcollection buttons
   const handleClick = (docName, subcollection) => {
    const newPath = `${path}/${docName}/${subcollection}`;
    onNavigate(newPath); // Call the passed in navigate function with new path
  };
  // Function to navigate back up one level
  const handleBack = () => {
    const pathSegments = path.split('/').filter(Boolean);
  
    // Remove the last segment if we are at a document level (even number of segments),
    // or the last two segments if we are at a subcollection level (odd number of segments),
    // to navigate back to the parent collection.
    if (pathSegments.length % 2 === 0) { // If at a document level, remove one segment to go to its collection
      pathSegments.pop();
    } else if (pathSegments.length > 1) { // If at a subcollection, remove two segments to go to the parent collection
      pathSegments.pop();
      pathSegments.pop();
    }
  
    const newPath = pathSegments.join('/') || 'Themenbereiche'; // Join the remaining segments or default to root collection
    onNavigate(newPath);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div className={styles.dataTableContainer}>
      
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Themenbereiche oder Watt?</th>
            <th>Gehen der Papst, John Wick und Simon Wegener in eine bar...</th>
          </tr>
        </thead>
        <tbody>
          {documents && documents.map(doc => (
            <tr key={doc.id}>
              <td>{doc.name}</td>
              <td>
                {subcollections.map(subcol => (
                  <button className={styles.button} key={subcol} onClick={() => handleClick(doc.name, subcol)}>
                    {subcol}
                  </button>
                ))}
              </td>
            </tr>
          ))}
          {path !== "Themenbereiche" && (
                <tr>
                 <td colspan="2" style={{ textAlign: 'right' }}> {/* Ensure colspan matches the number of columns */}
                   <div className={styles.backButtonContainer}>
                     <button className={styles.backButton} onClick={handleBack}>Back</button>
                   </div>
                 </td>
               </tr>
              )}
        </tbody>
      </table>
    </div>
  );
}
