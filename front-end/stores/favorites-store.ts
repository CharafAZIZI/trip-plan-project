import { create } from 'zustand';

type FavoritesState = {
  ids: string[];
  toggle: (id: string) => void;
};

// En mémoire pour l'instant (la persistance viendra avec le stockage local).
export const useFavoritesStore = create<FavoritesState>((set) => ({
  ids: [],
  toggle: (id) =>
    set((state) => ({
      ids: state.ids.includes(id) ? state.ids.filter((item) => item !== id) : [...state.ids, id],
    })),
}));