import { useState } from "react";

function CurrentDetail({ hourly, weather }) {
    const detailRise = new Date(weather?.sys.sunrise * 1000);
    const detailSet = new Date(weather?.sys?.sunset * 1000);

    const unixTimeToDate = (unixTime) => {
        const date = new Date(unixTime * 1000)
        return date
    }

    const [hourlyForecast, setHourlyForecast] = useState(hourly.list.slice(0, 4))
    const userDetailTimezone = Intl.DateTimeFormat().resolvedOptions().hourly?.timeZone;
    const optionsDetail = { timeZone: userDetailTimezone, hour: 'numeric', minute: 'numeric' }

    return (
        <div className="area-section2">
            <div className="current-temperature">
                <img className="main-image" src={`./weather-icons/${weather.weather[0].icon}.svg`} alt="" />
                <p className="sub-text1">{weather.weather[0].description}</p>
                <p className="sub-text1">Feels Like: {Math.round(weather.main.feels_like)}&deg;C</p>
            </div>

            <div className="current-temperature">
                <div className="detail-info">
                    <p className="sub-text2">High: {Math.round(weather.main.temp_max)}&deg;C</p>
                    <p className="sub-text2">Low: {Math.round(weather.main.temp_min)}&deg;C</p>
                </div>
                <div>
                    <p className="sub-text2">Humidity: {weather.main.humidity}%</p>
                    <p className="sub-text2">Wind: {weather.wind.speed}m/s</p>
                </div>
            </div>
            <div className="current-temperature">
                <p className="sub-text2 sunrise">sunrise: {detailRise.toLocaleString('en-US', optionsDetail)}</p>
                <img className="sub-image2" src="/weather-icons/sunrise.svg"  />
                <p className="sub-text2">sunset: {detailSet.toLocaleString('en-US', optionsDetail)}</p>
                <img className="sub-image2" src="/weather-icons/sunset.svg" alt="" />
            </div>

            <div className="current-detail">
                {hourlyForecast.map((item) => (
                    <div className="current-timeperiod">
                        <p className="sub-text2">{unixTimeToDate(item.dt).toLocaleString('en-US', optionsDetail)}</p>
                        <img className="sub-image1" src={`./weather-icons/${item.weather[0].icon}.svg`} alt="" />
                        <p className="sub-text2">{item.weather[0].description}</p>
                        <p className="sub-text2">{Math.round(item.main.temp)}&deg;C</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CurrentDetail; 
