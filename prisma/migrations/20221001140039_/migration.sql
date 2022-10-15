/*
  Warnings:

  - You are about to drop the column `TB_CASO_DAT_TERMINO` on the `tb_caso` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `tb_caso` DROP COLUMN `TB_CASO_DAT_TERMINO`,
    ADD COLUMN `TB_CASO_DATA_TERMINO` DATETIME(3) NULL;
