-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'admin');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "firstname" VARCHAR(255) NOT NULL,
    "lastname" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" VARCHAR NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'user',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_phone_key" ON "Users"("phone");
