import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  // Automatically check if a token exists on initial load
  isAuthenticated: !!localStorage.getItem('access_token'),

  login: (accessToken, refreshToken, userData) => {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    set({ user: userData, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    set({ user: null, isAuthenticated: false });
  }
}));

export default useAuthStore;