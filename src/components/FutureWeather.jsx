

function FutureWeather({ forecastDaily }) {
    const futureDate = new Date(forecastDaily.dt * 1000);
    const userFutureTimezone = Intl.DateTimeFormat().resolvedOptions().forecastDaily?.timeZone;
    const optionsFuture = { timeZone: userFutureTimezone, year: 'numeric', month: 'long', day: 'numeric' }
    
    return (
        <div className='next-day1'>
            <div className='next-day2'>
                <p className="sub-text1">{futureDate.toLocaleString('en-US', optionsFuture)}</p>
                <img className="main-image"src={`./weather-icons/${forecastDaily.weather[0].icon}.svg`} alt="" />
                <p className="sub-text1">{forecastDaily.weather[0].description}</p>
                <p className="sub-text1">High: {Math.round(forecastDaily.temp.max)}&deg;C</p>
                <p className="sub-text1">Low: {Math.round(forecastDaily.temp.min)}&deg;C</p>
               
            </div>
        </div>
    )
}

export default FutureWeather;