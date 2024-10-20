import { MeetupDescription } from "@/data/meetupContent";
import { createImage as createImageActual, createImagePrompt as createImagePromptActual } from "./imageCreate";
import { createImage as createImageExmaple, createImagePrompt as createImagePromptExample } from "./imageCreateExample";
import { IsDemo } from "../utls";

let createImage : (prompt : string) => Promise<string | null>;
let createImagePrompt : (description: MeetupDescription) => Promise<string | null>;

if (IsDemo()) {
    createImage = createImageExmaple,
    createImagePrompt = createImagePromptExample
} else {
    createImage = createImageActual,
    createImagePrompt = createImagePromptActual
}

export { createImage, createImagePrompt };