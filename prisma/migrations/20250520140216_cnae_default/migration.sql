/*
  Warnings:

  - Made the column `classificacao` on table `DadosFiscais` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "DadosFiscais" ALTER COLUMN "classificacao" SET NOT NULL,
ALTER COLUMN "classificacao" SET DEFAULT '';
