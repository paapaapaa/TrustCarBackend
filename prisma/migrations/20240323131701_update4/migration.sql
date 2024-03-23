/*
  Warnings:

  - You are about to drop the column `translation_id` on the `question` table. All the data in the column will be lost.
  - You are about to drop the column `translation_id` on the `section` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "question_translation_id_key";

-- DropIndex
DROP INDEX "section_translation_id_key";

-- AlterTable
ALTER TABLE "question" DROP COLUMN "translation_id";

-- AlterTable
ALTER TABLE "section" DROP COLUMN "translation_id";
