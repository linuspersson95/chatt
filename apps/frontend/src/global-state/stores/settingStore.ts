import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeMode } from '@frontend/types';
import { setUpStorage } from './setupStorage';

type SettingStoreState = {
  themeMode: ThemeMode;
  setThemeMode: (themeMode: ThemeMode) => void;
};

export const useSettingStore = create<SettingStoreState>()(
  persist(
    (set) => ({
      themeMode: window.matchMedia('(prefers-color-scheme: dark)')
        ? 'dark'
        : 'light',
      setThemeMode: (themeMode: ThemeMode) => set({ themeMode }),
    }),
    setUpStorage<SettingStoreState>('setting'),
  ),
);
