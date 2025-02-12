-- DropForeignKey
ALTER TABLE "Perfil" DROP CONSTRAINT "Perfil_userId_fkey";

-- AddForeignKey
ALTER TABLE "Perfil" ADD CONSTRAINT "Perfil_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
