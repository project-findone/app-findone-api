/*
  Warnings:

  - You are about to drop the column `verified` on the `tb_pessoa` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `tb_pessoa` DROP COLUMN `verified`,
    ADD COLUMN `TB_PESSOA_VERIFICADO` BOOLEAN NOT NULL DEFAULT false;
