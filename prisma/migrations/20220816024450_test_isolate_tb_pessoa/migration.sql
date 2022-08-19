/*
  Warnings:

  - You are about to drop the `tb_anexo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_apoia_caso` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_carac_desa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_caracteristica` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_caracteristica_tipo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_caso` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_caso_tipo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_categoria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_certificado` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_contribuicao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_estado` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_mensagem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_sessao_chat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_status` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `TB_PESSOA_SOBRENOME` on table `tb_pessoa` required. This step will fail if there are existing NULL values in that column.
  - Made the column `TB_PESSOA_DATA_NASC` on table `tb_pessoa` required. This step will fail if there are existing NULL values in that column.
  - Made the column `TB_PESSOA_EMAIL` on table `tb_pessoa` required. This step will fail if there are existing NULL values in that column.
  - Made the column `TB_PESSOA_TIPO_ID_FK` on table `tb_pessoa` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `tb_anexo` DROP FOREIGN KEY `tb_anexo_ibfk_1`;

-- DropForeignKey
ALTER TABLE `tb_apoia_caso` DROP FOREIGN KEY `tb_apoia_caso_ibfk_1`;

-- DropForeignKey
ALTER TABLE `tb_apoia_caso` DROP FOREIGN KEY `tb_apoia_caso_ibfk_2`;

-- DropForeignKey
ALTER TABLE `tb_carac_desa` DROP FOREIGN KEY `tb_carac_desa_ibfk_1`;

-- DropForeignKey
ALTER TABLE `tb_carac_desa` DROP FOREIGN KEY `tb_carac_desa_ibfk_2`;

-- DropForeignKey
ALTER TABLE `tb_caracteristica` DROP FOREIGN KEY `tb_caracteristica_ibfk_1`;

-- DropForeignKey
ALTER TABLE `tb_caso` DROP FOREIGN KEY `tb_caso_ibfk_1`;

-- DropForeignKey
ALTER TABLE `tb_caso` DROP FOREIGN KEY `tb_caso_ibfk_2`;

-- DropForeignKey
ALTER TABLE `tb_caso` DROP FOREIGN KEY `tb_caso_ibfk_3`;

-- DropForeignKey
ALTER TABLE `tb_caso` DROP FOREIGN KEY `tb_caso_ibfk_4`;

-- DropForeignKey
ALTER TABLE `tb_certificado` DROP FOREIGN KEY `tb_certificado_ibfk_1`;

-- DropForeignKey
ALTER TABLE `tb_contribuicao` DROP FOREIGN KEY `tb_contribuicao_ibfk_1`;

-- DropForeignKey
ALTER TABLE `tb_contribuicao` DROP FOREIGN KEY `tb_contribuicao_ibfk_2`;

-- DropForeignKey
ALTER TABLE `tb_mensagem` DROP FOREIGN KEY `tb_mensagem_ibfk_1`;

-- DropForeignKey
ALTER TABLE `tb_pessoa` DROP FOREIGN KEY `tb_pessoa_ibfk_1`;

-- DropForeignKey
ALTER TABLE `tb_pessoa` DROP FOREIGN KEY `tb_pessoa_ibfk_2`;

-- DropForeignKey
ALTER TABLE `tb_pessoa` DROP FOREIGN KEY `tb_pessoa_ibfk_3`;

-- DropForeignKey
ALTER TABLE `tb_sessao_chat` DROP FOREIGN KEY `tb_sessao_chat_ibfk_1`;

-- AlterTable
ALTER TABLE `tb_pessoa` MODIFY `TB_PESSOA_SOBRENOME` VARCHAR(64) NOT NULL,
    MODIFY `TB_PESSOA_DATA_NASC` DATE NOT NULL,
    MODIFY `TB_PESSOA_CPF` VARCHAR(191) NULL,
    MODIFY `TB_PESSOA_EMAIL` VARCHAR(128) NOT NULL,
    MODIFY `TB_PESSOA_TIPO_ID_FK` INTEGER NOT NULL;

-- DropTable
DROP TABLE `tb_anexo`;

-- DropTable
DROP TABLE `tb_apoia_caso`;

-- DropTable
DROP TABLE `tb_carac_desa`;

-- DropTable
DROP TABLE `tb_caracteristica`;

-- DropTable
DROP TABLE `tb_caracteristica_tipo`;

-- DropTable
DROP TABLE `tb_caso`;

-- DropTable
DROP TABLE `tb_caso_tipo`;

-- DropTable
DROP TABLE `tb_categoria`;

-- DropTable
DROP TABLE `tb_certificado`;

-- DropTable
DROP TABLE `tb_contribuicao`;

-- DropTable
DROP TABLE `tb_estado`;

-- DropTable
DROP TABLE `tb_mensagem`;

-- DropTable
DROP TABLE `tb_sessao_chat`;

-- DropTable
DROP TABLE `tb_status`;

-- AddForeignKey
ALTER TABLE `tb_pessoa` ADD CONSTRAINT `tb_pessoa_ibfk_1` FOREIGN KEY (`TB_PESSOA_TIPO_ID_FK`) REFERENCES `tb_pessoa_tipo`(`TB_PESSOA_TIPO_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
