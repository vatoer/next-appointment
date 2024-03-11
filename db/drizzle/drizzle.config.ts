import { defineConfig } from "drizzle-kit";
export default defineConfig({
  //schema: "./db/drizzle/schema/*",
  out: "./db/drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || "",
  },
  verbose: true,
  strict: true,
});
