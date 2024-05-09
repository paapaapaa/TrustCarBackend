-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_inspector_id_fkey";

-- AlterTable
ALTER TABLE "order" ALTER COLUMN "additional_information" DROP NOT NULL,
ALTER COLUMN "additional_information2" DROP NOT NULL,
ALTER COLUMN "customer_id" DROP NOT NULL,
ALTER COLUMN "inspector_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_inspector_id_fkey" FOREIGN KEY ("inspector_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
