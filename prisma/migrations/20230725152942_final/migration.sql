/*
  Warnings:

  - Added the required column `statusCobranca` to the `Cobranca` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cobranca" ADD COLUMN     "statusCobranca" TEXT NOT NULL;
