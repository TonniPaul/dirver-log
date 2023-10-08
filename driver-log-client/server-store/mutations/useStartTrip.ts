import ReactQueryKeys from '../keys';
import { api } from '../queries/utils';
import { useMutation } from '@tanstack/react-query';

export interface IStartTrip {
  originAddress: string;
  destinationAddress: string;
  purpose: string;
  startLng: number;
  startLat: number;
  vehicle: string;
}

export interface IStartTripResponse {}

const startTrip = async (data: IStartTrip): Promise<IStartTripResponse> => {
  const response = await api.post('/triplogs ', data);

  return response.data;
};

const useStartTrip = () => {
  return useMutation([ReactQueryKeys.START_TRIP], startTrip);
};

export default useStartTrip;
