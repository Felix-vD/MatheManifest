import {createStore} from 'zustand/vanilla';
import create from 'zustand';

interface Chapter {
    points: number;
    level: number;
    weight: number;
  }
  
  interface Topic {
    chapters: {
      [key: string]: Chapter;
    };
    overallWeight: number;
  }
  
  interface User {
    id: string | null;
    name: string;
  }
  
  interface StoreState {
    user: User;
    topics: {
      [key: string]: Topic;
    };
    setUser: (user: User) => void;
    setPoints: (topic: string, chapter: string, points: number) => void;
    setLevel: (topic: string, chapter: string, level: number) => void;
    resetState: () => void;
  }


  const useStore = create<StoreState>((set) => ({
    user: {
      id: null,
      name: '',
    },
    topics: {
      topic1: {
        chapters: {
          chapter1: {
            points: 0,
            level: 1,
            weight: 1.0,
          },
          chapter2: {
            points: 0,
            level: 1,
            weight: 1.5,
          },
        },
        overallWeight: 2.0,
      },
      topic2: {
        chapters: {
          chapter1: {
            points: 0,
            level: 1,
            weight: 1.0,
          },
          chapter2: {
            points: 0,
            level: 1,
            weight: 1.5,
          },
        },
        overallWeight: 3.0,
      },
    },
    // Actions
    setUser: (user) => set((state) => ({ user })),
    setPoints: (topic, chapter, points) =>
      set((state) => ({
        topics: {
          ...state.topics,
          [topic]: {
            ...state.topics[topic],
            chapters: {
              ...state.topics[topic].chapters,
              [chapter]: {
                ...state.topics[topic].chapters[chapter],
                points,
              },
            },
          },
        },
      })),
    setLevel: (topic, chapter, level) =>
      set((state) => ({
        topics: {
          ...state.topics,
          [topic]: {
            ...state.topics[topic],
            chapters: {
              ...state.topics[topic].chapters,
              [chapter]: {
                ...state.topics[topic].chapters[chapter],
                level,
              },
            },
          },
        },
      })),
    resetState: () =>
      set(() => ({
        user: { id: null, name: '' },
        topics: {
          topic1: { chapters: {}, overallWeight: 0 },
          topic2: { chapters: {}, overallWeight: 0 },
        },
      })),
  }));
  
  export default useStore;