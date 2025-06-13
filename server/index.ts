import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import adminRoutes from "./routes/adminRoutes";
import productRoutes from "./routes/productRoutes";
import { closeAllConnections } from "./config/db";

dotenv.config({ path: ".env.local" });

const app = express();
app.use(cors());
app.use(express.json());

// all admin-user routes under /api/admin
app.use("/api/admin", adminRoutes);
// all product routes under /api/products
app.use("/api/products", productRoutes);

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await closeAllConnections();
    process.exit(0);
  });
});

process.on("SIGINT", async () => {
  console.log("SIGINT received, shutting down gracefully");
  server.close(async () => {
    await closeAllConnections();
    process.exit(0);
  });
});
