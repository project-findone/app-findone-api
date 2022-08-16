/*
  Warnings:

  - You are about to drop the column `ESTADO_ID_FK` on the `tb_pessoa` table. All the data in the column will be lost.
  - You are about to drop the column `PESSOA_RESPONSAVEL_FK` on the `tb_pessoa` table. All the data in the column will be lost.
  - You are about to drop the column `PESSOA_TIPO_ID_FK` on the `tb_pessoa` table. All the data in the column will be lost.
  - Added the required column `TB_PESSOA_TIPO_ID_FK` to the `tb_pessoa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tb_pessoa` DROP FOREIGN KEY `tb_pessoa_ibfk_1`;

-- DropForeignKey
ALTER TABLE `tb_pessoa` DROP FOREIGN KEY `tb_pessoa_ibfk_2`;

-- DropForeignKey
ALTER TABLE `tb_pessoa` DROP FOREIGN KEY `tb_pessoa_ibfk_3`;

-- AlterTable
ALTER TABLE `tb_pessoa` DROP COLUMN `ESTADO_ID_FK`,
    DROP COLUMN `PESSOA_RESPONSAVEL_FK`,
    DROP COLUMN `PESSOA_TIPO_ID_FK`,
    ADD COLUMN `TB_ESTADO_ID_FK` INTEGER NULL,
    ADD COLUMN `TB_PESSOA_RESPONSAVEL_FK` INTEGER NULL,
    ADD COLUMN `TB_PESSOA_TIPO_ID_FK` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `TB_ESTADO_ID_FK` ON `tb_pessoa`(`TB_ESTADO_ID_FK`);

-- CreateIndex
CREATE INDEX `TB_PESSOA_RESPONSAVEL_FK` ON `tb_pessoa`(`TB_PESSOA_RESPONSAVEL_FK`);

-- CreateIndex
CREATE INDEX `TB_PESSOA_TIPO_ID_FK` ON `tb_pessoa`(`TB_PESSOA_TIPO_ID_FK`);

-- AddForeignKey
ALTER TABLE `tb_pessoa` ADD CONSTRAINT `tb_pessoa_ibfk_1` FOREIGN KEY (`TB_PESSOA_TIPO_ID_FK`) REFERENCES `tb_pessoa_tipo`(`TB_PESSOA_TIPO_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tb_pessoa` ADD CONSTRAINT `tb_pessoa_ibfk_2` FOREIGN KEY (`TB_ESTADO_ID_FK`) REFERENCES `tb_estado`(`TB_ESTADO_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tb_pessoa` ADD CONSTRAINT `tb_pessoa_ibfk_3` FOREIGN KEY (`TB_PESSOA_RESPONSAVEL_FK`) REFERENCES `tb_pessoa`(`TB_PESSOA_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
