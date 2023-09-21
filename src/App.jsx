import { useState, useEffect } from "react";
import "./App.css";
import { useGeolocated } from "react-geolocated";
import axios from "axios";
import FutureWeather from "./components/FutureWeather";
import CurrentWeather from "./components/CurrentWeather";
import CurrentDetail from "./components/CurrentDetail";

function App() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [latitude, setLatitude] = useState("11.5564") // default in Phnom Penh
  const [longitude, setLongitude] = useState("104.9282")
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
      const response1 = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&APPID=bf5b80f1009529ea224da9d77c253c3f`);
      const response2 = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&APPID=bf5b80f1009529ea224da9d77c253c3f`);
      const response3 = await axios.get(`https://pro.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${long}&units=metric&APPID=be4a998ea9f7012606ebf5bb21a41873`);
      const response4 = await axios.get(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${long}&units=metric&APPID=be4a998ea9f7012606ebf5bb21a41873`);

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
      {loading && (
        <div className="gif-container">
          <div><img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXg5czZoZW9vOTVvYzI0a3VweXl0MmN4azg5OHN2MjBvazdyaTBzYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/SXiZmLGY9AwCbgtx6j/giphy.gif" className="gif-displaying" alt="GIF" /></div>
          <div>Loading data ...</div>
        </div>
      )}

      {error && (
        <div className="gif-container">
          <img src="https://media2.giphy.com/media/FYUnDtud95kMKCovAY/giphy.gif?cid=ecf05e47rk8f7eeiveakfknhqud35fplgjk6p1ugigbn4zeb&ep=v1_gifs_search&rid=giphy.gif&ct=g" className="gif-displaying" alt="GIF" />
          <p>Error fetching data...</p>
        </div>
      )}


      <div className="all-components">

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
