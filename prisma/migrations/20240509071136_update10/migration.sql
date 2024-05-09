/*
  Warnings:

  - You are about to drop the column `delivery_date` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `registeration_number` on the `order` table. All the data in the column will be lost.
  - Added the required column `registration_number` to the `order` table without a default value. This is not possible if the table is not empty.
  - Made the column `type` on table `organization` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "order" DROP COLUMN "delivery_date",
DROP COLUMN "registeration_number",
ADD COLUMN     "registration_number" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "organization" ALTER COLUMN "type" SET NOT NULL;
