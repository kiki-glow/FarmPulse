import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const fetchWeather = (lat, lon) => 
    api.get("/api/weather", { params: { lat, lon, days: 7 } }).then(r => r.data);

export const fetchWeatherByIP = () =>
    api.get("/api/weather/current").then(r => r.data);

export const analyzeTrees = (formData) =>
    api.post("/api/post/analyze", formData).then(r => r.data);