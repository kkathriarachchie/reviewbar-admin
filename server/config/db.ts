import mongoose, { Connection } from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const uri = process.env.MONGODB_URI;

// cache connections here
const connections: Record<string, Connection> = {};

/**
 * Get or create a mongoose.Connection to the given database name.
 */
export async function getDatabaseConnection(
  dbName: string
): Promise<Connection> {
  if (connections[dbName]) {
    return connections[dbName];
  }

  if (!uri) {
    throw new Error("MONGODB_URI is not defined");
  }

  const conn = await mongoose.createConnection(uri, {
    dbName,
    // Connection pool settings
    maxPoolSize: 10, // Maximum number of connections in the pool
    minPoolSize: 2, // Minimum number of connections in the pool
    maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
    serverSelectionTimeoutMS: 5000, // How long to try selecting a server
    // you can add any mongoose options here
  });
  connections[dbName] = conn;
  console.log(`🔥 mongoose connected to ${dbName}`);

  conn.on("connected", () => console.log(`✅ ${dbName} connected`));
  conn.on("error", (err) => console.error(`❌ ${dbName} error:`, err));
  conn.on("disconnected", () => console.log(`⚠️ ${dbName} disconnected`));

  return conn;
}

// Graceful shutdown
export async function closeAllConnections(): Promise<void> {
  for (const [dbName, conn] of Object.entries(connections)) {
    await conn.close();
    console.log(`🔌 Closed connection to ${dbName}`);
  }
}
