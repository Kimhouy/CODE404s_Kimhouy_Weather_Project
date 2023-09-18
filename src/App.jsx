import { useState, useEffect } from 'react';
import './App.css';
import { useGeolocated } from "react-geolocated";
import axios from "axios";
import FutureWeather from './components/FutureWeather';
import CurrentWeather from './components/CurrentWeather';
import CurrentDetail from './components/CurrentDetail';

function App() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [latitude, setLatitude] = useState('11.5564') // default to Phnom Penh
  const [longitude, setLongitude] = useState('104.9282')
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const [forecastDaily, setForecastDaily] = useState([]);
  const [forecastHourly, setForecastHourly] = useState([]);

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
      setLatitude(coords.latitude)
      setLongitude(coords.longitude)
    }
  }, [isGeolocationAvailable, isGeolocationEnabled, coords]);

  useEffect(() => {
    if (latitude && longitude) {
      getWeather(latitude, longitude)
    }
   }, [latitude, longitude]);

  const getWeather = async (lat, long) => {
    try {
      const response1 = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&APPID=bf5b80f1009529ea224da9d77c253c3f`);
      const response2 = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&APPID=bf5b80f1009529ea224da9d77c253c3f`);
      const response3 = await axios.get(`http://pro.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${long}&units=metric&APPID=be4a998ea9f7012606ebf5bb21a41873`);
      const response4 = await axios.get(`http://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${long}&units=metric&APPID=be4a998ea9f7012606ebf5bb21a41873`);

      setWeather(response1.data);
      setForecast(response2.data);
      setForecastDaily(response3.data);
      setForecastHourly(response4.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  return (
    <>
     <div  className="all-components"> 
       
       {weather?.main && (
        <CurrentWeather weather={weather} />
      )
      }

      {forecastHourly?.list && weather?.main && (
        <CurrentDetail 
        hourly={forecastHourly}
        weather={weather}
        />
      )
      }

      {forecastDaily?.list && (
        <div className="area-section3">
          {forecastDaily.list.slice(1, 5).map((item, index) => (
            <FutureWeather key={index} forecastDaily={item} />
          ))}
        </div>
      )}
     </div>
    </>
  )
}

export default App;
