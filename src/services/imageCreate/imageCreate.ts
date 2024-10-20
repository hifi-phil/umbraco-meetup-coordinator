"use server";
import { MeetupDescription } from "@/data/meetupContent";
import OpenAI from "openai";
import { ChatCompletionCreateParams } from "openai/resources/index.mjs";
import { put } from "@vercel/blob";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const createImagePrompt = async (description: MeetupDescription) => {


    const request : ChatCompletionCreateParams = {
      model: process.env.OPENAI_API_SIMPLE_MODEL!,
      messages: [
        {
          "role": "system",
          "content": "Act as an Umbraco Meetup organiser. Your role is to help to create content for promoting these events."
        },
        {
          "role": "user",
          "content": `Here is the event description that I want you to create a prompt that will help me to create an image. Say yes if you understand.
                    /n${description.text}`
        },
        {
          "role": "assistant",
          "content": "Yes"
        },
        {
            "role": "user",
            "content": `Definition of a Meetup :
                      Am meetup is a small event, usualy 15 to 25 people that contragrate to around a certian topic. In our case to talk about Umbraco, an open source dotnet contebnt management system
                      They iusaully meet regularly, in our case once a month, the most common type of evvent is where a speaker talks for about 45 minutes. 
                      But we also have lightening talks, open discussions and run workshop.`
        },
        {
        "role": "assistant",
        "content": "Yes"
        },
        {
          "role": "user",
          "content": `We usually have 15 to 25 people at our meetups. 
          The image should illustrate the event and be set in landscape sixe so that I can use for Meetup pages, tweets etc. 
          The image should be illustrative of the talks outlined previously and can show a group of people attending a meetup or something more abstract.
          The Image shaould not attenpt to include the text name of the meetup or any of it's other content, it's purely illustratove.
          
          Create a prompt that I can pass to DALL-E 3.`
        },
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

export const createImage = async (prompt: string) => {

//https://openai.com/api/pricing/

    const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        quality: "standard",
        n: 1,
        response_format: "b64_json",
        size: "1792x1024",
      });

      if(response.data && response.data[0] && response.data[0].b64_json) {
        const blob = await put("somefile.png", base64ToBlob(response.data[0].b64_json), {
          access: 'public',
        });
        return blob.url;
      }
      else 
        return null;
}

function base64ToBlob(base64: string, mimeType: string = 'image/png'): Blob {
  const binaryString: string = atob(base64);
  const len: number = binaryString.length;
  const bytes: Uint8Array = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return new Blob([bytes], { type: mimeType });
}