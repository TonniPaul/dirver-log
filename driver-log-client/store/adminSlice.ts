// sessionSlice.ts
import { ISignInResponse } from '@/server-store/mutations/useSignIn';
import { StateCreator } from 'zustand';

export interface ISessionSliceType {
  admin: ISignInResponse | null;
  setAdmin: (data: ISignInResponse) => void;
  clearAdmin: () => void;
}
export const adminSlice: StateCreator<ISessionSliceType> = (set) => ({
  admin: null,
  setAdmin: (data) => {
    // Set the admin data in state
    set({ admin: data });
    // Assuming 'data.token' is the token received from the backend
    const token = data.token;
    // Set the token as a cookie
    document.cookie = `adminToken=${token}; expires=${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;
  },
  clearAdmin: () => {
    set({ admin: null });
    // Clear the token cookie
    document.cookie = 'adminToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  },
});
