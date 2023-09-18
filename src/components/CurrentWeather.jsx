

function CurrentWeather({ weather }) {
    const currentDate = new Date(weather.dt * 1000);
    const userCurrentTimezone = Intl.DateTimeFormat().resolvedOptions().weather?.timeZone;
    const optionsCurrent = { timeZone: userCurrentTimezone, year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }

    return (
        <div className="area-section1">
            <p className="current-region">{currentDate.toLocaleString('en-US', optionsCurrent)}</p>
            <p className="main-temperature">{Math.round(weather.main.temp)}&deg;C</p>
            <span className="current-region">{weather.name}, </span>
            <span className="current-region">{weather.sys.country}</span>
        </div>
    )
}


export default CurrentWeather;