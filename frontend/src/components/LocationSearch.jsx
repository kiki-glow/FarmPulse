import { Pin } from "lucide-react";

const LocationSearch = ({ lat, lon, setLat, setLon, onSearch, onAutoDetect, loading, error }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch();
    };
  return (
    <search className="location-search">
        <form className="coord-form" onSubmit={handleSubmit}>
            <input 
                type="number" 
                step="any"
                placeholder="Latitude e.g. -1.2921"
                value={lat}
                onChange={e => setLat(e.target.value)}
                required
            />
            <input 
                type="number"
                step="any"
                placeholder="Longitude e.g. 36.8219"
                value={lon} 
                onChange={e => setLon(e.target.value)}
                required
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Loading...' : 'Get Weather'}
            </button>
        </form>
        
        <button className="auto-btn" onClick={onAutoDetect} disabled={loading}>
            <Pin size={16} /> Auto-detect my location 
        </button>
        {error && <p className="error">{error}</p>}
    </search>
  )
}

export default LocationSearch