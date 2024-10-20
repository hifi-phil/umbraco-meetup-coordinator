/*
  Warnings:

  - You are about to drop the column `imagePrompt` on the `MeetupContent` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `MeetupContent` table. All the data in the column will be lost.
  - You are about to drop the column `longMessages` on the `MeetupContent` table. All the data in the column will be lost.
  - You are about to drop the column `meetupDescription` on the `MeetupContent` table. All the data in the column will be lost.
  - You are about to drop the column `shortMessages` on the `MeetupContent` table. All the data in the column will be lost.
  - The `eventType` column on the `MeetupContent` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('Talks', 'Workshop', 'Discussion', 'LightningTalks');

-- AlterTable
ALTER TABLE "MeetupContent" DROP COLUMN "imagePrompt",
DROP COLUMN "imageUrl",
DROP COLUMN "longMessages",
DROP COLUMN "meetupDescription",
DROP COLUMN "shortMessages",
ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "date" DROP NOT NULL,
ALTER COLUMN "host" DROP NOT NULL,
DROP COLUMN "eventType",
ADD COLUMN     "eventType" "EventType",
ALTER COLUMN "eventDescription" DROP NOT NULL,
ALTER COLUMN "meetupRSVPUrl" DROP NOT NULL;

-- CreateTable
CREATE TABLE "MeetupDescription" (
    "id" SERIAL NOT NULL,
    "contentId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "MeetupDescription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeetupImage" (
    "id" SERIAL NOT NULL,
    "contentId" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "imagePrompt" TEXT NOT NULL,

    CONSTRAINT "MeetupImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeetupEmail" (
    "id" SERIAL NOT NULL,
    "contentId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "MeetupEmail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeetupShortMessage" (
    "id" SERIAL NOT NULL,
    "contentId" INTEGER NOT NULL,
    "messages" TEXT[],

    CONSTRAINT "MeetupShortMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeetupLongMessage" (
    "id" SERIAL NOT NULL,
    "contentId" INTEGER NOT NULL,
    "messages" TEXT[],

    CONSTRAINT "MeetupLongMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostEventMessage" (
    "id" SERIAL NOT NULL,
    "contentId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "PostEventMessage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MeetupDescription" ADD CONSTRAINT "MeetupDescription_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "MeetupContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetupImage" ADD CONSTRAINT "MeetupImage_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "MeetupContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetupEmail" ADD CONSTRAINT "MeetupEmail_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "MeetupContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetupShortMessage" ADD CONSTRAINT "MeetupShortMessage_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "MeetupContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetupLongMessage" ADD CONSTRAINT "MeetupLongMessage_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "MeetupContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostEventMessage" ADD CONSTRAINT "PostEventMessage_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "MeetupContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
