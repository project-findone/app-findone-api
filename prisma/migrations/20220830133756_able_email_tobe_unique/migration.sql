/*
  Warnings:

  - A unique constraint covering the columns `[TB_PESSOA_EMAIL]` on the table `TB_PESSOA` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `TB_PESSOA_TB_PESSOA_EMAIL_key` ON `TB_PESSOA`(`TB_PESSOA_EMAIL`);
