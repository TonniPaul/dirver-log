// sessionSlice.ts
import { IDriverSignInResponse } from '@/server-store/mutations/useDriverSignIn';
import { StateCreator } from 'zustand';

export interface IDriverSliceType {
  driver: IDriverSignInResponse | null;
  setDriver: (data: IDriverSignInResponse) => void;
  clearDriver: () => void;
}
export const driverSlice: StateCreator<IDriverSliceType> = (set) => ({
  driver: null,
  setDriver: (data) => {
    // Set the driver data in state
    set({ driver: data });
    // Assuming 'data.token' is the token received from the backend
    const token = data.token;
    // Set the token as a cookie
    document.cookie = document.cookie = `driverToken=${token}; expires=${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;
  },
  clearDriver: () => {
    set({ driver: null });
    // Clear the token cookie
    document.cookie = document.cookie = 'deiverToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  },
});
