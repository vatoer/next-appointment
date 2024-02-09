# dev

`sh
pnpm dlx shadcn-ui@latest init
pnpm dlx shadcn-ui@latest add popover calendar button skeleton select sheet sonner checkbox separator calendar popover
pnpm add react-hook-form @hookform/resolvers zod
pnpm add lodash
pnpm add -D @types/lodash

pnpm add @prisma/client
pnpm add -D prisma
pnpm prisma init
`

## setting database

setup database using postgresql
<https://www.warp.dev/terminus/postgres-docker-compose>

```sql
# https://www.postgresql.org/docs/14/sql-grant.html

CREATE ROLE janji WITH
  LOGIN
  NOSUPERUSER
  NOCREATEDB
  NOCREATEROLE
  INHERIT
  NOREPLICATION
  CONNECTION LIMIT -1
PASSWORD 'passpanjangkalilebar';


COMMENT ON ROLE janji IS 'ini adalah user untuk janji';

Create database appointment

grant connect on database appointment to janji

GRANT pg_read_all_data TO janji;

GRANT pg_write_all_data TO janji;

/*
Commands must be executed while connected to the right database. Make sure of it.
*/
GRANT USAGE ON SCHEMA public TO janji;

grant create on schema public to janji

GRANT ALL  ON ALL TABLES IN SCHEMA public TO janji;

GRANT ALL  ON ALL SEQUENCES IN SCHEMA public TO janji;
```

## update schema.prisma

```sh
pnpm prisma migrate status --schema=prisma\db-appointment\schema.prisma

pnpm prisma migrate dev --schema=prisma\db-appointment\schema.prisma
```

<https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/shadow-database>

```sql
ALTER USER janji WITH CREATEDB

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

```

update migration.sql

```sql
CREATE TABLE "FilledForm" (
-     "id" TEXT NOT NULL,
+    "id" uuid NOT NULL DEFAULT UUID_GENERATE_V4(),
```

reset migrations

```sh
pnpm prisma migrate reset --schema=prisma\db-appointment\schema.prisma
```

## seed database

```sh
pnpm add -D tsx
```

```sh
pnpm prisma db seed
```

atau langsung saja push

pnpm prisma db push --schema=prisma\db-appointment\schema.prisma
