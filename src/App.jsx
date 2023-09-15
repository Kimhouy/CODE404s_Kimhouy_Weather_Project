import { useState, useEffect } from 'react';
import './App.css';
import { useGeolocated } from "react-geolocated";
import CurrentRegion from './components/CurrentRegion';

function App() {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,

      },
      userDecisionTimeout: 5000,
    },

    );

  useEffect(() => {
    if (isGeolocationAvailable && isGeolocationEnabled && coords) {
    }
  }, [isGeolocationAvailable, isGeolocationEnabled, coords]);

  const latitude = coords?.latitude;
  const longitude = coords?.longitude;

  const location = {
    "lat": latitude,
    "long": longitude
  }

  return (
    <>
      {console.log(location["lat"], location["long"])}
      <CurrentRegion Geolocation={location} />
    </>
  )
}

export default App
