import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

type AuthStoreState = {
  user: string | null;
  login: (user: string) => void;
  logout: () => void;
};

const storage =
  Platform?.OS === 'web'
    ? {
        getItem: (name: string) => Promise.resolve(localStorage.getItem(name)),
        setItem: (name: string, value: string) =>
          Promise.resolve(localStorage.setItem(name, value)),
        removeItem: (name: string) =>
          Promise.resolve(localStorage.removeItem(name)),
      }
    : AsyncStorage;

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
    }
  )
);
