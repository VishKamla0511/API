import type { Config } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle/migrations",
  dbCredentials: {
    connectionString: process.env.DB_URL!,
  },
  driver: "pg",
} satisfies Config;
