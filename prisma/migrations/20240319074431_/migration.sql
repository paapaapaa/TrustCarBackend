/*
  Warnings:

  - You are about to drop the column `translations_id` on the `question` table. All the data in the column will be lost.
  - You are about to drop the column `translations_id` on the `section` table. All the data in the column will be lost.
  - You are about to drop the `translations` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[translation_id]` on the table `question` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[translation_id]` on the table `section` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "question" DROP CONSTRAINT "question_translations_id_fkey";

-- DropForeignKey
ALTER TABLE "section" DROP CONSTRAINT "section_translations_id_fkey";

-- DropIndex
DROP INDEX "question_translations_id_key";

-- DropIndex
DROP INDEX "section_translations_id_key";

-- AlterTable
ALTER TABLE "question" DROP COLUMN "translations_id",
ADD COLUMN     "translation_id" INTEGER;

-- AlterTable
ALTER TABLE "section" DROP COLUMN "translations_id",
ADD COLUMN     "translation_id" INTEGER;

-- DropTable
DROP TABLE "translations";

-- CreateTable
CREATE TABLE "language" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "code" VARCHAR NOT NULL,

    CONSTRAINT "language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "translation" (
    "id" SERIAL NOT NULL,
    "value" VARCHAR,
    "language_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "questionId" INTEGER,
    "sectionId" INTEGER,

    CONSTRAINT "translation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "question_translation_id_key" ON "question"("translation_id");

-- CreateIndex
CREATE UNIQUE INDEX "section_translation_id_key" ON "section"("translation_id");

-- AddForeignKey
ALTER TABLE "translation" ADD CONSTRAINT "translation_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "translation" ADD CONSTRAINT "translation_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "section"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "translation" ADD CONSTRAINT "translation_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
