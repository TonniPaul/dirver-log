import ReactQueryKeys from '../keys';
import { api } from '../queries/utils';
import { useMutation } from '@tanstack/react-query';

export interface IUpdateVehicleProps {
  make: string;
  model: string;
  licensePlate: string;
}

export interface IUpdateVehicleResponse {}

const updateDriverProfile = async (
  data: IUpdateVehicleProps
): Promise<IUpdateVehicleResponse> => {
  const response = await api.post('/vehicles/:id ', data);

  return response.data;
};

const useUpdateVehicle = () => {
  return useMutation([ReactQueryKeys.UPDATE_VEHICLE_DATA], updateDriverProfile);
};

export default useUpdateVehicle;
