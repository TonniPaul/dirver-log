import { toast } from 'react-toastify';
import { api } from '../queries/utils';
import { useMutation } from '@tanstack/react-query';
import { Hash } from 'crypto';
import ReactQueryKeys from '../keys';

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

const signIn = async (
   data: ISignInProps
): Promise<ISignInResponse> => {
   const response = await api.post('/auth/signin-admin', data);

   return response.data;
};

const useSignIn = () => {
   return useMutation(signIn, {
      
      onSuccess: async (data) => {

         alert(`sign in successfully`)

      },
   });
};

export default useSignIn;
