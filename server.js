require("dotenv").config(); // Load environment variables
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

// Middleware to set security headers
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  next();
});

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "HEAD"], // Add HEAD method
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Set Content-Security-Policy (CSP) headers
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com http://localhost:5173; " + // Added localhost
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; " +
      "connect-src 'self' http://localhost:3001 https://maps.googleapis.com http://localhost:5173 ws://localhost:5173; " +
      "frame-src https://www.google.com https://*.google.com https://maps.googleapis.com; " +
      "img-src 'self' https://*.googleapis.com https://maps.gstatic.com https://*.ggpht.com data:; " +
      "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com;"
  ); // Allow Google Maps images
  next();
});

// Root route
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Reviews API route
app.get("/api/reviews", async (req, res) => {
  const API_KEY = process.env.API_KEY;
  const PLACE_ID = process.env.PLACE_ID;

  if (!API_KEY || !PLACE_ID) {
    return res.status(500).json({ error: "Missing required environment variables" });
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&key=${API_KEY}&reviews_no_translations=true`;

  console.log("🔍 Fetching reviews from:", url);

  try {
    const response = await axios.get(url);

    // Check if reviews exist in API response
    const reviews = response.data?.result?.reviews || [];
    
    if (reviews.length === 0) {
      console.warn("⚠️ No reviews found in API response");
    }

    res.json({ reviews }); // ✅ Always return an object with 'reviews'
  } catch (error) {
    console.error("❌ Error fetching reviews:", error.message);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
