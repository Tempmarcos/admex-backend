-- AlterTable
ALTER TABLE "public"."Cliente" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."Fornecedor" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."Produto" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."Servico" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "public"."_FornecedorToProduto" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FornecedorToProduto_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_FornecedorToServico" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FornecedorToServico_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_FornecedorToProduto_B_index" ON "public"."_FornecedorToProduto"("B");

-- CreateIndex
CREATE INDEX "_FornecedorToServico_B_index" ON "public"."_FornecedorToServico"("B");

-- AddForeignKey
ALTER TABLE "public"."_FornecedorToProduto" ADD CONSTRAINT "_FornecedorToProduto_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Fornecedor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FornecedorToProduto" ADD CONSTRAINT "_FornecedorToProduto_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Produto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FornecedorToServico" ADD CONSTRAINT "_FornecedorToServico_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Fornecedor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FornecedorToServico" ADD CONSTRAINT "_FornecedorToServico_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Servico"("id") ON DELETE CASCADE ON UPDATE CASCADE;
