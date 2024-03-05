# authdb

## IMPORTANT

later we MUST revoke unnecessary permissions

````sql
CREATE ROLE authuser WITH
  LOGIN
  NOSUPERUSER
  NOCREATEDB
  NOCREATEROLE
  INHERIT
  NOREPLICATION
  CONNECTION LIMIT -1
PASSWORD '<ganti dengan password>';

grant connect on database authdb to authuser

GRANT pg_read_all_data TO authuser;

GRANT pg_write_all_data TO authuser;

ALTER USER authuser WITH SUPERUSER;

/*
Commands must be executed while connected to the right database. Make sure of it.
*/

GRANT USAGE ON SCHEMA public TO authuser;

grant create on schema public to authuser;

GRANT ALL  ON ALL TABLES IN SCHEMA public TO authuser;

GRANT ALL  ON ALL SEQUENCES IN SCHEMA public TO authuser;



```sh
# pnpm prisma migrate dev --schema=./prisma/db-auth/schema.prisma

pnpm prisma generate --schema=./prisma/db-auth/schema.prisma

pnpm prisma db push --schema=./prisma/db-auth/schema.prisma

pnpm prisma migrate reset --schema=./prisma/db-auth/schema.prisma

pnpm prisma db seed --schema=./prisma/db-auth/schema.prisma
````

```sh
pnpm add next-auth
```

<https://authjs.dev/guides/upgrade-to-v5>

```sh
pnpm add bcryptjs
pnpm add next-auth@beta

pnpm add -D @types/bcryptjs

pnpm add react-icons
pnpm add form
pnpm add @auth/prisma-adapter
```
