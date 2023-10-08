import { useQuery } from '@tanstack/react-query';
import ReactQueryKeys from '../keys';
import { api } from './utils';

export interface ITripLogs {
  createdAt: string;
  driver: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  purpose: string;
  startLat: number;
  originAddress: string;
  status: string;
  destinationAddress: string;
  distance: number;
  startLng: number;
  updatedAt: string;
  vehicle: string;
  __v: number;
  _id: string;
}

export interface ITripLogSchema {
  triplogs: ITripLogs[];
  count: number;
}

const getTripLog = async (): Promise<ITripLogSchema> => {
  const response = await api.get('/triplogs');

  return response.data;
};

const useGetTripLogs = () => {
  return useQuery([ReactQueryKeys.GET_TRIP_LOGS], getTripLog, {
    keepPreviousData: true,
  });
};

export default useGetTripLogs;
