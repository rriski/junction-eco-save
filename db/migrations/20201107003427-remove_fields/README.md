# Migration `20201107003427-remove_fields`

This migration has been generated by Henrik Aarnio at 11/7/2020, 2:34:27 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Building" DROP COLUMN "construction_year"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201107003153-id_string_unique..20201107003427-remove_fields
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgres"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -14,9 +14,8 @@
 model Building {
   id                      Int       @default(autoincrement()) @id
   building_id             String    @unique
-  construction_year       Int
   construction_date       DateTime
   heating_category        String
   fuel_category           String
   construction_material   String
```


