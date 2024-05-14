/*
  Warnings:

  - You are about to drop the column `registeration_number` on the `delivered_order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[report_id]` on the table `delivered_order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `registration_number` to the `delivered_order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `report_id` to the `delivered_order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "delivered_order" DROP COLUMN "registeration_number",
ADD COLUMN     "registration_number" TEXT NOT NULL,
ADD COLUMN     "report_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "delivered_order_report_id_key" ON "delivered_order"("report_id");

-- AddForeignKey
ALTER TABLE "delivered_order" ADD CONSTRAINT "delivered_order_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
