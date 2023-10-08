import ReactQueryKeys from '../keys';
import { api } from '../queries/utils';
import { useMutation } from '@tanstack/react-query';

export interface IEndTrip {
  endLng: number;
  endLat: number;
  comments: string;
}

export interface IEndTripResponse {}

const endTrip = async (data: IEndTrip): Promise<IEndTripResponse> => {
  const response = await api.post('/triplogs ', data);

  return response.data;
};

const useEndTrip = () => {
  return useMutation([ReactQueryKeys.END_TRIP], endTrip);
};

export default useEndTrip;
