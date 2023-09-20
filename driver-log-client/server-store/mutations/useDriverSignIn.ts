import { api } from '../queries/utils';
import { useMutation } from '@tanstack/react-query';

export interface IDriverSignInProps {
  email: string;
  password: string;
}

export interface IDriverSignInResponse {
  _id: string;
  firstName: string;
  lastName: string;
  licenseNumber: string;
  nationalId: string;
  contactNumber: string;
  email: string;
  homeAddress: string;
  licenseExpiryDate: string;
  role: string;
}

const driverSignIn = async (
  data: IDriverSignInProps
): Promise<IDriverSignInResponse> => {
  const response = await api.post('/auth/signin-driver', data);

  return response.data;
};

const useDriverSignIn = () => {
  return useMutation(driverSignIn);
};

export default useDriverSignIn;
