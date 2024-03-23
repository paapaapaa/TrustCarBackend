/*
  Warnings:

  - A unique constraint covering the columns `[report_id,question_id]` on the table `report_row` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "report_row_question_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "report_row_report_id_question_id_key" ON "report_row"("report_id", "question_id");
