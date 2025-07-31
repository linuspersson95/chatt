import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthStoreState = {
  user: string | null;
  login: (user: string) => void;
  logout: () => void;
};

const storage = {
  getItem: (name: string) => Promise.resolve(localStorage.getItem(name)),
  setItem: (name: string, value: string) =>
    Promise.resolve(localStorage.setItem(name, value)),
  removeItem: (name: string) => Promise.resolve(localStorage.removeItem(name)),
};

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      user: null,
      login: (user: string) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
      storage: {
        getItem: async (key) => {
          const value = await storage.getItem(key);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (key, value) => {
          await storage.setItem(key, JSON.stringify(value));
        },
        removeItem: async (key) => await storage.removeItem(key),
      },
    },
  ),
);
