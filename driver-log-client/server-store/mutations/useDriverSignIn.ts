import ReactQueryKeys from '../keys';
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
  token: string;
  onTrip?: boolean;
}

const driverSignIn = async (
  data: IDriverSignInProps
): Promise<IDriverSignInResponse> => {
  const response = await api.post('/auth/signin-driver', data);

  return response.data;
};

const useDriverSignIn = () => {
  return useMutation([ReactQueryKeys.DRIVER_SIGN_IN], driverSignIn);
};

export default useDriverSignIn;
