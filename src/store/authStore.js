import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useAuthStore = create(devtools((set) => ({
  user: null,
  token: null,
  macAddress : null,
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  logout: () => set({ user: null, token: null }),
  setMacAddress : (macAddress) => set({macAddress}),
}), { name: 'AuthStore' }));

export default useAuthStore;