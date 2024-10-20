/*
  Warnings:

  - A unique constraint covering the columns `[contentId]` on the table `MeetupDescription` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contentId]` on the table `MeetupEmail` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contentId]` on the table `MeetupImage` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contentId]` on the table `MeetupLongMessage` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contentId]` on the table `MeetupShortMessage` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contentId]` on the table `PostEventMessage` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MeetupDescription_contentId_key" ON "MeetupDescription"("contentId");

-- CreateIndex
CREATE UNIQUE INDEX "MeetupEmail_contentId_key" ON "MeetupEmail"("contentId");

-- CreateIndex
CREATE UNIQUE INDEX "MeetupImage_contentId_key" ON "MeetupImage"("contentId");

-- CreateIndex
CREATE UNIQUE INDEX "MeetupLongMessage_contentId_key" ON "MeetupLongMessage"("contentId");

-- CreateIndex
CREATE UNIQUE INDEX "MeetupShortMessage_contentId_key" ON "MeetupShortMessage"("contentId");

-- CreateIndex
CREATE UNIQUE INDEX "PostEventMessage_contentId_key" ON "PostEventMessage"("contentId");
