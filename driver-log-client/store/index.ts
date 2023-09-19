import { create } from 'zustand';
import { ISessionSliceType, adminSlice } from './adminSlice';
import { persist } from 'zustand/middleware';
import { driverSlice, IDriverSliceType } from './driverSlice';

interface StoreTypes extends ISessionSliceType, IDriverSliceType {}

export const useStore = create<StoreTypes>()(
  persist(
    (...a) => ({
      ...adminSlice(...a),
      ...driverSlice(...a),
    }),
    { name: 'driver-log' }
  )
);
