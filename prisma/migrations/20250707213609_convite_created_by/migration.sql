/*
  Warnings:

  - Added the required column `created_by` to the `Convite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Convite" ADD COLUMN     "created_by" TEXT NOT NULL;
