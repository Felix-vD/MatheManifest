// src/features/navigation/navigationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentLevel: 'topics',
  selectedIds: {
    topicId: null,
    chapterId: null,
    subchapterId: null,
    exerciseId: null,
  },
};

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    // Action to set the current navigation level
    setCurrentLevel: (state, action) => {
      state.currentLevel = action.payload;
    },
    // Action to update selected IDs; flexible to handle any ID updates
    setSelectedIds: (state, action) => {
      state.selectedIds = { ...state.selectedIds, ...action.payload };
    },
    // Action to reset the navigation state to its initial values
    resetNavigation: () => initialState,
  },
});

// Destructure and export the action creators
export const { setCurrentLevel, setSelectedIds, resetNavigation } = navigationSlice.actions;

// Default export the reducer
export default navigationSlice.reducer;
