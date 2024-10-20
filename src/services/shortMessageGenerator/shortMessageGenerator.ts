"use server";
import { MeetupContent } from "@/data/meetupContent";
import { MeetupDescription } from "@/data/meetupContent";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const createShortMessages = async (meetupContent: MeetupContent, description: MeetupDescription) => {
  const completions = await openai.chat.completions.create({
    model: process.env.OPENAI_API_COMPLEX_MODEL!,
    messages: [
      {
        role: "user",
        content: `Create a series of short messages, less that 280 characters each to promote the event described here. 
            These messages will be posted on Twitter and Mastadon to promote the event.
            Each short message should include relevant hashtags for the specific tweet. It should also include the #umbraco hashtag somewhere in the text.
            The text should also make full use of emoticons to better portray the message.
            At least 2 of the messages should include the full name of where (${meetupContent.host}) we are hosting the event at.
            The last message should be a final call to the event.
            The output is in json so avoid unexpected tokens.
            Each message produced should include the url to the Meetup page at ${meetupContent.meetupRSVPUrl} where people can sign up the evennt
            ${description.text}
            Say yes if you understand`,
      },
      {
        role: "assistant",
        content: "Yes",
      },
      {
        role: "user",
        content: "Set the result to the out function",
      },
    ],
    functions: [
      {
        name: "out",
        description: "This is the function that returns the result of the agent",
        parameters: {
          type: "object",
          properties: {
            items: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },
        },
      },
    ],
  });

  const structuredResponse = JSON.parse(
    completions.choices[0].message!.function_call!.arguments!
  );

  return structuredResponse.items as string[];
};