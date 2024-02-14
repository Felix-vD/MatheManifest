import React, { useState } from 'react';
import DataTable from '../shared/DataTable/DataTable';


const depthToSubcollections = {
  1: ["Aufgaben", "Kapitel"], // Assuming Themenbereiche is at depth 1
  3: ["Aufgaben", "Unterkapitel"],
  5: ['Aufgabentyp'],
  7: ['Aufgaben']
};

const DatabaseNavigator = () => {
  const [currentPath, setCurrentPath] = useState('Themenbereiche');
  const navigate = (newPath) => {
    setCurrentPath(newPath);
  };
  const pathSegments = currentPath.split('/').filter(Boolean);
  const depth = pathSegments.length;

  // Calculate subcollections based on current path depth
  const subcollections = depthToSubcollections[depth] || [];

  return (
    <div className={styles.DatabaseNavigator}>
      <h1>Database Navigator</h1>
      <DataTable path={currentPath} subcollections={subcollections} onNavigate={navigate} />
    </div>
  );
};

export default DatabaseNavigator;
