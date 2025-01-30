-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "permissoes" TEXT[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Perfil" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "foto" TEXT,
    "nomeDeUsuario" TEXT NOT NULL,
    "tema" TEXT NOT NULL DEFAULT 'default',
    "fonte" INTEGER NOT NULL DEFAULT 9,

    CONSTRAINT "Perfil_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Perfil_userId_key" ON "Perfil"("userId");

-- AddForeignKey
ALTER TABLE "Perfil" ADD CONSTRAINT "Perfil_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
