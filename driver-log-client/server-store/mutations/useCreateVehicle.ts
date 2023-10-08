import ReactQueryKeys from '../keys';
import { api } from '../queries/utils';
import { useMutation } from '@tanstack/react-query';

export interface ICreateVehicleProps {
  make: string;
  model: string;
  licensePlate: string;
}

export interface ICreateDriversResponse {}

const createDriverProfile = async (
  data: ICreateVehicleProps
): Promise<ICreateDriversResponse> => {
  const response = await api.post('/vehicles ', data);

  return response.data;
};

const useCreateVehicle = () => {
  return useMutation([ReactQueryKeys.CREATE_VEHICLE_DATA], createDriverProfile);
};

export default useCreateVehicle;
