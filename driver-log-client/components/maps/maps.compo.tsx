import { useStore } from '@/client-store';
import { LatLngLiteral, MapOptions } from '@/types/map.types';
import enVariables from '@/utils/env';
import getRemValue from '@/utils/getRemValue';
import { Circle, GoogleMap, Marker } from '@react-google-maps/api';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import EndTrip from './end-trip';
import StartTrip from './start-trip';

const MapContainer = styled.div`
  width: 100%;
  height: 500px;
  border-radius: 10px;
  overflow: hidden;

  .maps {
    width: 100%;
    height: 100%;
  }
`;

const TripsContainer = styled.div`
  @media screen and (min-width: 62.5em) {
    display: flex;
    flex-direction: row-reverse;
    gap: 1rem;
  }
`;

export const FormContainer = styled.form`
  flex-basis: 35%;
  background-color: rgb(var(--color-white));
  height: max-content;
  padding: 1rem;
  position: relative;

  & > div {
    margin-bottom: ${getRemValue(10)};

    & > label {
      margin-bottom: 5px;
      display: block;
      color: rgb(var(--color-primary));
      font-weight: 600;
    }
  }

  & > button {
    padding: 1rem;
    width: 100%;
    background-color: rgb(var(--color-primary));
    color: rgb(var(--color-white));
  }
`;

const MapComponent = () => {
  const [userLocation, setUserLocation] = useState<LatLngLiteral>({
    lat: 6.5244,
    lng: 3.3792,
  });
  const [location, setLocation] = useState<LatLngLiteral>(userLocation);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  };

  const { driver } = useStore();

  useEffect(() => {
    getUserLocation();
  }, []);

  const mapRef = useRef<GoogleMap>();
  const center = useMemo<LatLngLiteral>(() => location, []);
  const options = useMemo<MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      mapId: enVariables.customMapId,
      mapTypeControl: false,
      maxZoom: 22,
      minZoom: 14,
      rotateControl: true,
      scaleControl: true,
      zoom: 14,
    }),
    []
  );
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const onLoad = useCallback((map: any) => (mapRef.current = map), []);
  return (
    <TripsContainer>
      <MapContainer>
        <GoogleMap
          zoom={18}
          center={userLocation}
          mapContainerClassName="maps"
          options={options}
          onLoad={onLoad}
        >
          <Marker position={center} clickable icon="assets/hello.png" />
          <Circle center={center} radius={15000} />
        </GoogleMap>
      </MapContainer>

      <>
        {driver?.onTrip === false ? (
          <StartTrip
            setLocation={(position) => {
              setLocation(position);
              mapRef.current?.panTo(position);
            }}
          />
        ) : (
          <EndTrip />
        )}
      </>
    </TripsContainer>
  );
};

export default MapComponent;
