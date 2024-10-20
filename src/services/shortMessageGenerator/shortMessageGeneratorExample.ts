"use server";
import { readFileSync } from 'fs';
import { MeetupContent, MeetupDescription } from "@/data/meetupContent";
import { getExampleContent } from '../getExampleContent';

function timeout(delay: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

export const createShortMessages = async (meetupContent: MeetupContent, description: MeetupDescription) => {

    await timeout(2000);
    const example = await getExampleContent(`/examples/shortMessages/shortMessages.json`);
    return JSON.parse(example);

} 

