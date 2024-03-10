import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
// for migrations
const postgresUrl =
  process.env.DATABASE_URL || "postgres://postgres:adminadmin@0.0.0.0:5432/db";
const migrationClient = postgres(postgresUrl, { max: 1 });
// for query purposes
const queryClient = postgres(postgresUrl);
export const dDbAppointment = drizzle(queryClient);
