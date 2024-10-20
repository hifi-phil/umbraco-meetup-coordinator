import { MeetupContent } from "@/data/meetupContent";
import { getMeetupDescription as descriptionGenerator } from "./descriptionGenerator";
import { getMeetupDescription as descriptionGeneratorExample } from "./descriptionGeneratorExample";
import { IsDemo } from "../utls";

let getMeetupDescription : (m : MeetupContent) => Promise<string | null>;

if (IsDemo()) {
    getMeetupDescription = descriptionGeneratorExample;
} else {
    getMeetupDescription = descriptionGenerator;
}

export { getMeetupDescription };