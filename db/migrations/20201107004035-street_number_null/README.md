# Migration `20201107004035-street_number_null`

This migration has been generated by Henrik Aarnio at 11/7/2020, 2:40:35 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Building" ALTER COLUMN "location_street_number" DROP NOT NULL
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201107003958-date_not_necessary..20201107004035-street_number_null
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
@@ -22,9 +22,9 @@
   area_living             Float?
   area_floors             Float?
   floors                  Int
   location_street_address String
-  location_street_number  String
+  location_street_number  String?
   location_post_number    String
   type                    String
 }
```

