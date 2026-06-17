export const toLatLng = (source) => {
  if (!source) return null;

  
  if ("lat" in source && "lng" in source) {
    return { lat: Number(source.lat), lng: Number(source.lng) };
  }

 
  if ("latitude" in source && "longitude" in source) {
    return { lat: Number(source.latitude), lng: Number(source.longitude) };
  }

  return null;
};