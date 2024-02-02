-- CreateEnum
CREATE TYPE "organization_type" AS ENUM ('maintenance', 'seller', 'inspection', 'repair');

-- CreateTable
CREATE TABLE "organization" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR,
    "type" "organization_type",
    "business_number" VARCHAR,
    "address" VARCHAR,
    "city" VARCHAR,
    "postcode" INTEGER,
    "phone" INTEGER,
    "email" VARCHAR,
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),
    "modified_by_user" INTEGER,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR,
    "email" TEXT,
    "password" VARCHAR,
    "role" VARCHAR,
    "username" VARCHAR,
    "password_salt" VARCHAR,
    "language_id" INTEGER,
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),
    "modified_by_user" INTEGER,
    "organization_id" INTEGER,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
