import { api } from '../queries/utils';
import { useMutation } from '@tanstack/react-query';

export interface ICreateDriverProps {
  firstName: string;
  lastName: string;
  licenseNumber: string;
  nationalId: string;
  contactNumber: string;
  email: string;
  homeAddress: string;
  licenseExpiryDate: string;
  password: string;
  password_confirmation: string;
}

export interface ICreateDriversResponse {}

const createDriverProfile = async (
  data: ICreateDriverProps
): Promise<ICreateDriversResponse> => {
  const response = await api.post('/drivers/signup-driver ', data);

  return response.data;
};

const useCreateDriver = () => {
  return useMutation(createDriverProfile);
};

export default useCreateDriver;
