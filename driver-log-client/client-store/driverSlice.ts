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
    set({ driver: data });
  },
  clearDriver: () => {
    const tokenCookie = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );

    // Log the current value of the 'token' cookie
    console.log('Current token cookie value:', tokenCookie);

    // Clear the 'token' cookie by setting it to an empty string and an expired date
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    set({ driver: null });
  },
});
