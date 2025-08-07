import type { StorageValue } from 'zustand/middleware';

const storage = {
  getItem: (name: string) => Promise.resolve(localStorage.getItem(name)),
  setItem: (name: string, value: string) =>
    Promise.resolve(localStorage.setItem(name, value)),
  removeItem: (name: string) => Promise.resolve(localStorage.removeItem(name)),
};

export const setUpStorage = <T>(name: string) => ({
  name: `${name}-storage`,
  storage: {
    getItem: async (key: string) => {
      const value = await storage.getItem(key);
      return value ? JSON.parse(value) : null;
    },
    setItem: async (key: string, value: StorageValue<T>) => {
      await storage.setItem(key, JSON.stringify(value));
    },
    removeItem: async (key: string) => await storage.removeItem(key),
  },
});
