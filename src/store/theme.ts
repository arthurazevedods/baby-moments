import { create } from 'zustand';

type Theme = 'cupcake' | 'bumblebee';

interface ThemeStore {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: 'cupcake',
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === 'cupcake' ? 'bumblebee' : 'cupcake',
    })),
  setTheme: (theme) => set({ theme }),
}));