-- CreateTable
CREATE TABLE "resetPasswordToken" (
    "email" VARCHAR(100) NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "resetPasswordToken_pkey" PRIMARY KEY ("token")
);

-- CreateIndex
CREATE UNIQUE INDEX "resetPasswordToken_email_key" ON "resetPasswordToken"("email");
