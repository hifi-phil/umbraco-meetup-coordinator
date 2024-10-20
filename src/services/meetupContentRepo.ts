"use server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { MeetupContent } from "@/data/meetupContent";

export const saveMeetupContent = async (meetupContent: MeetupContent) => {

    const meetupContentData = {
        location : meetupContent.location,
        date: meetupContent.date,
        host: meetupContent.host,
        eventType: meetupContent.eventType,
        eventDescription: meetupContent.eventDescription,
        updatedAt: new Date(),
        talks: {
            create: meetupContent.talks.map(talk => ({
              speakerName: talk.speakerName,
              speakerCompany: talk.speakerCompany,
              title: talk.title,
              description: talk.description,
            })),
        },
        descriptions: {
            create: meetupContent.descriptions.map(description => ({
                text: description.text,
            })),
        },
        images: {
            create: meetupContent.images.map(image => ({
              imageUrl: image.imageUrl,
              imagePrompt: image.imagePrompt,
            })),
        },
        shortMessages: {
            create: meetupContent.shortMessages.map(shortMessage => ({
              messages: shortMessage.messages,
            })),
         },
        longMessages: {
            create: meetupContent.longMessages.map(longMessage => ({
              messages: longMessage.messages,
            })),
         },
        followUpEmails: {
            create: meetupContent.followUpEmails.map(email => ({
              message: email.message,
            })),
        },
        postEventMessages: {
            create: meetupContent.postEventMessages.map(postEventMessage => ({
              message: postEventMessage.message,
            })),
        }
    }      

    try {
        const createRecord = await prisma.meetupContent.create({
            data: meetupContentData
        })
        console.log("Record created:", createRecord);
    }
    catch (error) {
        console.error("Error creating record:", error);
    }
}

export const updateMeetupContent = async (meetupContent: MeetupContent) => {
    
  if (!meetupContent.id) {
    console.error("MeetupContent ID is required for update");
    return;
  }

  const meetupContentData: Prisma.MeetupContentUpdateInput = {
    location: meetupContent.location,
    date: meetupContent.date,
    host: meetupContent.host,
    eventType: meetupContent.eventType,
    eventDescription: meetupContent.eventDescription,
    meetupRSVPUrl: meetupContent.meetupRSVPUrl,
    updatedAt: new Date(),
  };

  try {
    // Update the main meetupContent record
    const updateRecord = await prisma.meetupContent.update({
      where: { id: meetupContent.id },
      data: meetupContentData,
    });

    // Update talks
    await Promise.all(meetupContent.talks.map(async talk => {
      if (talk.id) {
        await prisma.meetupTalk.update({
          where: { id: talk.id },
          data: {
            speakerName: talk.speakerName,
            speakerCompany: talk.speakerCompany,
            title: talk.title,
            description: talk.description,
          },
        });
      } else {
        await prisma.meetupTalk.create({
          data: {
            speakerName: talk.speakerName,
            speakerCompany: talk.speakerCompany,
            title: talk.title,
            description: talk.description,
            contentId: meetupContent.id,
          },
        });
      }
    }));

    // Update descriptions
    await Promise.all(meetupContent.descriptions.map(async description => {
      console.log(description.id)
      if (description.id) {
        await prisma.meetupDescription.update({
          where: { id: description.id },
          data: { text: description.text },
        });
      } else {
        await prisma.meetupDescription.create({
          data: {
            text: description.text,
            contentId: meetupContent.id,
          },
        });
      }
    }));

    // Update images
    await Promise.all(meetupContent.images.map(async image => {
      if (image.id) {
        await prisma.meetupImage.update({
          where: { id: image.id },
          data: {
            imageUrl: image.imageUrl,
            imagePrompt: image.imagePrompt,
          },
        });
      } else {
        await prisma.meetupImage.create({
          data: {
            imageUrl: image.imageUrl,
            imagePrompt: image.imagePrompt,
            contentId: meetupContent.id,
          },
        });
      }
    }));

    // Update shortMessages
    await Promise.all(meetupContent.shortMessages.map(async shortMessage => {
      if (shortMessage.id) {
        await prisma.meetupShortMessage.update({
          where: { id: shortMessage.id },
          data: { messages: shortMessage.messages },
        });
      } else {
        await prisma.meetupShortMessage.create({
          data: {
            messages: shortMessage.messages,
            contentId: meetupContent.id,
          },
        });
      }
    }));

    // Update longMessages
    await Promise.all(meetupContent.longMessages.map(async longMessage => {
      if (longMessage.id) {
        await prisma.meetupLongMessage.update({
          where: { id: longMessage.id },
          data: { messages: longMessage.messages },
        });
      } else {
        await prisma.meetupLongMessage.create({
          data: {
            messages: longMessage.messages,
            contentId: meetupContent.id,
          },
        });
      }
    }));

    // Update followUpEmails
    await Promise.all(meetupContent.followUpEmails.map(async email => {
      if (email.id) {
        await prisma.meetupEmail.update({
          where: { id: email.id },
          data: { message: email.message },
        });
      } else {
        await prisma.meetupEmail.create({
          data: {
            message: email.message,
            contentId: meetupContent.id,
          },
        });
      }
    }));

    // Update postEventMessages
    await Promise.all(meetupContent.postEventMessages.map(async postEventMessage => {
      if (postEventMessage.id) {
        await prisma.postEventMessage.update({
          where: { id: postEventMessage.id },
          data: { message: postEventMessage.message },
        });
      } else {
        await prisma.postEventMessage.create({
          data: {
            message: postEventMessage.message,
            contentId: meetupContent.id,
          },
        });
      }
    }));

    console.log("Record updated:", updateRecord);
  } catch (error) {
    console.error("Error updating record:", error);
  }
};


