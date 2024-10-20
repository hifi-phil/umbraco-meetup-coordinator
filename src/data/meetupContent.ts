import { EventType } from "@prisma/client"

export interface MeetupTalk {
    id: number,
    speakerName: string,
    speakerCompany: string,
    title: string,
    description: string,
}

export interface MeetupDescription {
    id: number,
    text: string
}

export interface MeetupImage {
    id: number,
    imageUrl: string | null,
    imagePrompt: string
}

export interface MeetupEmail {
    id: number,
    message: string
}

export interface MeetupShortMessage {
    id: number,
    messages: string[]
}

export interface MeetupLongMessage {
    id: number,
    messages: string[]
}

export interface PostEventMessage {
    id: number,
    message: string
}

export interface MeetupContent {
    id: number,
    location: string | null,
    date: Date | null,
    host: string | null,
    eventType: EventType| null,
    eventDescription: string | null,
    talks: MeetupTalk[],
    meetupRSVPUrl: string | null,
    createdAt: Date | null,
    updatedAt: Date | null,
    descriptions: MeetupDescription[]
    images: MeetupImage[],
    shortMessages: MeetupShortMessage[],
    longMessages: MeetupLongMessage[],
    followUpEmails: MeetupEmail[],
    postEventMessages: PostEventMessage[]
}