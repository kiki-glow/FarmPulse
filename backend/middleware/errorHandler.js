import { response } from "express";

export default function errorHandler(err, req, res, next) {
    console.error(err?.response?.data || err.message);

    const status = err?.response?.status || 500;
    const message = err?.response?.data?.message || err.message || "Internal server error";

    res.status(status).json({ error: message });
}