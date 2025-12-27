import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      role: null, // 'admin' | 'candidate' | 'agency'
      isAuthenticated: false,
      isLoading: true,

      setUser: (user, role) => set({
        user,
        role,
        isAuthenticated: !!user,
        isLoading: false
      }),

      clearUser: () => set({
        user: null,
        role: null,
        isAuthenticated: false,
        isLoading: false
      }),

      setLoading: (isLoading) => set({ isLoading })
    }),
    {
      name: 'qeyafa-auth',
      partialize: (state) => ({
        user: state.user,
        role: state.role,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);

