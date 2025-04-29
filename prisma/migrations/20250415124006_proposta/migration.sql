/*
  Warnings:

  - You are about to drop the column `clienteId` on the `DadosFiscais` table. All the data in the column will be lost.
  - You are about to drop the column `fornecedorId` on the `DadosFiscais` table. All the data in the column will be lost.
  - You are about to drop the column `dataProposta` on the `Proposta` table. All the data in the column will be lost.
  - You are about to drop the column `valorTotal` on the `Proposta` table. All the data in the column will be lost.
  - You are about to drop the `ItemDeVenda` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[fornecedorId]` on the table `DadosFinanceiros` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[codigo]` on the table `Proposta` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `registro` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Made the column `empresaId` on table `DadosFiscais` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `registro` to the `Fornecedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codigo` to the `Proposta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titulo` to the `Proposta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Proposta` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DadosFiscais" DROP CONSTRAINT "DadosFiscais_clienteId_fkey";

-- DropForeignKey
ALTER TABLE "DadosFiscais" DROP CONSTRAINT "DadosFiscais_fornecedorId_fkey";

-- DropForeignKey
ALTER TABLE "ItemDeVenda" DROP CONSTRAINT "ItemDeVenda_empresaId_fkey";

-- DropIndex
DROP INDEX "DadosFiscais_clienteId_key";

-- DropIndex
DROP INDEX "DadosFiscais_fornecedorId_key";

-- AlterTable
ALTER TABLE "Cliente" ADD COLUMN     "registro" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "DadosFinanceiros" ADD COLUMN     "fornecedorId" TEXT,
ALTER COLUMN "empresaId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "DadosFiscais" DROP COLUMN "clienteId",
DROP COLUMN "fornecedorId",
ALTER COLUMN "empresaId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Fornecedor" ADD COLUMN     "registro" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Proposta" DROP COLUMN "dataProposta",
DROP COLUMN "valorTotal",
ADD COLUMN     "codigo" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "descricao" TEXT,
ADD COLUMN     "titulo" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "ItemDeVenda";

-- CreateTable
CREATE TABLE "Produto" (
    "id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "estoque" INTEGER,
    "unidadeMedida" TEXT,
    "empresaId" TEXT NOT NULL,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Servico" (
    "id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "duracao" INTEGER,
    "empresaId" TEXT NOT NULL,

    CONSTRAINT "Servico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tarefa" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "userResponsavelId" TEXT NOT NULL,
    "userCriadorId" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "dataAgendada" TIMESTAMP(3),
    "dataExecutada" TIMESTAMP(3),
    "empresaId" TEXT NOT NULL,

    CONSTRAINT "Tarefa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VersaoProposta" (
    "id" TEXT NOT NULL,
    "propostaId" TEXT NOT NULL,
    "dataProposta" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valorTotal" TEXT NOT NULL,
    "numeroVersao" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "aprovado" BOOLEAN NOT NULL DEFAULT false,
    "executado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "VersaoProposta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProdutoProposta" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "preco" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "unidadeDeMedida" TEXT NOT NULL,
    "versaoPropostaId" TEXT,

    CONSTRAINT "ProdutoProposta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServicoProposta" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "preco" TEXT NOT NULL,
    "versaoPropostaId" TEXT,

    CONSTRAINT "ServicoProposta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VersaoProposta_propostaId_numeroVersao_key" ON "VersaoProposta"("propostaId", "numeroVersao");

-- CreateIndex
CREATE UNIQUE INDEX "DadosFinanceiros_fornecedorId_key" ON "DadosFinanceiros"("fornecedorId");

-- CreateIndex
CREATE UNIQUE INDEX "Proposta_codigo_key" ON "Proposta"("codigo");

-- AddForeignKey
ALTER TABLE "DadosFinanceiros" ADD CONSTRAINT "DadosFinanceiros_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "Fornecedor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Servico" ADD CONSTRAINT "Servico_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarefa" ADD CONSTRAINT "Tarefa_userResponsavelId_fkey" FOREIGN KEY ("userResponsavelId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarefa" ADD CONSTRAINT "Tarefa_userCriadorId_fkey" FOREIGN KEY ("userCriadorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarefa" ADD CONSTRAINT "Tarefa_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VersaoProposta" ADD CONSTRAINT "VersaoProposta_propostaId_fkey" FOREIGN KEY ("propostaId") REFERENCES "Proposta"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProdutoProposta" ADD CONSTRAINT "ProdutoProposta_versaoPropostaId_fkey" FOREIGN KEY ("versaoPropostaId") REFERENCES "VersaoProposta"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicoProposta" ADD CONSTRAINT "ServicoProposta_versaoPropostaId_fkey" FOREIGN KEY ("versaoPropostaId") REFERENCES "VersaoProposta"("id") ON DELETE CASCADE ON UPDATE CASCADE;
