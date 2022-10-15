/*
  Warnings:

  - You are about to alter the column `TB_PESSOA_ID_FK` on the `tb_apoia_caso` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `TB_PESSOA_ID_FK` on the `tb_carac_desa` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `TB_CASO_PESSOA_ID_FK` on the `tb_caso` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `tb_pessoa` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `TB_PESSOA_ID` on the `tb_pessoa` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `TB_PESSOA_RESPONSAVEL_FK` on the `tb_pessoa` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `tb_apoia_caso` DROP FOREIGN KEY `TB_APOIA_CASO_ID_TB_PESSOA_FK`;

-- DropForeignKey
ALTER TABLE `tb_carac_desa` DROP FOREIGN KEY `TB_CARAC_DESA_ID_TB_PESSOA_FK`;

-- DropForeignKey
ALTER TABLE `tb_caso` DROP FOREIGN KEY `TB_CASO_ID_TB_PESSOA_FK`;

-- DropForeignKey
ALTER TABLE `tb_pessoa` DROP FOREIGN KEY `TB_PESSOA_ID_TB_PESSOA_RESPONSAVEL_FK`;

-- AlterTable
ALTER TABLE `tb_apoia_caso` MODIFY `TB_PESSOA_ID_FK` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `tb_carac_desa` MODIFY `TB_PESSOA_ID_FK` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `tb_caso` MODIFY `TB_CASO_PESSOA_ID_FK` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `tb_pessoa` DROP PRIMARY KEY,
    MODIFY `TB_PESSOA_ID` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `TB_PESSOA_RESPONSAVEL_FK` INTEGER NULL,
    ADD PRIMARY KEY (`TB_PESSOA_ID`);

-- AddForeignKey
ALTER TABLE `TB_PESSOA` ADD CONSTRAINT `TB_PESSOA_ID_TB_PESSOA_RESPONSAVEL_FK` FOREIGN KEY (`TB_PESSOA_RESPONSAVEL_FK`) REFERENCES `TB_PESSOA`(`TB_PESSOA_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TB_CARAC_DESA` ADD CONSTRAINT `TB_CARAC_DESA_ID_TB_PESSOA_FK` FOREIGN KEY (`TB_PESSOA_ID_FK`) REFERENCES `TB_PESSOA`(`TB_PESSOA_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TB_CASO` ADD CONSTRAINT `TB_CASO_ID_TB_PESSOA_FK` FOREIGN KEY (`TB_CASO_PESSOA_ID_FK`) REFERENCES `TB_PESSOA`(`TB_PESSOA_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TB_APOIA_CASO` ADD CONSTRAINT `TB_APOIA_CASO_ID_TB_PESSOA_FK` FOREIGN KEY (`TB_PESSOA_ID_FK`) REFERENCES `TB_PESSOA`(`TB_PESSOA_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
