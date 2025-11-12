/*
  Warnings:

  - You are about to drop the column `titulo` on the `Proposta` table. All the data in the column will be lost.
  - You are about to drop the `ProdutoProposta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ServicoProposta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VersaoProposta` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProdutoProposta" DROP CONSTRAINT "ProdutoProposta_versaoPropostaId_fkey";

-- DropForeignKey
ALTER TABLE "ServicoProposta" DROP CONSTRAINT "ServicoProposta_versaoPropostaId_fkey";

-- DropForeignKey
ALTER TABLE "VersaoProposta" DROP CONSTRAINT "VersaoProposta_propostaId_fkey";

-- AlterTable
ALTER TABLE "Proposta" DROP COLUMN "titulo";

-- DropTable
DROP TABLE "ProdutoProposta";

-- DropTable
DROP TABLE "ServicoProposta";

-- DropTable
DROP TABLE "VersaoProposta";

-- CreateTable
CREATE TABLE "Revisao" (
    "id" TEXT NOT NULL,
    "propostaId" TEXT NOT NULL,
    "dataProposta" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valorTotal" TEXT NOT NULL,
    "numeroVersao" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "aprovado" BOOLEAN NOT NULL DEFAULT false,
    "executado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Revisao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemProposta" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "preco" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "RevisaoId" TEXT,

    CONSTRAINT "ItemProposta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Revisao_propostaId_numeroVersao_key" ON "Revisao"("propostaId", "numeroVersao");

-- AddForeignKey
ALTER TABLE "Revisao" ADD CONSTRAINT "Revisao_propostaId_fkey" FOREIGN KEY ("propostaId") REFERENCES "Proposta"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemProposta" ADD CONSTRAINT "ItemProposta_RevisaoId_fkey" FOREIGN KEY ("RevisaoId") REFERENCES "Revisao"("id") ON DELETE CASCADE ON UPDATE CASCADE;
