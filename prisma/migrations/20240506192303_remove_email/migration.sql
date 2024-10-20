/*
  Warnings:

  - You are about to drop the column `email` on the `MeetupContent` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "MeetupContent_email_key";

-- AlterTable
ALTER TABLE "MeetupContent" DROP COLUMN "email";
