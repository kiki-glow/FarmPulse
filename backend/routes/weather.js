import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const BASE_URL = "https://api.weather-ai.co/v1";

const weatherClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${process.env.WEATHER_AI_API_KEY}`,
    },
});

// GET /api/weather?lat=&lon=&days=&lang=
router.get("/", async (req, res, next) => {
    try {
        const { lat, lon, days = 7, lang = 'en', units = "metric" } = req.query;

        if (!lat || !lon) {
            return res.status(400).json({ error: "lat and lon are required" });
        }

        const response = await weatherClient.get("/weather", {
            params: { lat, lon, days, lang, units, ai: true },
        });

        res.json(response.data);
    } catch (err) {
        next(err);
    }
});

// GET /api/weather/current?ip=auto
router.get("/current", async (req, res, next) => {
    try {
        const { ip = 'auto' } = req.query;

        const response = await weatherClient.get("/weather-geo", {
            params: { ip, ai: true },
        });

        const data = response.data;

        if (data.current && data.current.feels_like === undefined) {
           data.current.feels_like = data.current.apparent_temperature ?? data.current.temperature; 
        }
        if (data.current && data.current.humidity === undefined) {
            data.current.humidity = data.current.relative_humidity ?? null;
        }

        res.json(data);
    } catch (err) {
        next(err);
    }
});

export default router;