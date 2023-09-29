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
    set({ admin: data });
  },
  clearAdmin: () => {
    set({ admin: null });
  },
});
