/*
  Warnings:

  - Made the column `datasorvete` on table `Cobranca` required. This step will fail if there are existing NULL values in that column.
  - Made the column `aniversario` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Cobranca" ALTER COLUMN "datasorvete" SET NOT NULL,
ALTER COLUMN "datasorvete" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "aniversario" SET NOT NULL,
ALTER COLUMN "aniversario" SET DATA TYPE TEXT;
