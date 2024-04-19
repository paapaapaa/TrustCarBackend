/*
  Warnings:

  - Added the required column `type` to the `question` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "question_type" AS ENUM ('description', 'leftrightnumeric', 'celsius');

-- AlterTable
ALTER TABLE "question" ADD COLUMN     "type" "question_type" NOT NULL;

-- AlterTable
ALTER TABLE "report_row" ADD COLUMN     "additional_input" INTEGER,
ADD COLUMN     "additional_input_measurement" TEXT,
ADD COLUMN     "input_left" INTEGER,
ADD COLUMN     "input_left_measurement" TEXT,
ADD COLUMN     "input_right" INTEGER,
ADD COLUMN     "input_right_measurement" TEXT;
