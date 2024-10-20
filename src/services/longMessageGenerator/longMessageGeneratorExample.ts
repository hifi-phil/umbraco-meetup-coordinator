"use server";
import { readFileSync } from 'fs';
import { MeetupContent, MeetupDescription } from "@/data/meetupContent";
import { getExampleContent } from '../getExampleContent';

function timeout(delay: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

export const createLongMessages = async (meetupContent: MeetupContent, description: MeetupDescription, noOfMessages: number) => {

    await timeout(2000);
    const example = await getExampleContent(`/examples/longMessages/longMessages.json`);
    return JSON.parse(example);

} 

