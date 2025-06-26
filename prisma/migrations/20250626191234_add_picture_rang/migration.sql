/*
  Warnings:

  - Added the required column `rang` to the `pictures` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pictures" ADD COLUMN     "rang" VARCHAR(30) NOT NULL;

-- CreateTable
CREATE TABLE "pictureRangCatalog" (
    "rang" VARCHAR(30) NOT NULL,

    CONSTRAINT "pictureRangCatalog_pkey" PRIMARY KEY ("rang")
);

-- AddForeignKey
ALTER TABLE "pictures" ADD CONSTRAINT "pictures_rang_fkey" FOREIGN KEY ("rang") REFERENCES "pictureRangCatalog"("rang") ON DELETE RESTRICT ON UPDATE CASCADE;
