/*
  Warnings:

  - The values [gasoline] on the enum `report_type` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[id]` on the table `question` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `section` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "report_type_new" AS ENUM ('petrol', 'hybrid', 'electric');
ALTER TABLE "report" ALTER COLUMN "report_type" TYPE "report_type_new" USING ("report_type"::text::"report_type_new");
ALTER TABLE "question_mapping" ALTER COLUMN "report_type" TYPE "report_type_new" USING ("report_type"::text::"report_type_new");
ALTER TYPE "report_type" RENAME TO "report_type_old";
ALTER TYPE "report_type_new" RENAME TO "report_type";
DROP TYPE "report_type_old";
COMMIT;

-- AlterTable
ALTER TABLE "question" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "question_id_seq";

-- AlterTable
ALTER TABLE "section" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "section_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "question_id_key" ON "question"("id");

-- CreateIndex
CREATE UNIQUE INDEX "section_id_key" ON "section"("id");
