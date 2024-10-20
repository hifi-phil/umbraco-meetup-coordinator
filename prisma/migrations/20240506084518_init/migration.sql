-- CreateTable
CREATE TABLE "MeetupTalk" (
    "id" SERIAL NOT NULL,
    "contentId" INTEGER NOT NULL,
    "speakerName" TEXT NOT NULL,
    "speakerCompany" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "MeetupTalk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeetupContent" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "host" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "eventDescription" TEXT NOT NULL,
    "meetupDescription" TEXT NOT NULL,
    "meetupRSVPUrl" TEXT NOT NULL,
    "imagePrompt" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "shortMessages" TEXT[],
    "longMessages" TEXT[],

    CONSTRAINT "MeetupContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MeetupContent_email_key" ON "MeetupContent"("email");

-- AddForeignKey
ALTER TABLE "MeetupTalk" ADD CONSTRAINT "MeetupTalk_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "MeetupContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
