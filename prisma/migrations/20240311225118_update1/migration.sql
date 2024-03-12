-- CreateEnum
CREATE TYPE "inspection_status" AS ENUM ('red', 'yellow', 'green');

-- CreateEnum
CREATE TYPE "organization_type" AS ENUM ('maintenance', 'seller', 'inspection', 'repair');

-- CreateEnum
CREATE TYPE "engine_type" AS ENUM ('petrol', 'diesel', 'hybrid_diesel', 'hybrid_gasoline', 'electric');

-- CreateEnum
CREATE TYPE "report_type" AS ENUM ('full', 'narrow', 'light');

-- CreateEnum
CREATE TYPE "attachment_type" AS ENUM ('image', 'audio');

-- CreateTable
CREATE TABLE "organization" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR,
    "type" "organization_type",
    "business_number" VARCHAR,
    "address" VARCHAR,
    "city" VARCHAR,
    "postcode" INTEGER,
    "phone" BIGINT,
    "email" VARCHAR,
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),
    "modified_by_user" INTEGER,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "firstname" VARCHAR NOT NULL,
    "lastname" VARCHAR NOT NULL,
    "email" TEXT,
    "hashpassword" VARCHAR,
    "role" VARCHAR,
    "username" VARCHAR NOT NULL,
    "password_salt" VARCHAR NOT NULL,
    "language_id" INTEGER,
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),
    "modified_by_user" INTEGER,
    "organization_id" INTEGER,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report" (
    "id" SERIAL NOT NULL,
    "registeration_number" TEXT,
    "production_number" INTEGER,
    "brand_and_model" TEXT,
    "odometer_reading" INTEGER,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "modified_by_user" INTEGER,
    "organization_id" INTEGER,
    "engine_type" "engine_type",

    CONSTRAINT "report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_row" (
    "id" SERIAL NOT NULL,
    "report_id" INTEGER,
    "question_id" INTEGER,
    "inspection_status" "inspection_status",
    "comment" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "modified_by_user" INTEGER,

    CONSTRAINT "report_row_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attachments" (
    "id" SERIAL NOT NULL,
    "data" BYTEA,
    "attachment_type" "attachment_type",
    "report_row_id" INTEGER NOT NULL,

    CONSTRAINT "attachments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question" (
    "id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "translations_id" INTEGER,

    CONSTRAINT "question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "section" (
    "id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "translations_id" INTEGER,

    CONSTRAINT "section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_mapping" (
    "id" SERIAL NOT NULL,
    "engine_type" "engine_type" NOT NULL,
    "report_type" "report_type" NOT NULL,
    "section_id" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,

    CONSTRAINT "question_mapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "translations" (
    "id" SERIAL NOT NULL,
    "finnish_text" TEXT,
    "english_text" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "translations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "report_row_question_id_key" ON "report_row"("question_id");

-- CreateIndex
CREATE UNIQUE INDEX "question_id_key" ON "question"("id");

-- CreateIndex
CREATE UNIQUE INDEX "question_translations_id_key" ON "question"("translations_id");

-- CreateIndex
CREATE UNIQUE INDEX "section_id_key" ON "section"("id");

-- CreateIndex
CREATE UNIQUE INDEX "section_translations_id_key" ON "section"("translations_id");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "report" ADD CONSTRAINT "report_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "report_row" ADD CONSTRAINT "report_row_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "report"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "report_row" ADD CONSTRAINT "report_row_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_report_row_id_fkey" FOREIGN KEY ("report_row_id") REFERENCES "report_row"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_translations_id_fkey" FOREIGN KEY ("translations_id") REFERENCES "translations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "section" ADD CONSTRAINT "section_translations_id_fkey" FOREIGN KEY ("translations_id") REFERENCES "translations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_mapping" ADD CONSTRAINT "question_mapping_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_mapping" ADD CONSTRAINT "question_mapping_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
