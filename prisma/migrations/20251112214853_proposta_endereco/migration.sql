-- AlterTable
ALTER TABLE "ItemProposta" ADD COLUMN     "unidadeDeMedida" TEXT NOT NULL DEFAULT 'Unid';

-- AlterTable
ALTER TABLE "Proposta" ADD COLUMN     "endereco" TEXT,
ADD COLUMN     "tituloProjeto" TEXT;
