import { MeetupContent, MeetupDescription } from "@/data/meetupContent";
import { createShortMessages as createShortMessagesActual } from "./shortMessageGenerator";
import { createShortMessages as createShortMessagesExample } from "./shortMessageGeneratorExample";
import { IsDemo } from "../utls";

let createShortMessages : (meetupContent: MeetupContent, description: MeetupDescription, noOfMessages: number) => Promise<string[] | null>;

if (IsDemo()) {
    createShortMessages = createShortMessagesExample;
} else {
    createShortMessages = createShortMessagesActual;
}

export { createShortMessages };