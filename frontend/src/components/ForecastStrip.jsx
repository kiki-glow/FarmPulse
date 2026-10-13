import { Calendar } from "lucide-react";
import { getWeatherIcon } from "../utils/weatherIcon";

const ForecastStrip = ({ daily }) => {
    if (!daily?.length) return null;

    const fmt = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-KE', { weekday: 'short', day: 'numeric' });
    };

    const maxPrecip = Math.max(...daily.map(d.precipitation_probability));

  return (
    <div className="card forecast-card">
        <h3 className="card-label">
            <Calendar size={18} style={{display: 'inline-block', marginRight: '0.5rem'}} /> 7-DAY FORECAST
        </h3>
        <div className="forecast-days">
            {daily.map((day) => (
                <div key={day.date} className="forecast-day">
                    <p className="forecast-day-label">{fmt(day.date)}</p>
                    <span className="forecast-day-icon">{getWeatherIcon(day.condition_code)}</span>
                    <div className="forecast-precip-bar-wrap">
                        <div
                            className="forecast-precip-bar"
                            style={{ height: `${(day.precipitation_probability / maxPrecip) * 32}px` }} 
                        />
                    </div>
                    <p className="forecast-precip-pct">{day.precipitation_probability}%</p>
                    <p className="forecast-range">
                        {Math.round(day.temp_min)}° <span className="forecast-range-max">/ {Math.round(day.temp_max)}° </span>
                    </p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ForecastStrip
