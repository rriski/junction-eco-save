# Migration `20201107003026-building_add_type`

This migration has been generated by Henrik Aarnio at 11/7/2020, 2:30:26 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Building" DROP COLUMN "use_category",
ADD COLUMN "type" text   NOT NULL 
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201107000951-add_building_data..20201107003026-building_add_type
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
@@ -15,9 +15,8 @@
 model Building {
   building_id             Int       @default(autoincrement()) @id
   construction_year       Int
   construction_date       DateTime
-  use_category            String
   heating_category        String
   fuel_category           String
   construction_material   String
   area_living             Float
@@ -25,8 +24,9 @@
   floors                  Int
   location_street_address String
   location_street_number  Int
   location_post_number    String
+  type                    String
 }
 model Renovation {
   id                      Int       @default(autoincrement()) @id
```


