# command

## setting database

- database client
  - https://dbeaver.io/

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

grant create on schema public to janji;

GRANT ALL  ON ALL TABLES IN SCHEMA public TO janji;

GRANT ALL  ON ALL SEQUENCES IN SCHEMA public TO janji;
```

## prisma installation

```sh
pnpm add @prisma/client
pnpm add -D prisma
pnpm prisma init
```

## prisma create schema.prisma

## generate code

```sh
pnpm prisma generate --schema=./prisma/db-appointment/schema.prisma

pnpm prisma db push --schema=./prisma/db-appointment/schema.prisma

pnpm prisma migrate reset --schema=./prisma/db-appointment/schema.prisma

# pnpm prisma migrate dev --schema=./prisma/db-appointment/schema.prisma


pnpm prisma db seed --schema=./prisma/db-appointment/schema.prisma

```
