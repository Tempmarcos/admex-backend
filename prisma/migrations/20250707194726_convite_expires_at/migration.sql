/*
  Warnings:

  - Added the required column `expires_at` to the `Convite` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Convite_empresaId_key";

-- DropIndex
DROP INDEX "User_empresaId_key";

-- AlterTable
ALTER TABLE "Convite" ADD COLUMN     "cancelado" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "expires_at" TIMESTAMP(3) NOT NULL;
