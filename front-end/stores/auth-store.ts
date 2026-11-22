import { create } from 'zustand';

export type User = {
  id: string;
  name: string;
  email: string;
};

type AuthState = {
  user: User | null;
  hasSeenOnboarding: boolean;
  completeOnboarding: () => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
};

const FAKE_LATENCY_MS = 600;

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

function nameFromEmail(email: string) {
  const local = email.split('@')[0] ?? '';
  return local ? local.charAt(0).toUpperCase() + local.slice(1) : 'Voyageur';
}

/**
 * AUTHENTIFICATION SIMULÉE : aucune vérification serveur, session en mémoire.
 * À remplacer par le vrai backend.
 */
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  hasSeenOnboarding: false,

  completeOnboarding: () => set({ hasSeenOnboarding: true }),

  signIn: async (email, _password) => {
    await wait(FAKE_LATENCY_MS);
    set({ user: { id: email.toLowerCase(), name: nameFromEmail(email), email } });
  },

  signUp: async (name, email, _password) => {
    await wait(FAKE_LATENCY_MS);
    set({ user: { id: email.toLowerCase(), name: name.trim(), email } });
  },

  signOut: () => set({ user: null }),
}));