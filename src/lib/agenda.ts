// src/lib/agenda.ts
import { Agenda } from "agenda";
import { MongoBackend } from "@agendajs/mongo-backend";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

// Ensure a single instance across hot-reloads in development
const globalForAgenda = global as unknown as { agenda: Agenda };

export const agenda = globalForAgenda.agenda || new Agenda({
  // Initialize Agenda with MongoBackend
  backend: new MongoBackend({
    address: MONGODB_URI,
    collection: "agendaJobs",
  }),
  processEvery: "1 minute",
});

if (process.env.NODE_ENV !== "production") {
  globalForAgenda.agenda = agenda;
}

// Graceful shutdown
if (process.env.NODE_ENV !== "test") {
  process.on("SIGTERM", async () => {
    await agenda.stop();
    process.exit(0);
  });

  process.on("SIGINT", async () => {
    await agenda.stop();
    process.exit(0);
  });
}

export async function startAgenda() {
  await agenda.start();
  console.log("\n-------------------------------------------");
  console.log("🚀 AGENDA QUEUE ĐÃ KHỞI CHẠY THÀNH CÔNG! 🚀");
  console.log("-------------------------------------------\n");
}

export default agenda;
