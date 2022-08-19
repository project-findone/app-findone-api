/*
  Warnings:

  - You are about to drop the column `TB_ESTADO_ID_FK` on the `tb_pessoa` table. All the data in the column will be lost.
  - You are about to drop the column `TB_PESSOA_CARACTERISTICA_AD` on the `tb_pessoa` table. All the data in the column will be lost.
  - You are about to drop the column `TB_PESSOA_DEFIENCIA` on the `tb_pessoa` table. All the data in the column will be lost.
  - You are about to alter the column `TB_PESSOA_IMAGEM` on the `tb_pessoa` table. The data in that column could be lost. The data in that column will be cast from `Blob` to `VarChar(191)`.
  - You are about to drop the column `TB_PESSOA_TIPO_NOME` on the `tb_pessoa_tipo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[personType_name]` on the table `TB_PESSOA_TIPO` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `TB_PESSOA_ESTADO_ID_FK` to the `TB_PESSOA` table without a default value. This is not possible if the table is not empty.
  - Made the column `TB_PESSOA_CEP` on table `tb_pessoa` required. This step will fail if there are existing NULL values in that column.
  - Made the column `TB_PESSOA_CIDADE` on table `tb_pessoa` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `personType_name` to the `TB_PESSOA_TIPO` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tb_pessoa` DROP FOREIGN KEY `tb_pessoa_ibfk_1`;

-- DropIndex
DROP INDEX `TB_PESSOA_TIPO_NOME` ON `tb_pessoa_tipo`;

-- AlterTable
ALTER TABLE `tb_pessoa` DROP COLUMN `TB_ESTADO_ID_FK`,
    DROP COLUMN `TB_PESSOA_CARACTERISTICA_AD`,
    DROP COLUMN `TB_PESSOA_DEFIENCIA`,
    ADD COLUMN `TB_PESSOA_DEFICIENCIA` VARCHAR(128) NULL,
    ADD COLUMN `TB_PESSOA_ESTADO_ID_FK` INTEGER NOT NULL,
    MODIFY `TB_PESSOA_DATA_NASC` DATE NULL,
    MODIFY `TB_PESSOA_EMAIL` VARCHAR(128) NULL,
    MODIFY `TB_PESSOA_CEP` INTEGER NOT NULL,
    MODIFY `TB_PESSOA_CIDADE` VARCHAR(64) NOT NULL,
    MODIFY `TB_PESSOA_IMAGEM` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `tb_pessoa_tipo` DROP COLUMN `TB_PESSOA_TIPO_NOME`,
    ADD COLUMN `personType_name` VARCHAR(16) NOT NULL;

-- CreateTable
CREATE TABLE `TB_ESTADO` (
    `TB_ESTADO_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `state_name` CHAR(2) NOT NULL,

    UNIQUE INDEX `TB_ESTADO_NOME`(`state_name`),
    PRIMARY KEY (`TB_ESTADO_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `TB_PESSOA_TIPO_NOME` ON `TB_PESSOA_TIPO`(`personType_name`);

-- AddForeignKey
ALTER TABLE `TB_PESSOA` ADD CONSTRAINT `TB_PESSOA_ID_TB_PESSOA_TIPO_FK` FOREIGN KEY (`TB_PESSOA_TIPO_ID_FK`) REFERENCES `TB_PESSOA_TIPO`(`TB_PESSOA_TIPO_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TB_PESSOA` ADD CONSTRAINT `TB_PESSOA_ID_TB_ESTADO_FK` FOREIGN KEY (`TB_PESSOA_ESTADO_ID_FK`) REFERENCES `TB_ESTADO`(`TB_ESTADO_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
