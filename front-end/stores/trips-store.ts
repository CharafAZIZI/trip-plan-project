import { generateTrip, type Trip } from '@/lib/trips';
import { create } from 'zustand';

type TripsState = {
  trips: Trip[];
  add: (trip: Trip) => void;
  toggleOffline: (id: string) => void;
};

// Voyage de démonstration pour que les écrans ne soient pas vides au premier lancement.
const demoTrip: Trip = {
  ...generateTrip(
    { destination: 'Oujda', days: 3, budget: 1500, interests: ['nature', 'culture'] },
    'demo-oujda'
  ),
  title: 'Oujda et Oriental',
  offline: true,
};

// En mémoire pour l'instant : la sauvegarde réelle (hors connexion) viendra avec le stockage local.
export const useTripsStore = create<TripsState>((set) => ({
  trips: [demoTrip],
  add: (trip) => set((state) => ({ trips: [trip, ...state.trips] })),
  toggleOffline: (id) =>
    set((state) => ({
      trips: state.trips.map((trip) => (trip.id === id ? { ...trip, offline: !trip.offline } : trip)),
    })),
}));