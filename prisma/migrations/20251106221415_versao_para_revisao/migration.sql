/*
  Warnings:

  - You are about to drop the column `numeroVersao` on the `Revisao` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[propostaId,numeroRevisao]` on the table `Revisao` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `numeroRevisao` to the `Revisao` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Revisao_propostaId_numeroVersao_key";

-- AlterTable
ALTER TABLE "Revisao" DROP COLUMN "numeroVersao",
ADD COLUMN     "numeroRevisao" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Revisao_propostaId_numeroRevisao_key" ON "Revisao"("propostaId", "numeroRevisao");
