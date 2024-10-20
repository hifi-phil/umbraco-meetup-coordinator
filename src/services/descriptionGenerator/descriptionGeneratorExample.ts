"use server";
import { readFileSync } from 'fs';
import { MeetupContent } from "@/data/meetupContent";
import { getExampleContent } from '../getExampleContent';

function timeout(delay: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

export const getMeetupDescription = async (m : MeetupContent) => {

    await timeout(2000);
    console.log("Getting example generated description")
    const example = await getExampleContent(`/examples/descriptions/${m.eventType?.toString().toLowerCase()}.md`);
    return example;

} 

