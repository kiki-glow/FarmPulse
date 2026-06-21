# FarmPulse

**Farm intelligence dashboard for East African smallholder farmers.**

FarmPulse combines real-time weather forecasting with AI-powered tree canopy analysis to deliver actionable, context-aware insights — not just data. Instead of showing a farmer "rain is coming" and "12 trees need care" separately, FarmPulse cross-references both to surface recommendations like *"rain expected Thursday — ideal conditions to replant the 4 flagged trees."*

Built as a technical assessment integrating the [WeatherAI API](https://weather-ai.co/docs).

**Live demo:** [farmpulse.netlify.app](https://farmpulse.netlify.app) <!-- update after deploy -->  
**Backend:** [farmpulse-api.onrender.com](https://farmpulse-api.onrender.com)

---

## Features

- **Current conditions** — temperature, humidity, wind, UV index, with Gemini AI summary
- **7-day forecast** — daily breakdown with precipitation probability
- **Auto-detect location** — uses WeatherAI's IP geo-detection to find the user's farm region automatically
- **Farm tree analysis** — upload a drone or satellite image to get tree count, canopy coverage, health breakdown (healthy / needs care / needs replacement), and agronomic recommendations powered by OpenCV + Gemini
- **Insight Banner** — cross-references weather forecast and tree health to generate combined, actionable farm recommendations
- **Annotated overlay** — visual output showing detected tree crowns on the uploaded image

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite |
| Backend | Node.js, Express |
| Image handling | Multer (memory storage) |
| HTTP client | Axios |
| API | WeatherAI (`/v1/weather`, `/v1/weather-geo`, `/v1/trees/analyze`) |
| Frontend deploy | Netlify |
| Backend deploy | Render |

---

## Architecture

```
Client (React + Vite)
    │
    │  GET /api/weather?lat=&lon=
    │  GET /api/weather/current
    │  POST /api/trees/analyze  (multipart/form-data)
    ▼
Express Proxy (Node.js)          ← API key lives here only
    │
    │  Authorization: Bearer wai_...
    ▼
WeatherAI API (api.weather-ai.co)
```

The backend is a deliberate thin proxy — its only responsibility is keeping the API key server-side and forwarding requests to WeatherAI. All UI logic and data composition lives in the frontend.

---

## Local Setup

### Prerequisites
- Node.js 18+
- A WeatherAI API key — sign up at [weather-ai.co](https://weather-ai.co)

### 1. Clone the repo

```bash
git clone https://github.com/kiki-glow/FarmPulse.git
cd farmpulse
```

### 2. Backend

```bash
cd server
npm install
```

Create `server/.env`:

```env
WEATHER_AI_API_KEY=wai_your_key_here
PORT=3001
```

Start the server:

```bash
npm run dev
```

Backend runs at `http://localhost:3001`. Verify with:

```bash
curl http://localhost:3001/health
```

### 3. Frontend

```bash
cd client
npm install
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:3001
```

Start the dev server:

```bash
npm run dev
```

Frontend runs at `http://localhost:5173`.

---

## API Endpoints (Backend)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Server health check |
| `GET` | `/api/weather?lat=&lon=&days=` | 7-day forecast + current conditions |
| `GET` | `/api/weather/current` | Auto-detect location via IP + current weather |
| `POST` | `/api/trees/analyze` | Upload farm image for tree analysis |

### Tree analysis request

```bash
curl -X POST http://localhost:3001/api/trees/analyze \
  -F "image=@/path/to/farm.jpg" \
  -F "location=-1.2921, 36.8219"
```

### Tree analysis response (shape)

```json
{
  "total_tree_count": 84,
  "canopy_coverage_pct": 41.2,
  "confidence_score": 0.87,
  "tree_health": {
    "healthy": 68,
    "needs_care": 12,
    "needs_replacement": 4
  },
  "recommendations": [
    "Consider thinning northern section to improve light penetration",
    "Improve drainage around water source trees"
  ],
  "overlay_image_url": "https://storage.googleapis.com/..."
}
```

---

## Project Structure

```
farmpulse/
├── server/
│   ├── routes/
│   │   ├── weather.js        # Weather + geo-detection proxy
│   │   └── trees.js          # Image upload + tree analysis proxy
│   ├── middleware/
│   │   └── errorHandler.js   # Centralised error handling
│   ├── .env.example
│   └── index.js
│
└── client/
    ├── src/
    │   ├── api/
    │   │   └── farmpulse.js  # All fetch calls to Express backend
    │   ├── components/
    │   │   ├── Layout.jsx
    │   │   ├── Header.jsx
    │   │   ├── LocationSearch.jsx
    │   │   ├── WeatherPanel.jsx
    │   │   ├── ForecastStrip.jsx
    │   │   ├── TreeAnalysisPanel.jsx
    │   │   └── InsightBanner.jsx
    │   ├── utils/
    │   │   └── weatherIcon.js
    │   └── App.jsx
    ├── .env.example
    └── vite.config.js
```

---

## WeatherAI APIs Used

**`GET /v1/weather`** — current conditions and 7-day forecast by coordinates, with Gemini AI summary.

**`GET /v1/weather-geo`** — auto-detects caller location from IP, returns weather + geo metadata. Used for the one-click location detection feature.

**`POST /v1/trees/analyze`** — accepts a farm image as `multipart/form-data`. Returns tree count, density per acre, canopy coverage, health breakdown, annotated overlay image, and Gemini-powered agronomic observations.

---

## Environment Variables

### Server (`server/.env`)

| Variable | Description |
|---|---|
| `WEATHER_AI_API_KEY` | WeatherAI API key (prefixed `wai_`) |
| `PORT` | Port to run Express on (default: `3001`) |

### Client (`client/.env`)

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of the Express backend |

---

## Deployment

### Backend (Render)

1. Push `server/` to GitHub
2. Create a new **Web Service** on Render, point to the repo
3. Set build command: `npm install`
4. Set start command: `node index.js`
5. Add environment variable: `WEATHER_AI_API_KEY`

### Frontend (Render)

1. Push `client/` to GitHub
2. Create a new site on Netlify, point to the repo
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variable: `VITE_API_URL` pointing to your Render backend URL

---

## Author

**Kinya** — [github.com/kiki-glow](https://github.com/kiki-glow)