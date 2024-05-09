/*
  Warnings:

  - Added the required column `unit_price` to the `section` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "section" ADD COLUMN     "unit_price" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "creator" INTEGER NOT NULL,
    "handler" INTEGER NOT NULL,
    "created_by" INTEGER NOT NULL,
    "created_for" INTEGER NOT NULL,
    "delivery_date" TIMESTAMP(3) NOT NULL,
    "registeration_number" TEXT NOT NULL,
    "car_production_number" TEXT NOT NULL,
    "brand_and_model" TEXT NOT NULL,
    "engine_type" "engine_type",
    "additional_information" TEXT NOT NULL,
    "additional_information2" TEXT NOT NULL,
    "order_total_amount" INTEGER NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_row" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "order_id" INTEGER NOT NULL,
    "section_id" INTEGER NOT NULL,

    CONSTRAINT "order_row_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivered_order" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "creator" INTEGER NOT NULL,
    "handler" INTEGER NOT NULL,
    "created_by" INTEGER NOT NULL,
    "created_for" INTEGER NOT NULL,
    "delivery_date" TIMESTAMP(3) NOT NULL,
    "registeration_number" TEXT NOT NULL,
    "car_production_number" TEXT NOT NULL,
    "brand_and_model" TEXT NOT NULL,
    "engine_type" "engine_type",
    "additional_information" TEXT NOT NULL,
    "additional_information2" TEXT NOT NULL,
    "order_total_amount" INTEGER NOT NULL,

    CONSTRAINT "delivered_order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivered_order_row" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "order_id" INTEGER NOT NULL,
    "section_id" INTEGER NOT NULL,

    CONSTRAINT "delivered_order_row_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_creator_fkey" FOREIGN KEY ("creator") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_handler_fkey" FOREIGN KEY ("handler") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_created_for_fkey" FOREIGN KEY ("created_for") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_row" ADD CONSTRAINT "order_row_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_row" ADD CONSTRAINT "order_row_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivered_order" ADD CONSTRAINT "delivered_order_creator_fkey" FOREIGN KEY ("creator") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivered_order" ADD CONSTRAINT "delivered_order_handler_fkey" FOREIGN KEY ("handler") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivered_order" ADD CONSTRAINT "delivered_order_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivered_order" ADD CONSTRAINT "delivered_order_created_for_fkey" FOREIGN KEY ("created_for") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivered_order_row" ADD CONSTRAINT "delivered_order_row_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "delivered_order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivered_order_row" ADD CONSTRAINT "delivered_order_row_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
