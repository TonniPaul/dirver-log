import ReactQueryKeys from '../keys';
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
  contactNo: string;
  role: string;
  token: string;
}

const signIn = async (data: ISignInProps): Promise<ISignInResponse> => {
  const response = await api.post('/auth/signin-admin', data);

  return response.data;
};

const useSignIn = () => {
  return useMutation([ReactQueryKeys.ADMIN_SIGN_IN], signIn);
};

export default useSignIn;
