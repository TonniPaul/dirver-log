import { api } from '../queries/utils';
import { useMutation } from '@tanstack/react-query';

export interface ISignInProps {
  companyEmail: string;
  password: string;
}

interface ISignInResponse {
  _id: string;
  companyName: string;
  companyEmail: string;
  companyContactNo: string;
  role: string;
}

const signIn = async (data: ISignInProps): Promise<ISignInResponse> => {
  const response = await api.post('/auth/signin-admin', data);

  return response.data;
};

const useSignIn = () => {
  return useMutation(signIn, {
     onSuccess: async () => {
      alert(`sign in successfully`);
    },
  });
};

export default useSignIn;
