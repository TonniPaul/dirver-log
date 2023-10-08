import { IPlacesProp, LatLngLiteral } from '../../types/map.types';
import React, { useState } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import { PlaceInput, SelectInput, SuggestionBox } from './places.styles';
import { FormContainer } from './maps.compo';
import useStartTrip, {
  IStartTrip,
} from '@/server-store/mutations/useStartTrip';
import { SubmitHandler, useForm } from 'react-hook-form';
import BtnLoader from '../btn-loaders/loader';
import { toast } from 'react-toastify';
import useGetAllVehicle, { CarData } from '@/server-store/queries/getVehicles';
import { useStore } from '@/client-store';
import { IDriverSignInResponse } from '@/server-store/mutations/useDriverSignIn';

interface IStartTripProp extends IPlacesProp {}

const StartTrip = ({ setLocation }: IStartTripProp) => {
  const [startLocation, setStartLocation] = useState<LatLngLiteral>({
    lat: 6.5344,
    lng: 3.3692,
  });
  const [startAddress, setStartAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const { data: vehicles } = useGetAllVehicle();
  const allVehicle: CarData[] | undefined = vehicles;
  const { setDriver, driver } = useStore();

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      const { latitude, longitude } = pos.coords;
      setStartLocation({
        lat: latitude,
        lng: longitude,
      });
    });
  };

  const {
    ready: startReady,
    value: startValue,
    setValue: setStartValue,
    suggestions: { status: startStatus, data: startData },
    clearSuggestions: clearStartSuggestions,
  } = usePlacesAutocomplete();

  const {
    ready: destinationReady,
    value: destinationValue,
    setValue: setDestinationValue,
    suggestions: { status: destinationStatus, data: destinationData },
    clearSuggestions: clearDestinationSuggestions,
  } = usePlacesAutocomplete();

  const handleStartSelect = async (val: string) => {
    setStartValue(val, false);
    clearStartSuggestions();

    const results = await getGeocode({ address: val });
    const { lat, lng } = await getLatLng(results[0]);
    setLocation({ lat, lng });
    setStartLocation({ lat, lng });
  };

  const handleDestinationSelect = async (val: string) => {
    setDestinationValue(val, false);
    clearDestinationSuggestions();

    const results = await getGeocode({ address: val });
    const { lat, lng } = await getLatLng(results[0]);
    setLocation({ lat, lng });
  };

  const defaultValues: IStartTrip = {
    startLat: startLocation.lat,
    startLng: startLocation.lng,
    destinationAddress: '',
    originAddress: startAddress,
    purpose: '',
    vehicle: '',
  };

  const { mutate: startTrip, isLoading: loading } = useStartTrip();

  const { handleSubmit, register, reset } = useForm<IStartTrip>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<IStartTrip> = (data) => {
    getUserLocation();

    const currentDriver: IDriverSignInResponse = driver!;

    setDriver({
      ...currentDriver,
      onTrip: true,
    });

    const payload: IStartTrip = {
      originAddress: startAddress,
      destinationAddress: destinationAddress,
      purpose: data.purpose,
      startLat: startLocation.lat,
      startLng: startLocation.lng,
      vehicle: data.vehicle,
    };
    startTrip(payload, {
      onSuccess: () => {
        toast.success('Trip Started');
        reset();
      },
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      onError: (err: any) => {
        toast.error(err.response.data.error);
      },
    });
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="start-address">Where from?</label>
        <PlaceInput
          type="text"
          {...register('originAddress', { required: true })}
          id="start-address"
          value={startValue}
          onChange={(e) => {
            setStartValue(e.target.value);
            setStartAddress(e.target.value);
          }}
          disabled={!startReady}
          placeholder="Search start address"
        />
        <div>
          {startStatus === 'OK' && (
            <SuggestionBox>
              {startData.map(({ place_id, description }) => {
                return (
                  <li
                    key={place_id}
                    onClick={() => {
                      handleStartSelect(description);
                      setStartAddress(description);
                    }}
                  >
                    {description}
                  </li>
                );
              })}
            </SuggestionBox>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="destination-address">Where to?</label>
        <PlaceInput
          type="text"
          {...register('destinationAddress', { required: true })}
          id="destination-address"
          value={destinationValue}
          onChange={(e) => {
            setDestinationValue(e.target.value);
            setDestinationAddress(e.target.value);
          }}
          disabled={!destinationReady}
          placeholder="Search destination address"
        />
        <div>
          {destinationStatus === 'OK' && (
            <SuggestionBox>
              {destinationData.map(({ place_id, description }) => {
                return (
                  <li
                    key={place_id}
                    onClick={() => {
                      handleDestinationSelect(description);
                      setDestinationAddress(description);
                    }}
                  >
                    {description}
                  </li>
                );
              })}
            </SuggestionBox>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="purpose">Purpose Of Trip</label>
        <PlaceInput
          type="text"
          {...register('purpose', { required: true })}
          id="purpose"
        />
      </div>

      <div>
        <label htmlFor="vehicle">Select Vehicle</label>
        <SelectInput id="vehicle" {...register('vehicle')}>
          <option disabled selected>
            {' '}
            Select vehicle
          </option>
          {allVehicle?.map(({ licensePlate, make, model }) => (
            <option value={licensePlate} key={licensePlate}>
              {`${make} ${model}`} ({licensePlate})
            </option>
          ))}
        </SelectInput>
      </div>

      <button disabled={loading} onClick={getUserLocation}>
        {loading ? <BtnLoader /> : 'Start Trip'}
      </button>
    </FormContainer>
  );
};

export default StartTrip;
