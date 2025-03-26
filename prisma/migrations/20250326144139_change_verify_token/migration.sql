/*
  Warnings:

  - The primary key for the `verificationToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `identifier` on the `verificationToken` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `verificationToken` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `verificationToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "verificationToken" DROP CONSTRAINT "verificationToken_pkey",
DROP COLUMN "identifier",
ADD COLUMN     "email" VARCHAR(100) NOT NULL,
ADD CONSTRAINT "verificationToken_pkey" PRIMARY KEY ("token");

-- CreateIndex
CREATE UNIQUE INDEX "verificationToken_email_key" ON "verificationToken"("email");
