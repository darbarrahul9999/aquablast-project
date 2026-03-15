import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, Booking } from "./models";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/aquablast";
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Connect to MongoDB
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }

  // API routes
  app.get("/api/health", (req, res) => {
    const status = mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";
    res.json({ 
      status: "ok", 
      mongodb: status,
      dbName: mongoose.connection.name
    });
  });

  // Auth Routes
  const authenticate = (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  };

  // Auth Routes
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword });
      await user.save();
      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET);
      res.json({ token, user: { id: user._id, name, email } });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET);
      res.json({ token, user: { id: user._id, name: user.name, email } });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  // Booking CRUD Routes
  app.get("/api/bookings", authenticate, async (req: any, res) => {
    try {
      const bookings = await Booking.find({ userId: req.user.id });
      res.json(bookings);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/bookings", authenticate, async (req: any, res) => {
    try {
      const { service, date, message } = req.body;
      const booking = new Booking({ userId: req.user.id, service, date, message });
      await booking.save();
      res.json(booking);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  app.delete("/api/bookings/:id", authenticate, async (req: any, res) => {
    try {
      await Booking.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
      res.json({ success: true });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  // Legacy Contact Route
  app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }
    res.json({ success: true, message: "Thank you! Your message has been sent." });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
