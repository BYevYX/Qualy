/*
  Warnings:

  - The primary key for the `twoFactorToken` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "twoFactorToken_email_key";

-- AlterTable
ALTER TABLE "twoFactorToken" DROP CONSTRAINT "twoFactorToken_pkey",
ADD CONSTRAINT "twoFactorToken_pkey" PRIMARY KEY ("email");
