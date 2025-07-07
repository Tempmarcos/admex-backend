/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `Convite` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Convite_token_key" ON "Convite"("token");
