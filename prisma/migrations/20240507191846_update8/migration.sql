/*
  Warnings:

  - You are about to drop the column `created_by` on the `delivered_order` table. All the data in the column will be lost.
  - You are about to drop the column `created_for` on the `delivered_order` table. All the data in the column will be lost.
  - You are about to drop the column `creator` on the `delivered_order` table. All the data in the column will be lost.
  - You are about to drop the column `handler` on the `delivered_order` table. All the data in the column will be lost.
  - You are about to drop the column `created_by` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `created_for` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `creator` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `handler` on the `order` table. All the data in the column will be lost.
  - Added the required column `customer_id` to the `delivered_order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_organization_id` to the `delivered_order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inspection_organization_id` to the `delivered_order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inspector_id` to the `delivered_order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_id` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_organization_id` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inspection_organization_id` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inspector_id` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "delivered_order" DROP CONSTRAINT "delivered_order_created_by_fkey";

-- DropForeignKey
ALTER TABLE "delivered_order" DROP CONSTRAINT "delivered_order_created_for_fkey";

-- DropForeignKey
ALTER TABLE "delivered_order" DROP CONSTRAINT "delivered_order_creator_fkey";

-- DropForeignKey
ALTER TABLE "delivered_order" DROP CONSTRAINT "delivered_order_handler_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_created_by_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_created_for_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_creator_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_handler_fkey";

-- AlterTable
ALTER TABLE "delivered_order" DROP COLUMN "created_by",
DROP COLUMN "created_for",
DROP COLUMN "creator",
DROP COLUMN "handler",
ADD COLUMN     "customer_id" INTEGER NOT NULL,
ADD COLUMN     "customer_organization_id" INTEGER NOT NULL,
ADD COLUMN     "inspection_organization_id" INTEGER NOT NULL,
ADD COLUMN     "inspector_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "order" DROP COLUMN "created_by",
DROP COLUMN "created_for",
DROP COLUMN "creator",
DROP COLUMN "handler",
ADD COLUMN     "customer_id" INTEGER NOT NULL,
ADD COLUMN     "customer_organization_id" INTEGER NOT NULL,
ADD COLUMN     "inspection_organization_id" INTEGER NOT NULL,
ADD COLUMN     "inspector_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_inspector_id_fkey" FOREIGN KEY ("inspector_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_inspection_organization_id_fkey" FOREIGN KEY ("inspection_organization_id") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_customer_organization_id_fkey" FOREIGN KEY ("customer_organization_id") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivered_order" ADD CONSTRAINT "delivered_order_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivered_order" ADD CONSTRAINT "delivered_order_inspector_id_fkey" FOREIGN KEY ("inspector_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivered_order" ADD CONSTRAINT "delivered_order_inspection_organization_id_fkey" FOREIGN KEY ("inspection_organization_id") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivered_order" ADD CONSTRAINT "delivered_order_customer_organization_id_fkey" FOREIGN KEY ("customer_organization_id") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
