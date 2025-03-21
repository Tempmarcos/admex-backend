/*
  Warnings:

  - You are about to drop the column `fone` on the `Contato` table. All the data in the column will be lost.
  - You are about to drop the column `funcao` on the `Contato` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[clienteId]` on the table `DadosFiscais` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fornecedorId]` on the table `DadosFiscais` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clienteId]` on the table `Endereco` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fornecedorId]` on the table `Endereco` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cargo` to the `Contato` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DadosFiscais" DROP CONSTRAINT "DadosFiscais_empresaId_fkey";

-- DropForeignKey
ALTER TABLE "Endereco" DROP CONSTRAINT "Endereco_DadosGeraisId_fkey";

-- AlterTable
ALTER TABLE "Contato" DROP COLUMN "fone",
DROP COLUMN "funcao",
ADD COLUMN     "cargo" TEXT NOT NULL,
ADD COLUMN     "telefone" TEXT;

-- AlterTable
ALTER TABLE "DadosFiscais" ADD COLUMN     "clienteId" TEXT,
ADD COLUMN     "fornecedorId" TEXT,
ALTER COLUMN "empresaId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Endereco" ADD COLUMN     "clienteId" TEXT,
ADD COLUMN     "fornecedorId" TEXT,
ALTER COLUMN "DadosGeraisId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "empresaId" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "DadosFiscais_clienteId_key" ON "DadosFiscais"("clienteId");

-- CreateIndex
CREATE UNIQUE INDEX "DadosFiscais_fornecedorId_key" ON "DadosFiscais"("fornecedorId");

-- CreateIndex
CREATE UNIQUE INDEX "Endereco_clienteId_key" ON "Endereco"("clienteId");

-- CreateIndex
CREATE UNIQUE INDEX "Endereco_fornecedorId_key" ON "Endereco"("fornecedorId");

-- AddForeignKey
ALTER TABLE "Endereco" ADD CONSTRAINT "Endereco_DadosGeraisId_fkey" FOREIGN KEY ("DadosGeraisId") REFERENCES "DadosGerais"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Endereco" ADD CONSTRAINT "Endereco_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Endereco" ADD CONSTRAINT "Endereco_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "Fornecedor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DadosFiscais" ADD CONSTRAINT "DadosFiscais_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DadosFiscais" ADD CONSTRAINT "DadosFiscais_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DadosFiscais" ADD CONSTRAINT "DadosFiscais_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "Fornecedor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
