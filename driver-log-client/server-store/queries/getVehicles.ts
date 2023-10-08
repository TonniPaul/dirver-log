import { useQuery } from '@tanstack/react-query';
import ReactQueryKeys from '../keys';
import { api } from './utils';

export interface CarData {
  createdAt: string;
  licensePlate: string;
  make: string;
  model: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

const getAllVehicle = async (): Promise<CarData[]> => {
  const response = await api.get('/vehicles');
  return response.data;
};

const useGetAllVehicle = () => {
  return useQuery([ReactQueryKeys.GET_ALL_VEHIClE], getAllVehicle, {
    keepPreviousData: true,
  });
};

export default useGetAllVehicle;
