/*
  Warnings:

  - Added the required column `order_status` to the `delivered_order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_status` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "order_status" AS ENUM ('started', 'not_started', 'ready');

-- AlterTable
ALTER TABLE "delivered_order" ADD COLUMN     "order_status" "order_status" NOT NULL;

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "order_status" "order_status" NOT NULL;
