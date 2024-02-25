// src/components/NavigationTable/NavigationTable.jsx

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentLevel, setSelectedIds } from '../../features/navigation/navigationSlice';
import { fetchTopics, fetchChapters, fetchSubchapters } from '../../api/firebaseApi'; // Assume these are functions you've defined to fetch data from Firebase

const NavigationTable = () => {
  const dispatch = useDispatch();
  const { currentLevel, selectedIds } = useSelector((state) => state.navigation);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let result = [];
      switch (currentLevel) {
        case 'topics':
          result = await fetchTopics();
          break;
        case 'chapters':
          result = await fetchChapters(selectedIds.topicId);
          break;
        case 'subchapters':
          result = await fetchSubchapters(selectedIds.topicId, selectedIds.chapterId);
          break;
        case 'exercises':
            // Add logic to fetch exercises
            break;
        // Add more cases as necessary
      }
      setData(result);
    };

    fetchData();
  }, [currentLevel, selectedIds]);

  const handleSelection = (id) => {
    const nextLevel = { topics: 'chapters', chapters: 'subchapters', subchapters: 'exercises' };
    const idKey = `${currentLevel}Id`; // e.g., topicId, chapterId
    dispatch(setSelectedIds({ [idKey]: id }));
    dispatch(setCurrentLevel(nextLevel[currentLevel]));
  };

  const handleBack = () => {
    const prevLevel = { chapters: 'topics', subchapters: 'chapters', exercises: 'subchapters' };
    if (currentLevel !== 'topics') {
      dispatch(setCurrentLevel(prevLevel[currentLevel]));
      // Optionally, reset selected IDs for the previous level
    }
  };

  return (
    <div>
      <button onClick={handleBack}>Back</button>
      <table>
        {/* Render table rows based on data */}
        {data.map((item) => (
          <tr key={item.id} onClick={() => handleSelection(item.id)}>
            <td>{item.name}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default NavigationTable;
