/*
  Warnings:

  - You are about to drop the column `contaBancaria` on the `DadosFinanceiros` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."DadosFinanceiros" DROP COLUMN "contaBancaria",
ADD COLUMN     "agencia" TEXT,
ADD COLUMN     "banco" TEXT,
ADD COLUMN     "conta" TEXT,
ADD COLUMN     "pix" TEXT;
