import { useStore } from '@/client-store';
import { IDriverSignInResponse } from '@/server-store/mutations/useDriverSignIn';
import useEndTrip, { IEndTrip } from '@/server-store/mutations/useEndTrip';
import { LatLngLiteral } from '@/types/map.types';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import BtnLoader from '../btn-loaders/loader';
import { FormContainer } from './maps.compo';
import { TextArea } from './places.styles';

const EndTrip = () => {
  const [endLocation, setEndLocation] = useState<LatLngLiteral>({
    lat: 6.5344,
    lng: 3.3692,
  });
  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      const { latitude, longitude } = pos.coords;
      setEndLocation({
        lat: latitude,
        lng: longitude,
      });
    });
  };
  const defaultValues: IEndTrip = {
    endLat: endLocation.lat,
    endLng: endLocation.lng,
    comments: '',
  };
  const { setDriver, driver } = useStore();

  const { mutate: startTrip, isLoading: loading } = useEndTrip();

  const { handleSubmit, register, reset } = useForm<IEndTrip>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<IEndTrip> = (data) => {
    getUserLocation();

    document.cookie = '';

    const currentDriver: IDriverSignInResponse = driver!;

    setDriver({
      ...currentDriver,
      onTrip: false,
    });

    const payload: IEndTrip = {
      endLat: endLocation.lat,
      endLng: endLocation.lng,
      comments: data.comments,
    };
    startTrip(payload, {
      onSuccess: () => {
        toast.success('Trip Ended');
        reset();
      },
    });
  };
  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="remark">Remark</label>
        <TextArea {...register('comments')} id="remark" />
      </div>
      <button disabled={loading}>{loading ? <BtnLoader /> : 'End Trip'}</button>
    </FormContainer>
  );
};

export default EndTrip;
