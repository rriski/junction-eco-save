# Migration `20201106220834-create_building_renovation`

This migration has been generated by Henrik Aarnio at 11/7/2020, 12:08:34 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Building" (
"building_id" SERIAL,
"construction_year" integer   NOT NULL ,
PRIMARY KEY ("building_id")
)

CREATE TABLE "public"."Renovation" (
"id" SERIAL,
"start_year" integer   NOT NULL ,
"end_year" integer   NOT NULL ,
"description" text   NOT NULL ,
"category" text   NOT NULL ,
"buildingBuilding_id" integer   NOT NULL ,
PRIMARY KEY ("id")
)

ALTER TABLE "public"."Renovation" ADD FOREIGN KEY("buildingBuilding_id")REFERENCES "public"."Building"("building_id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201106174044..20201106220834-create_building_renovation
--- datamodel.dml
+++ datamodel.dml
@@ -1,38 +1,27 @@
 // This is your Prisma schema file,
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
-  provider = "sqlite"
-  url = "***"
+  provider = "postgres"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
 }
 // --------------------------------------
-model User {
-  id             Int       @default(autoincrement()) @id
-  createdAt      DateTime  @default(now())
-  updatedAt      DateTime  @updatedAt
-  name           String?
-  email          String    @unique
-  hashedPassword String?
-  role           String    @default("user")
-  sessions       Session[]
+model Building {
+  building_id             Int       @default(autoincrement()) @id
+  construction_year       Int
 }
-model Session {
-  id                 Int       @default(autoincrement()) @id
-  createdAt          DateTime  @default(now())
-  updatedAt          DateTime  @updatedAt
-  expiresAt          DateTime?
-  handle             String    @unique
-  user               User?     @relation(fields: [userId], references: [id])
-  userId             Int?
-  hashedSessionToken String?
-  antiCSRFToken      String?
-  publicData         String?
-  privateData        String?
-}
+model Renovation {
+  id                      Int       @default(autoincrement()) @id
+  building_id             Building
+  start_year              Int
+  end_year                Int
+  description             String
+  category                String
+}
```

