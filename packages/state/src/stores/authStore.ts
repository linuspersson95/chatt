import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { setUpStorage } from './setupStorage';

type AuthStoreState = {
  user: string | null;
  login: (user: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      user: null,
      login: (user: string) => set({ user }),
      logout: () => set({ user: null }),
    }),
    setUpStorage<AuthStoreState>('auth'),
  ),
);
