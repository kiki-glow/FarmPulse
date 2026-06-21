import { Pin, Sparkles } from "lucide-react";
import { getWeatherIcon } from "../utils/weatherIcon"

const WeatherPanel = ({ weather }) => {
    const { current, location } = weather;

  return (
    <div className="card weather-panel">
        <div className="card-header">
            <h2>Current Conditions</h2>
            <span className="location-tag">
                <Pin size={16} /> {location.country} · {location.lat.toFixed(2)}, {location.lon.toFixed(2)}
            </span>
        </div>
        <div className="current-weather">
            <span className="weather-icon-lg">{getWeatherIcon(current.condition_code)}</span>
            <div className="temp-block">
                <span className="temperature">{Math.round(current.temperature)}°C</span>
                <span className="feels-like">
                    Feels like {Math.round(current.feels_like)}°C
                </span>
            </div>
        </div>
        <div className="weather-stats">
            <div className="stat">
                <span className="stat-label">Humidity</span>
                <span className="stat-value">{current.humidity}%</span>
            </div>
            <div className="stat">
                <span className="stat-label">Wind</span>
                <span className="stat-value">{current.wind_speed} km/h</span>
            </div>
            <div className="stat">
                <span className="stat-label">UV Index</span>
                <span className="stat-value">{current.uv_index}</span>
            </div>
            <div className="stat">
                <span className="stat-label">Gusts</span>
                <span className="stat-value">{current.wind_gust} km/h</span>
            </div>
        </div>
        {weather.ai_summary && (
            <div className="ai-summary">
                <span className="ai-badge">
                    <Sparkles size={16} /> AI Summary
                </span>
                <p>{weather.ai_summary}</p>
            </div>
        )}
    </div>
  )
}

export default WeatherPanel