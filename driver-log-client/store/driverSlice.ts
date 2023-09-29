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
    set({ driver: null });
  },
});
