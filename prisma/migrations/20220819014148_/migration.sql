/*
  Warnings:

  - You are about to drop the column `state_name` on the `tb_estado` table. All the data in the column will be lost.
  - You are about to drop the column `personType_name` on the `tb_pessoa_tipo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[TB_ESTADO_NOME]` on the table `TB_ESTADO` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[TB_PESSOA_TIPO_NOME]` on the table `TB_PESSOA_TIPO` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `TB_ESTADO_NOME` to the `TB_ESTADO` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TB_PESSOA_TIPO_NOME` to the `TB_PESSOA_TIPO` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `TB_ESTADO_NOME` ON `tb_estado`;

-- DropIndex
DROP INDEX `TB_PESSOA_TIPO_NOME` ON `tb_pessoa_tipo`;

-- AlterTable
ALTER TABLE `tb_estado` DROP COLUMN `state_name`,
    ADD COLUMN `TB_ESTADO_NOME` CHAR(2) NOT NULL;

-- AlterTable
ALTER TABLE `tb_pessoa` MODIFY `TB_PESSOA_CEP` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `tb_pessoa_tipo` DROP COLUMN `personType_name`,
    ADD COLUMN `TB_PESSOA_TIPO_NOME` VARCHAR(16) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `TB_ESTADO_NOME` ON `TB_ESTADO`(`TB_ESTADO_NOME`);

-- CreateIndex
CREATE UNIQUE INDEX `TB_PESSOA_TIPO_NOME` ON `TB_PESSOA_TIPO`(`TB_PESSOA_TIPO_NOME`);
