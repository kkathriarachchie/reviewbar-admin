import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import apiRoutes from "./routes/apiRoutes";

dotenv.config({ path: ".env.local" });

const app = express();
const port = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
