import { useState, useEffect } from 'react';
// import Image from 'next/image';

//Maps
import ReactMapGl, { Marker } from 'react-map-gl';
import Geocode from 'react-geocode';
import 'mapbox-gl/dist/mapbox-gl.css';

const EventMap = ({ evt }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewport, setViewport] = useState({
    latitude: 20.9144,
    longitude: 100.7452,
    width: '100%',
    height: '500px',
    zoom: 8,
  });

  Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);

  useEffect(() => {
    Geocode.fromAddress(evt.address).then(
      (res) => {
        const { lat, lng } = response.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
        setViewport({
          ...viewport,
          latitude: lat,
          longitude: lng,
        });
        setLoading(false);
        console.log(lat, lng);
      },
      (error) => console.log(error)
    );
  }, []);

  if (loading) return false;

  return (
    <div>
      <h1>This is a map component</h1>
    </div>
  );
};

export default EventMap;
