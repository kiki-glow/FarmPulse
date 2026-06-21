import { useState } from "react"
import { fetchWeather, fetchWeatherByIP } from "./api/farmpulse.js"
import Layout from "./components/Layout"
import LocationSearch from "./components/LocationSearch"
import WeatherPanel from "./components/WeatherPanel"
import ForecastStrip from "./components/ForecastStrip"
import TreeAnalysisPanel from "./components/TreeAnalysisPanel"
import InsightBanner from "./components/InsightBanner"

const App = () => {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [weather, setWeather] = useState(null);
  const [treeData, setTreeData] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [error, setError] = useState(null);

  const handleWeatherSearch = async () => {
    setError(null);
    setLoadingWeather(true);
    try {
      const data = await fetchWeather(lat, lon);
      setWeather(data);
    } catch {
      setError("Could not fetch weather. Check your coordinates.")
    } finally {
      setLoadingWeather(false);
    }
  };

  const handleAutoDetect = async () => {
    setError(null);
    setLoadingWeather(true);
    try {
      const data = await fetchWeatherByIP();
      setWeather(data);
      if (data.location) {
        setLat(data.location.lat);
        setLon(data.location.lon);
      }
    } catch {
      setError("Could not auto-detect location.")
    } finally {
      setLoadingWeather(false);
    }
  };

  return (
    <Layout>
      <LocationSearch 
        lat={lat}
        lon={lon}
        setLat={setLat}
        setLon={setLon}
        onSearch={handleWeatherSearch}
        onAutoDetect={handleAutoDetect}
        error={error}
      />

      <br />
      
      {weather && treeData && (
        <InsightBanner weather={weather} treeData={treeData} />
      )}

      <div className="panels">
        {weather && (
          <div className="weather-column">
            <WeatherPanel weather={weather} />

            <ForecastStrip daily={weather.daily} />
          </div>
        )}

        <TreeAnalysisPanel
          onResult={setTreeData}
          treeData={treeData}
          farmLat={lat}
          farmLon={lon} 
        />
      </div>
    </Layout>
  )
}

export default App