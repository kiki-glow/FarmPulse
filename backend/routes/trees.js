import express from "express";
import multer from "multer";
import axios from "axios";
import dotenv from "dotenv";
import FormData from "form-data";

dotenv.config();

const router = express.Router();
const BASE_URL = "https://api.weather-ai.co/v1";

// store file in memory
const upload = multer({ storage: multer.memoryStorage() });

// POST /api/trees/analyze
router.post("/analyze", upload.single('image'), async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "image file is required" });
        }

        const { farmerId, county, landAcres, location, notes } = req.body;

        const form = new FormData();
        form.append('image', req.file.buffer, {
            filename: req.file.originalname,
            contentType: req.file.mimetype,
        });

        if (farmerId) form.append('farmerId', farmerId);
        if (county) form.append('county', county);
        if (landAcres) form.append('landAcres', landAcres);
        if (location) form.append('location', location);
        if (notes) form.append('notes', notes);

        const response = await axios.post(
            `${BASE_URL}/trees/analyze`,
            form,
            {
                headers: {
                    Authorization: `Bearer ${process.env.WEATHER_AI_API_KEY}`,
                    ...form.getHeaders(),
                },
                maxBodyLength: Infinity,
            }
        );

        res.json(response.data);
    } catch (err) {
        next(err);
    }
});

export default router;