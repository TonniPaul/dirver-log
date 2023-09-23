import { api } from '../queries/utils';
import { useMutation } from '@tanstack/react-query';

export interface ICreateProfileProps {
  name: string;
  email: string;
  contactNo: string;
  password: string;
}

interface ICreateProfileResponse {
  companyContactNo: string;
  email: string;
  companyName: string;
  createdAt: Date;
  password: string;
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
  return useMutation(createCompanyProfile);
};

export default useCreateProfile;
