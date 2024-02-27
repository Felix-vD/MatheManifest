import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTopics, fetchChapters, fetchSubchapters, fetchExercises } from '../../api/firebaseApi';
import { setCurrentLevel, setSelectedIds } from '../../features/navigation/navigationSlice';

const ContentDisplay = () => {
  const [content, setContent] = useState([]);
  const { currentLevel, selectedIds } = useSelector(state => state.navigation);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      switch (currentLevel) {
        case 'topics':
          setContent(await fetchTopics());
          break;
        case 'chapters':
          console.log("selectedIds.topicId", selectedIds.topicId);
          setContent(await fetchChapters(selectedIds.topicId));
          break;
        case 'subchapters':
          setContent(await fetchSubchapters(selectedIds.topicId, selectedIds.chapterId));
          break;
        case 'exercises':
          setContent(await fetchExercises(selectedIds.topicId, selectedIds.chapterId, selectedIds.subchapterId));
          break;
        // Add case for exercises if needed
      }
    };

    fetchData();
  }, [currentLevel, selectedIds]);

  const getIdFromItem = (item) => {
    switch (currentLevel) {
      case 'topics':
        return item.topicId;
      case 'chapters':
        return item.chapterId;
      case 'subchapters':
        return item.subchapterId;
      case 'exercises':
        return item.exerciseId;
      // Continue for other levels as needed
      default:
        return null; // Adjust based on your needs
    }
  };
  

  const handleNavigate = (id, level) => {
    let nextLevel;
    switch (level) {
      case 'topics':
        nextLevel = 'chapters';
        dispatch(setSelectedIds({ topicId: id }));
        break;
      case 'chapters':
        nextLevel = 'subchapters';
        dispatch(setSelectedIds({ ...selectedIds, chapterId: id }));
        break;
      case 'subchapters':
        nextLevel = 'exercises'; // Ensure this transition is correctly handled
        dispatch(setSelectedIds({ ...selectedIds, subchapterId: id }));
        break;
      case 'exercises':
        // Handle navigation or actions within exercises if needed
        console.warn('Exercises level reached. Define behavior.'); 
        dispatch(setSelectedIds({ ...selectedIds, exerciseId: id }));
        // Prevent the unhandled level error
        return;
      default:
        console.error('Unhandled level:', level);
        return;
    }
  
    dispatch(setCurrentLevel(nextLevel));
  };
  const handleBack = () => {
    // Logic to navigate back up one level
    let prevLevel;
    switch (currentLevel) {
      case 'chapters':
        prevLevel = 'topics';
        dispatch(setSelectedIds({ ...selectedIds, topicId: null, chapterId: null }));
        break;
      case 'subchapters':
        prevLevel = 'chapters';
        dispatch(setSelectedIds({ ...selectedIds, chapterId: null, subchapterId: null }));
        break;
      case 'exercises':
        prevLevel = 'subchapters';
        dispatch(setSelectedIds({ ...selectedIds, subchapterId: null, exerciseId: null }));
        break;
      // Add more cases as needed
    }
    dispatch(setCurrentLevel(prevLevel));
  };
  const selectExercise = async () => {
    let exercise;

  try {
    if (currentLevel === 'topics') {
      exercise = await fetchExercises(selectedIds.topicId, null, null);
    } else if (currentLevel === 'chapters') {
      exercise = await fetchExercises(selectedIds.topicId, selectedIds.chapterId, null);
    } else if (currentLevel === 'subchapters') {
      exercise = await fetchExercises(selectedIds.topicId, selectedIds.chapterId, selectedIds.subchapterId);
    }

    if (exercise) {
      console.log(exercise.name); // Log the name of the exercise
    } else {
      console.log('No exercise found');
    }
  } catch (error) {
    console.error('Error fetching exercise:', error);
  }
    console.log('Exercise selected');
  };
  return (
    <>
      {currentLevel !== 'topics' && (
        <button onClick={handleBack}>Back</button>
      )}
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {content.map((item) => (
          <tr key={getIdFromItem(item)}>
            <td>{item.name}</td>
            <td>
              {currentLevel !== 'exercises' && (
                <button onClick={() => handleNavigate(getIdFromItem(item), currentLevel)}>Select</button>
              )}
              <button onClick={() => selectExercise}>Train</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
};

export default ContentDisplay;
