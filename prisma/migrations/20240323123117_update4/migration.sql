/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `language` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "language" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "language_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "language_id_key" ON "language"("id");
