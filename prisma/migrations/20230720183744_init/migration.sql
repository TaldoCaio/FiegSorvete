-- CreateTable
CREATE TABLE "Users" (
    "user_id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "aniversario" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Cobranca" (
    "cobranca_id" SERIAL NOT NULL,
    "idCobrado" INTEGER NOT NULL,
    "datasorvete" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cobranca_pkey" PRIMARY KEY ("cobranca_id")
);

-- AddForeignKey
ALTER TABLE "Cobranca" ADD CONSTRAINT "Cobranca_idCobrado_fkey" FOREIGN KEY ("idCobrado") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
