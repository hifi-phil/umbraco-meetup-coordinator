import { MeetupContent, MeetupDescription } from "@/data/meetupContent";
import { createLongMessages as createLongMessagesActual } from "./longMessageGenerator";
import { createLongMessages as createLongMessagesExample } from "./longMessageGeneratorExample";
import { IsDemo } from "../utls";

let createLongMessages : (meetupContent: MeetupContent, description: MeetupDescription, noOfMessages: number) => Promise<string[] | null>;

if (IsDemo()) {
    createLongMessages = createLongMessagesExample;
} else {
    createLongMessages = createLongMessagesActual;
}

export { createLongMessages };