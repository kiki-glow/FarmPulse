import { getWeatherIcon } from "../utils/weatherIcon";

const ForecastStrip = ({ daily }) => {
    if (!daily.length) return null;

    const fmt = (dateStr) => 
        new Date(dateStr).toLocaleDateString('en-KE', { weekday: 'short', day: 'numeric' });

  return (
    <div className="card forecast-strip">
        <h3>7-Day Forecast</h3>
        <div className="forecast-days">
            {daily.map((day) => (
                <div key={day.date} className="forecast-day">
                    <span className="day-label">{fmt(day.date)}</span>
                    <span className="weather-icon-md">{getWeatherIcon(day.condition_code)}</span>
                    <span className="day-precip">{day.precipitation_probability}%</span>
                    <span className="day-range">
                        {Math.round(day.temp_min)}° / {Math.round(day.temp_max)}°
                    </span>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ForecastStrip