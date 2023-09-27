import { api } from '../queries/utils';
import { useMutation } from '@tanstack/react-query';

export interface ICreateProfileProps {
  name: string;
  email: string;
  contactNo: string;
  password: string;
}

interface ICreateProfileResponse {
  contactNo: string;
  email: string;
  name: string;
  role: string;
  token: string;
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
