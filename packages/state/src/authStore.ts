import { create } from 'zustand';

type AuthStoreState = {
  user: string | null;
  login: (user: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStoreState>((set) => ({
  user: null,
  login: (user: string) => set({ user }),
  logout: () => set({ user: null }),
}));
