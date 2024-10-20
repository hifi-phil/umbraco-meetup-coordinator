"use client";
import { useContext, useEffect, useState } from "react";
import { MeetupContext } from "@/data/meetupContextProvider";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { AddLoadingState } from "./AddLoadingState";
import { createShortMessages } from "@/services/shortMessageGenerator";
import { MeetupShortMessage } from "@/data/meetupContent";

export function ShortMessagesGenerator() {

  const { meetupContent, updateMeetupContent } = useContext(MeetupContext);
  const [currentMessages, setCurrentMessages] = useState<MeetupShortMessage>()
  const [isLoading, setIsLoading] = useState<boolean>(false);


  useEffect(() => {
    
    if(meetupContent.shortMessages && meetupContent.shortMessages.length > 0) {
      setCurrentMessages(meetupContent.shortMessages[0]);
    }

  }, [meetupContent])

  const generate = async () => {
    setIsLoading(true)
    const latestDescription = meetupContent.descriptions.at(-1);
    if(latestDescription) {
      const messages = await createShortMessages(meetupContent, latestDescription, 6);
      if(messages) {

        if(meetupContent.shortMessages.length === 0) {
          const newMessages = {
            id: 0,
            messages: messages
          };
          setCurrentMessages(newMessages);
          meetupContent.shortMessages.push(newMessages);
        }
        else {
          meetupContent.shortMessages[0].messages = messages
          setCurrentMessages(meetupContent.shortMessages[0]);
        }

        updateMeetupContent(meetupContent);
      }
    }
    setIsLoading(false)
  }

  return (
    <Card className="w-[900px]">
      <CardHeader>
        <CardTitle>Event Short Messages (X, Mastadon)</CardTitle>
      </CardHeader>
          <CardContent className="space-y-4" data-color-mode="light">
            {currentMessages && currentMessages.messages.map((message, index) => (
              <div className="grid w-full gap-1.5" key={index}>
                <Label htmlFor="message">Message {index + 1}</Label>
                <Textarea id="message" className="max-w-18" rows={4} value={message} />
              </div>))}
          </CardContent>
          <CardFooter className="flex justify-end gap-6">
            <Button disabled={isLoading} onClick={generate}>
              <AddLoadingState 
                isLoading={isLoading} 
                defaultText="Generate"
                loadingText={"Generate"}
                />
            </Button>
          </CardFooter>
    </Card>
  );
}