export const removeMeetupContent = async (meetupContentId: number) => {

    try {

        const deletedTalks = await prisma.meetupTalk.deleteMany({
          where: { contentId: meetupContentId },
        });   
        console.log("Talks deleted:", deletedTalks);

        const deletedImages = await prisma.meetupImage.deleteMany({
          where: { contentId: meetupContentId },
        });   
        console.log("Images deleted:", deletedImages);

        const deletedLongMessages = await prisma.meetupLongMessage.deleteMany({
          where: { contentId: meetupContentId },
        });   
        console.log("Long messages deleted:", deletedLongMessages);

        const deletedShorMessages = await prisma.meetupShortMessage.deleteMany({
          where: { contentId: meetupContentId },
        });   
        console.log("Short messages deleted:", deletedShorMessages);

        const deletedDescriptions = await prisma.meetupDescription.deleteMany({
          where: { contentId: meetupContentId },
        });   
        console.log("Descriptions deleted:", deletedDescriptions);

        const deletedEmails = await prisma.meetupEmail.deleteMany({
          where: { contentId: meetupContentId },
        });   
        console.log("Emails deleted:", deletedEmails);

        const deletedPostMessageEvents = await prisma.postEventMessage.deleteMany({
          where: { contentId: meetupContentId },
        });   
        console.log("Post message messages deleted:", deletedPostMessageEvents);

        const deletedMeetup = await prisma.meetupContent.delete({
            where: { id: meetupContentId },
        });

        console.log("Meetup deleted:", deletedMeetup);
    } 
    catch (error) {
        console.error("Error deleting record:", error);
    }

}

export const getAllMeetupContents = async () => {

    try {
        return await prisma.meetupContent.findMany({
            include: {
                talks: true,
                images: true,
                descriptions: true,
                shortMessages: true,
                longMessages: true,
                followUpEmails: true,
                postEventMessages: true
            }
        }) as MeetupContent[];
    } catch (error) {
        console.error("Error fetching data:", error);
    }

}