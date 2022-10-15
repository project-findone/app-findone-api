/*
  Warnings:

  - You are about to drop the column `TB_CARACTERISTICA_TIPO_ID_FK` on the `tb_caracteristica` table. All the data in the column will be lost.
  - You are about to drop the column `TB_CASO_ESTADO_ID_FK` on the `tb_caso` table. All the data in the column will be lost.
  - You are about to drop the column `TB_PESSOA_ESTADO_ID_FK` on the `tb_pessoa` table. All the data in the column will be lost.
  - You are about to drop the `tb_estado` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `TB_CARACTERISTICA_TIPO_NOME_FK` to the `TB_CARACTERISTICA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TB_CASO_ESTADO` to the `TB_CASO` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TB_CASO_LATITUDE` to the `TB_CASO` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TB_CASO_LONGITUDE` to the `TB_CASO` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TB_PESSOA_ESTADO` to the `TB_PESSOA` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tb_caracteristica` DROP FOREIGN KEY `TB_CARACTERISTICA_ID_TB_CARACTERISTICA_TIPO_FK`;

-- DropForeignKey
ALTER TABLE `tb_caso` DROP FOREIGN KEY `TB_CASO_ID_TB_ESTADO_FK`;

-- DropForeignKey
ALTER TABLE `tb_pessoa` DROP FOREIGN KEY `TB_PESSOA_ID_TB_ESTADO_FK`;

-- AlterTable
ALTER TABLE `tb_caracteristica` DROP COLUMN `TB_CARACTERISTICA_TIPO_ID_FK`,
    ADD COLUMN `TB_CARACTERISTICA_TIPO_NOME_FK` VARCHAR(16) NOT NULL;

-- AlterTable
ALTER TABLE `tb_caso` DROP COLUMN `TB_CASO_ESTADO_ID_FK`,
    ADD COLUMN `TB_CASO_ESTADO` CHAR(2) NOT NULL,
    ADD COLUMN `TB_CASO_LATITUDE` VARCHAR(191) NOT NULL,
    ADD COLUMN `TB_CASO_LONGITUDE` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `tb_pessoa` DROP COLUMN `TB_PESSOA_ESTADO_ID_FK`,
    ADD COLUMN `TB_PESSOA_ESTADO` CHAR(2) NOT NULL;

-- DropTable
DROP TABLE `tb_estado`;

-- AddForeignKey
ALTER TABLE `TB_CARACTERISTICA` ADD CONSTRAINT `TB_CARACTERISTICA_ID_TB_CARACTERISTICA_TIPO_FK` FOREIGN KEY (`TB_CARACTERISTICA_TIPO_NOME_FK`) REFERENCES `TB_CARACTERISTICA_TIPO`(`TB_CARACTERISTICA_TIPO_NOME`) ON DELETE NO ACTION ON UPDATE NO ACTION;
