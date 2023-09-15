import React, { useEffect, useState } from "react";
import axios from "axios";

const CurrentRegion = ({ Geolocation }) => {
    const [weather, setWeather] = useState({});
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const lat = Geolocation["lat"];
    const long = Geolocation["long"];

    const userTimezone = Intl.DateTimeFormat().resolvedOptions().weather?.timeZone;

    const timestamp = (weather?.dt);
    const date = new Date(timestamp * 1000);
    const options = { timeZone: userTimezone, year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

    const formattedDate = date.toLocaleString('en-US', options);

    const sunriseUTC = new Date(weather?.sys?.sunrise * 1000);
    const sunsetUTC = new Date(weather?.sys?.sunset * 1000);
    const sunriseLocal = (sunriseUTC.toLocaleTimeString('en-US', { timeZone: userTimezone })).slice(0, 4);
    const sunsetLocal = (sunsetUTC.toLocaleTimeString('en-US', { timeZone: userTimezone })).slice(0, 4);

    useEffect(() => {
        const getWeather = async () => {
            try {
                const response1 = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&APPID=bf5b80f1009529ea224da9d77c253c3f`);
                const response2 = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&APPID=bf5b80f1009529ea224da9d77c253c3f`);
                setWeather(response1.data);
                setForecast(response2.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        }

        getWeather();
    }, [lat, long]);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {weather.main && (
                        <div className="all-components">
                            <div className="area-section1">
                                <div>
                                    <p>{formattedDate}</p>
                                </div>
                                <div className="main-temperature">{Math.round(weather.main.temp)}&deg;C</div>
                                <div className="current-region">{weather.name}, {weather.sys.country}</div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default CurrentRegion;