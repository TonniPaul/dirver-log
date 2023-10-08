import { LatLngLiteral } from '@/types/map.types';
import enVariables from '@/utils/env';
import { useEffect, useState } from 'react';
import Map, { Marker, NavigationControl, ScaleControl } from 'react-map-gl';
import styled from 'styled-components';
import SvgIcon from '../svg-icon/svg-icon';

const MapContainerStyles = styled(Map)`
  background-color: red;
  height: 500px;
  width: 100%;
  display: block;
  position: relative;
`;

export interface IMapsProp extends LatLngLiteral {}
const Maps = ({ lat, lng }: IMapsProp) => {
  const [screenWidth, setScreenWidth] = useState(0);
  // const geoControlRef = useRef<GeolocateControlProps>();

  const isDesktop = screenWidth >= 1000;

  // useEffect(() => {
  //    geoControlRef.current?.trigger();
  // }, [geoControlRef.current]);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, [screenWidth]);

  const mapStyles = {
    aspectRatio: isDesktop ? 1 / 0.9 : 'auto',
    height: isDesktop ? 'auto' : 500,
    borderRadius: 10,
  };

  return (
    <MapContainerStyles>
      <Map
        mapboxAccessToken={enVariables.accessToken}
        initialViewState={{
          latitude: lat,
          longitude: lng,
          zoom: 15,
        }}
        style={mapStyles}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker longitude={lng} latitude={lat} anchor="bottom">
          <SvgIcon
            name="map-pin"
            width={30}
            height={30}
            fill="rgb(var(--color-secondary-b))"
          />
        </Marker>
        <ScaleControl />
        {/* <GeolocateControl ref={geoControlRef} position='bottom-right' /> */}
        <NavigationControl position="bottom-right" />
      </Map>
    </MapContainerStyles>
  );
};

export default Maps;
