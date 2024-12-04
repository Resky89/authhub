
import express from "express";
import "dotenv/config";
import http from "http";
import ngrok from "@ngrok/ngrok";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import helmet from "helmet";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import { globalRateLimiter } from "./src/middlewares/rateLimiter.js";


const app = express();
const port = process.env.PORT;

// Enable trust proxy for rate-limiter support
app.set("trust proxy", 1);

// Middleware Configuration
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(compression());
app.use(helmet());
app.use(globalRateLimiter);

// API Routes
app.use("/api", authRoutes, userRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "Welcome to express" });
});

// 404 Error Handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Ngrok Tunnel Setup
async function startNgrok() {
  try {
    const listener = await ngrok.connect({
      addr: port,
      authtoken_from_env: true,
    });
    console.log(`your ngrok established at ${listener.url()}`);
  } catch (error) {
    console.error("failed to connectngrok", error);
  }
}

// Server Initialization
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`your server running at port ${port}`);
  startNgrok();
});

export default app;
