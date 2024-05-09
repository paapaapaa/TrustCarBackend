/*
  Warnings:

  - Added the required column `report_type` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" ADD COLUMN     "report_type" "report_type" NOT NULL;
