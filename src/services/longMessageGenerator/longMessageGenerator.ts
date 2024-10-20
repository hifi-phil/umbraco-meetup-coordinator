"use server";
import { MeetupContent, MeetupDescription } from "@/data/meetupContent";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const createLongMessages = async (meetupContent: MeetupContent, description: MeetupDescription, noOfMessages: number) => {
  const completions = await openai.chat.completions.create({
    model: process.env.OPENAI_API_COMPLEX_MODEL!,
    messages: [
      {
        role: "user",
        content: `Create ${noOfMessages} longer messages, about 200 words each to promote the event described here.
            These messages will be posted on LinkedIn to promote the event from different organisers accounts.
            Each long message should include relevant hashtags for the specific message. It should also include the #umbraco hashtag somewhere in the text.
            The text should also make full use of emoticons to better portray the message.
            Each message should be well spaced out using line spaces where appropriate.
            Each message should include the full name of where ${meetupContent.host} we are hosting the event at.
            Each message should include a full run down of the event and not be too over the top.
            Each message should not include any agenda information or how to get into the venue.
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

  const output = completions.choices[0].message!.function_call!.arguments!;

  const structuredResponse = JSON.parse(
    output
  );

  return structuredResponse.items as string[];
};