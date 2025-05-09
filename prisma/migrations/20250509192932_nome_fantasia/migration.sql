/*
  Warnings:

  - You are about to drop the column `fonte` on the `Perfil` table. All the data in the column will be lost.
  - Added the required column `nomeFantasia` to the `DadosGerais` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DadosGerais" ADD COLUMN     "nomeFantasia" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Perfil" DROP COLUMN "fonte";
