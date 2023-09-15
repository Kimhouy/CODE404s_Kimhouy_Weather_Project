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

    const userTimezonenext = Intl.DateTimeFormat().resolvedOptions().forecast?.city?.timeZone;
    const optionsnext = { timeZone: userTimezonenext, year: 'numeric', month: 'long', day: 'numeric' };

    const timestampnext1 = forecast && forecast?.list && forecast.list[10].dt;
    console.log(timestampnext1)
    const datenext1 = new Date(timestampnext1 * 1000);
    const formattedDate1 = datenext1.toLocaleString('en-US', optionsnext)

    const timestampnext2 = forecast && forecast?.list && forecast.list[18].dt;
    const datenext2 = new Date(timestampnext2 * 1000);
    const formattedDate2 = datenext2.toLocaleString('en-US', optionsnext)

    const timestampnext3 = forecast && forecast?.list && forecast.list[26].dt;
    const datenext3 = new Date(timestampnext3 * 1000);
    const formattedDate3 = datenext3.toLocaleString('en-US', optionsnext)

    const timestampnext4 = forecast && forecast?.list && forecast.list[34].dt;
    const datenext4 = new Date(timestampnext4 * 1000);
    const formattedDate4 = datenext4.toLocaleString('en-US', optionsnext)


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
                            <div className="area-section2">
                                <div className="current-timeperiod">
                                    <p>{weather.weather[0].description}</p>
                                    <p>Feels like: {Math.round(weather.main.feels_like)}&deg;C</p>
                                </div>
                                <div className="current-temperature">
                                    <div className="technical-info1">
                                        <p>High: {Math.round(weather.main.temp_max)}&deg;C</p>
                                        <p>Low: {Math.round(weather.main.temp_min)}&deg;C</p>
                                    </div>
                                    <div className="technical-info2">
                                        <p>Humidity: {weather.main.humidity}%</p>
                                        <p>Wind: {weather.wind.speed}m/s</p>
                                    </div>
                                </div>
                                <div className="current-timeperiod">
                                    <p>Sunrise: {sunriseLocal} am</p>
                                    <p>Sunset: {sunsetLocal} pm</p>
                                </div>
                                <div className="current-detail">
                                    <div className="current-timeperiod">
                                        <p>Morning</p>
                                        <p>{forecast.list[0].weather[0].description}</p>
                                        <p>{Math.round(forecast.list[0].main.temp)}&deg;C</p>
                                    </div>
                                    <div className="current-timeperiod">
                                        <p>Afternoon</p>
                                        <p>{forecast.list[2].weather[0].description}</p>
                                        <p>{Math.round(forecast.list[2].main.temp)}&deg;C</p>
                                    </div>
                                    <div className="current-timeperiod">
                                        <p>Evening</p>
                                        <p>{forecast.list[4].weather[0].description}</p>
                                        <p>{Math.round(forecast.list[4].main.temp)}&deg;C</p>
                                    </div>
                                    <div className="current-timeperiod">
                                        <p>Night</p>
                                        <p>{forecast.list[6].weather[0].main}</p>
                                        <p>{Math.round(forecast.list[6].main.temp)}&deg;C</p>
                                    </div>
                                </div>
                            </div>
                            <div className="area-section3">
                                <div className="next-day">
                                    <p>{formattedDate1}</p>
                                    <p>{forecast.list[10].weather[0].main}</p>
                                    <p>{Math.round(forecast.list[10].main.temp)}&deg;C</p>
                                </div>
                                <div className="next-day">
                                    <p>{formattedDate2}</p>
                                    <p>{forecast.list[18].weather[0].main}</p>
                                    <p>{Math.round(forecast.list[18].main.temp)}&deg;C</p>
                                </div>
                                <div className="next-day">
                                    <p>{formattedDate3}</p>
                                    <p>{forecast.list[26].weather[0].main}</p>
                                    <p>{Math.round(forecast.list[26].main.temp)}&deg;C</p>
                                </div>
                                <div className="next-day">
                                    <p>{formattedDate4}</p>
                                    <p>{forecast.list[34].weather[0].main}</p>
                                    <p>{Math.round(forecast.list[34].main.temp)}&deg;C</p>

                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default CurrentRegion;