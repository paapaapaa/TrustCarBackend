/*
  Warnings:

  - A unique constraint covering the columns `[report_id]` on the table `order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `report_id` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "delivered_order" DROP CONSTRAINT "delivered_order_report_id_fkey";

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "report_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "order_report_id_key" ON "order"("report_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
