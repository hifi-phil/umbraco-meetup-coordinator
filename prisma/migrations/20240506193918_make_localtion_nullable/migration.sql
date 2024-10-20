/*
  Warnings:

  - Made the column `location` on table `MeetupContent` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "MeetupContent" ALTER COLUMN "location" SET NOT NULL,
ALTER COLUMN "imagePrompt" DROP NOT NULL;
