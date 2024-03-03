/*
  Warnings:

  - A unique constraint covering the columns `[section_id,question_id]` on the table `question_mapping` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "question_mapping_section_id_report_type_question_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "question_mapping_section_id_question_id_key" ON "question_mapping"("section_id", "question_id");
