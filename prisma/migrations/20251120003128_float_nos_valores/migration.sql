/*
  Warnings:

  - Changed the type of `preco` on the `ItemProposta` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `valorTotal` on the `Revisao` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ItemProposta" DROP COLUMN "preco",
ADD COLUMN     "preco" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Revisao" DROP COLUMN "valorTotal",
ADD COLUMN     "valorTotal" DOUBLE PRECISION NOT NULL;
