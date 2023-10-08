import { useQuery } from '@tanstack/react-query';
import ReactQueryKeys from '../keys';
import { api } from './utils';

interface Admin {
  _id: string;
  name: string;
  email: string;
  password: string;
  contactNo: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IDriverData {
  _id: string;
  firstName: string;
  lastName: string;
  licenseNumber: number;
  nationalId: string;
  contactNumber: string;
  email: string;
  homeAddress: string;
  licenseExpiryDate: string;
  role: string;
  admin: Admin;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IDriversDataSchema {
  drivers: IDriverData[];
  count: number;
}

const getAllDrivers = async (): Promise<IDriversDataSchema> => {
  const response = await api.get('/drivers');
  return response.data;
};

const useGetAllDrivers = () => {
  return useQuery([ReactQueryKeys.GET_ALL_DRIVERS], getAllDrivers, {
    keepPreviousData: true,
  });
};

export default useGetAllDrivers;
