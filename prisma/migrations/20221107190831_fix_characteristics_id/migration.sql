/*
  Warnings:

  - You are about to alter the column `TB_CARACTERISTICA_ID_FK` on the `tb_carac_desa` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `tb_caracteristica` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `TB_CARACTERISTICA_ID` on the `tb_caracteristica` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `tb_carac_desa` DROP FOREIGN KEY `TB_CARAC_DESA_ID_TB_CARACTERISTICA_FK`;

-- AlterTable
ALTER TABLE `tb_carac_desa` MODIFY `TB_CARACTERISTICA_ID_FK` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `tb_caracteristica` DROP PRIMARY KEY,
    MODIFY `TB_CARACTERISTICA_ID` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`TB_CARACTERISTICA_ID`);

-- AddForeignKey
ALTER TABLE `TB_CARAC_DESA` ADD CONSTRAINT `TB_CARAC_DESA_ID_TB_CARACTERISTICA_FK` FOREIGN KEY (`TB_CARACTERISTICA_ID_FK`) REFERENCES `TB_CARACTERISTICA`(`TB_CARACTERISTICA_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
