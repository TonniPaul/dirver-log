import { api } from '../queries/utils';
import { useMutation } from '@tanstack/react-query';
import { Hash } from 'crypto';

export interface ICreateProfileProps {
  companyName: string;
  companyEmail: string;
  companyContactNo: string;
  password: string;
}

interface ICreateProfileResponse {
  companyContactNo: string;
  companyEmail: string;
  companyName: string;
  createdAt: Date;
  password: Hash;
  role: string;
  updatedAt: Date;
}

const createCompanyProfile = async (
  data: ICreateProfileProps
): Promise<ICreateProfileResponse> => {
  const response = await api.post('/admin/create-admin', data);

  return response.data;
};

const useCreateProfile = () => {
  return useMutation(createCompanyProfile, {
    onSuccess: async (data) => {
      alert(
        `An account has been created, login with your email ${data.companyEmail}`
      );
    },
  });
};

export default useCreateProfile;
