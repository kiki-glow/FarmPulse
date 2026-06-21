import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import weatherRouter from "./routes/weather.js";
import treesRouter from "./routes/trees.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString });
});

app.use("/api/weather", weatherRouter);
app.use("/api/trees", treesRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`FarmPulse server running on http://localhost:${PORT}`)
});