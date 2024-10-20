/*
  Warnings:

  - You are about to drop the column `description` on the `MeetupDescription` table. All the data in the column will be lost.
  - Added the required column `text` to the `MeetupDescription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MeetupDescription" DROP COLUMN "description",
ADD COLUMN     "text" TEXT NOT NULL;
