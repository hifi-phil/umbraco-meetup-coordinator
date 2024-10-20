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
import { createLongMessages } from "@/services/longMessageGenerator";
import { MeetupLongMessage } from "@/data/meetupContent";

export function LongMessagesGenerator() {

  const { meetupContent, updateMeetupContent } = useContext(MeetupContext);
  const [currentMessages, setCurrentMessages] = useState<MeetupLongMessage>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    
    if(meetupContent.longMessages && meetupContent.longMessages.length > 0) {
      setCurrentMessages(meetupContent.longMessages[0]);
    }

  }, [meetupContent])

  const generate = async () => {
    setIsLoading(true)
    const latestDescription = meetupContent.descriptions.at(-1);
    if(latestDescription) {
      const messages = await createLongMessages(meetupContent, latestDescription, 2);
      if(messages) {

        if(meetupContent.longMessages.length === 0) {
          const newMessages = {
            id: 0,
            messages: messages
          };
          setCurrentMessages(newMessages);
          meetupContent.longMessages.push(newMessages);
        }
        else {
          meetupContent.longMessages[0].messages = messages
          setCurrentMessages(meetupContent.longMessages[0]);
        }

        updateMeetupContent(meetupContent);
      }
    }
    setIsLoading(false)
  }

  return (
    <Card className="w-[900px]">
      <CardHeader>
        <CardTitle>Event Long Messages for LinkedIn etc</CardTitle>
      </CardHeader>
          <CardContent className="space-y-4" data-color-mode="light">
            {currentMessages && currentMessages.messages.map((message, index) => (
              <div className="grid w-full gap-1.5" key={index}>
                <Label htmlFor="message">Message {index + 1}</Label>
                <Textarea id="message" className="max-w-18" rows={8} value={message} />
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
