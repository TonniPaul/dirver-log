const mapboxAccessToken = process.env.MAPBOX_ACCESS_TOKEN as string;
const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;
const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;
const googleMapApi = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string;
const customMapId = process.env.NEXT_PUBLIC_GOOGLE_CUSTOM_MAP_ID as string;

const enVariables = {
  accessToken,
  apiUrl,
  mapboxAccessToken,
  googleMapApi,
  customMapId,
};

export default enVariables;
