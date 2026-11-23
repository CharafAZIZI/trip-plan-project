import { create } from 'zustand';

type SettingsState = {
  notifications: boolean;
  autoOffline: boolean;
  setNotifications: (value: boolean) => void;
  setAutoOffline: (value: boolean) => void;
};

export const useSettingsStore = create<SettingsState>((set) => ({
  notifications: true,
  autoOffline: false,
  setNotifications: (notifications) => set({ notifications }),
  setAutoOffline: (autoOffline) => set({ autoOffline }),
}));