import enVariables from '@/utils/env';
import { useLoadScript } from '@react-google-maps/api';
import MapComponent from './maps.compo';

const GoogleMap = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: enVariables.googleMapApi,
    libraries: ['places'],
  });

  if (!isLoaded) {
    return <div> Loading...</div>;
  }
  return (
    <div>
      <MapComponent />
    </div>
  );
};

export default GoogleMap;
