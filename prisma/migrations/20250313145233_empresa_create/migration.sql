/*
  Warnings:

  - A unique constraint covering the columns `[empresaId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "admin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "empresaId" TEXT NOT NULL DEFAULT 'oi';

-- CreateTable
CREATE TABLE "Empresa" (
    "id" TEXT NOT NULL,
    "ativa" BOOLEAN NOT NULL,
    "dataCadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DadosGerais" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "dataDeFundacao" TIMESTAMP(3) NOT NULL,
    "logo" TEXT,
    "empresaId" TEXT NOT NULL,

    CONSTRAINT "DadosGerais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Endereco" (
    "id" TEXT NOT NULL,
    "DadosGeraisId" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "dados" JSONB NOT NULL,

    CONSTRAINT "Endereco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contato" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "funcao" TEXT NOT NULL,
    "email" TEXT,
    "fone" TEXT,
    "ClienteId" TEXT,
    "FornecedorId" TEXT,

    CONSTRAINT "Contato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DadosFiscais" (
    "id" TEXT NOT NULL,
    "registro" TEXT NOT NULL,
    "classificacao" TEXT NOT NULL,
    "camposEspecificos" JSONB,
    "empresaId" TEXT NOT NULL,

    CONSTRAINT "DadosFiscais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DadosFinanceiros" (
    "id" TEXT NOT NULL,
    "contaBancaria" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,

    CONSTRAINT "DadosFinanceiros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fornecedor" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,

    CONSTRAINT "Fornecedor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemDeVenda" (
    "id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "empresaId" TEXT NOT NULL,

    CONSTRAINT "ItemDeVenda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proposta" (
    "id" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "dataProposta" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valorTotal" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,

    CONSTRAINT "Proposta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DadosGerais_empresaId_key" ON "DadosGerais"("empresaId");

-- CreateIndex
CREATE UNIQUE INDEX "Endereco_DadosGeraisId_key" ON "Endereco"("DadosGeraisId");

-- CreateIndex
CREATE UNIQUE INDEX "Contato_ClienteId_key" ON "Contato"("ClienteId");

-- CreateIndex
CREATE UNIQUE INDEX "Contato_FornecedorId_key" ON "Contato"("FornecedorId");

-- CreateIndex
CREATE UNIQUE INDEX "DadosFiscais_registro_key" ON "DadosFiscais"("registro");

-- CreateIndex
CREATE UNIQUE INDEX "DadosFiscais_empresaId_key" ON "DadosFiscais"("empresaId");

-- CreateIndex
CREATE UNIQUE INDEX "DadosFinanceiros_empresaId_key" ON "DadosFinanceiros"("empresaId");

-- CreateIndex
CREATE UNIQUE INDEX "User_empresaId_key" ON "User"("empresaId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DadosGerais" ADD CONSTRAINT "DadosGerais_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Endereco" ADD CONSTRAINT "Endereco_DadosGeraisId_fkey" FOREIGN KEY ("DadosGeraisId") REFERENCES "DadosGerais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contato" ADD CONSTRAINT "Contato_ClienteId_fkey" FOREIGN KEY ("ClienteId") REFERENCES "Cliente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contato" ADD CONSTRAINT "Contato_FornecedorId_fkey" FOREIGN KEY ("FornecedorId") REFERENCES "Fornecedor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DadosFiscais" ADD CONSTRAINT "DadosFiscais_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DadosFinanceiros" ADD CONSTRAINT "DadosFinanceiros_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fornecedor" ADD CONSTRAINT "Fornecedor_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemDeVenda" ADD CONSTRAINT "ItemDeVenda_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposta" ADD CONSTRAINT "Proposta_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposta" ADD CONSTRAINT "Proposta_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
