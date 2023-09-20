import { api } from '../queries/utils';
import { useMutation } from '@tanstack/react-query';

export interface ISignInProps {
  email: string;
  password: string;
}

export interface ISignInResponse {
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

const signIn = async (data: ISignInProps): Promise<ISignInResponse> => {
  const response = await api.post('/auth/signin-admin', data);

  return response.data;
};

const useSignIn = () => {
  return useMutation(signIn);
};

export default useSignIn;
