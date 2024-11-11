import { create } from 'zustand';


interface UserState {
  userId: string | null ;        // The user's ID (UUID)
  email: string | null;         // The user's email
  isLoggedIn: boolean;          // Boolean to indicate whether the user is logged in
  setUser: (id: string, email: string) => void;  // Function to set the user ID and email (after login)
  clearUser: () => void;        // Function to clear the user state (after logout)
}

export const useUserStore = create<UserState>((set) => ({
  userId: '',  // Initially, no user is logged in
  email: null,   // Initially, no email is set
  isLoggedIn: false,

  setUser: (id, email) => set({ userId: id, email: email, isLoggedIn: true }),

  clearUser: () => set({ userId: null, email: null, isLoggedIn: false }),
}));
