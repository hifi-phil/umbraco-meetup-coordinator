"use server";
import { MeetupContent } from "@/data/meetupContent";
import OpenAI from "openai";
import { ChatCompletionCreateParams } from "openai/resources/index.mjs";
import { EventType } from '@prisma/client';
import { getExampleContent } from "../getExampleContent";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getMeetupDescription = async (m : MeetupContent) => {

    let content = '';

    if(m.eventType === EventType.Talks) {
      content = `This meetup event is for ${m.location} on ${new Date(m.date!).toDateString()} which will be hosted by ${m.host}.\n\n`;
      m.talks.forEach(talk => {
          content += `Speakers number 1 will be ${talk.speakerName} who works at ${talk.speakerCompany}, 
          \nThe talk title is 
          \n${talk.title}
          \n\n${talk.description}.`
      });
    }
    else {
      content = `This meetup event is a ${m.eventType} on ${m.location} on ${new Date(m.date!).toDateString()} which will be hosted by ${m.host}.\n\n
        The descript of this event is
        \n${m.eventDescription}`
    }
 
    const example = await getExampleContent(`/examples/descriptions/${m.eventType?.toString().toLowerCase()}.md`);

    const request : ChatCompletionCreateParams = {
      model: process.env.OPENAI_API_SIMPLE_MODEL!,
      messages: [
        {
          "role": "system",
          "content": "Act as an Umbraco Meetup organiser. Your role is to help to create content for promoting these events."
        },
        {
          "role": "user",
          "content": `Here is an example of a item description I have used in the past to promote one of our meetups. I want you to follow this format. Just say yes if you understand.
                    /n${example}`
        },
        {
          "role": "assistant",
          "content": "Yes"
        },
        {
          "role": "user",
          "content": "Next I am going to give you all the details for the meetup. From this I want you to create the new meetup description. Say yes if you understand."
        },
        {
          "role": "assistant",
          "content": "Yes"
        },
        {
          "role": "user",
          "content": content,
        }
      ],
      temperature: 0,
      max_tokens: 7000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    };

    const response = await openai.chat.completions.create(request);

    var message = response.choices[0].message;

    return message.content;
} 

