"use server";
import { MeetupDescription } from "@/data/meetupContent";
import { getExampleContent } from '../getExampleContent';

function timeout(delay: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

export const createImagePrompt = async (description: MeetupDescription) => {

    await timeout(2000);
    const example = await getExampleContent(`/examples/images/imagePrompt.md`);
    return example;
} 

export const createImage = async (prompt: string) => {

  await timeout(2000);
  return "/example-image.webp"

}

