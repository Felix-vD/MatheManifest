import React, { useState, useEffect } from 'react';
import DataTable from '../shared/DataTable/DataTable';
import { getCollectionOrDocuments } from '../../services/firestoreService'; // Adjust the import path as needed
import styles from './DatabaseNavigator.module.css'; // Assuming you have or will create CSS for this component

const DatabaseNavigator = () => {
  const [currentLevelData, setCurrentLevelData] = useState([]);
  const [currentPath, setCurrentPath] = useState([]); // Tracks the current navigation path

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCollectionOrDocuments([]);
      setCurrentLevelData(data);
    };

    fetchData().catch(console.error);
  }, []);

  const handleNext = async (item) => {
    const newPath = [...currentPath, item.name];
    const data = await getCollectionOrDocuments(newPath);
    setCurrentLevelData(data);
    setCurrentPath(newPath);
  };

  const handleBack = async () => {
    const newPath = currentPath.slice(0, -1); // Go up one level in the path
    const data = await getCollectionOrDocuments(newPath);
    setCurrentLevelData(data);
    setCurrentPath(newPath);
  };

  return (
    <div className={styles.container}>
      <DataTable
        data={currentLevelData}
        onNext={handleNext}
        onTrain={() => {}} // Placeholder for future implementation
        onBack={handleBack}
        canGoBack={currentPath.length > 0}
      />
    </div>
  );
};

export default DatabaseNavigator;