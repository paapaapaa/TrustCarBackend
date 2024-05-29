-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_report_id_fkey";

-- AlterTable
ALTER TABLE "order" ALTER COLUMN "report_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "report"("id") ON DELETE SET NULL ON UPDATE CASCADE;
