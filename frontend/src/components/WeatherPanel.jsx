import { Pin, Sparkles, Droplets, Wind, Sun, Eye, Gauge } from "lucide-react";
import { getWeatherIcon } from "../utils/weatherIcon"

const StatCard = ({ icon: Icon, label, value, unit }) => (
    <div className="start-card">
        <div className="start-card-icon"><Icon size={16} /></div>
        <div>
            <p className="start-card-value">
                {value}
                <span className="start-card-unit">{unit}</span>
            </p>
            <p className="start-card-label">{label}</p>
        </div>
    </div>
);

const WeatherPanel = ({ weather }) => {
    const { current, location } = weather;

  return (
    <div className="card weather-panel">
        <div className="card-label">CURRENT CONDITIONS</div>

        <div className="weather-hero">
            <div className="weather-hero-left">
                <span className="weather-emoji">{getWeatherIcon(current.condition_code)}</span>
                <div>
                    <p className="weather-temp">{Math.round(current.temperature)}&deg;C</p>
                    <p className="weather-feels">Feels like {current.feels_like !== null
                        ? Math.round(current.feels_like)
                        : Math.round(current.temperature)}°C
                    </p>
                </div>
            </div>
            <div className="weather-location">
                <p className="weather-location-country">{location.country}</p>
                <p className="weather-location-coords">
                    {Number(location.lat).toFixed(2)}, {Number(location.lon).toFixed(2)}
                </p>
            </div>
        </div>

        <div className="start-cards">
            <StatCard icon={Droplets} label="Humidity" value={current.humidity ?? '–'} unit="%" />
            <StatCard icon={Wind} label="Wind" value={current.wind_speed} unit="km/h" />
            <StatCard icon={Sun} label="UV Index" value={current.uv_index ?? '–'} unit="" />
            <StatCard icon={Gauge} label="Gusts" value={current.wind_gust ?? '–'} unit="km/h" />
        </div>
        
        {weather.ai_summary && (
            <div className="ai-summary">
                <span className="ai-badge">
                    <Sparkles size={14} /> AI Summary
                </span>
                <p>{weather.ai_summary}</p>
            </div>
        )}
    </div>
  )
}

export default WeatherPanel
