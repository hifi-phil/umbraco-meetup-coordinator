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
import { createImagePrompt, createImage } from "@/services/imageCreate";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import Image from "next/image";
import { AddLoadingState } from "./AddLoadingState";
import { MeetupImage } from "@/data/meetupContent";

export function ImageGenerator() {

  const { meetupContent, updateMeetupContent } = useContext(MeetupContext);
  const [currentImage, setCurrentImage] = useState<MeetupImage>();
  const [isLoadingPrompt, setIsLoadingPrompt] = useState<boolean>(false);
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false);
  const [isLoadingPromptAndImage, setIsLoadingPromptAndImage] = useState<boolean>(false);

  useEffect(() => {
    
    if(meetupContent.images && meetupContent.images.length > 0) {
      setCurrentImage(meetupContent.images[0]);
    }

  }, [meetupContent])

  const generatePrompt = async () => {
    if(meetupContent) {
      setIsLoadingPrompt(true)
      const latestDescription = meetupContent.descriptions.at(-1);
      if(latestDescription != null) {
        const imagePrompt = await createImagePrompt(latestDescription);
        if(imagePrompt) {
          if(meetupContent.images.length === 0) {
            const newImage = {
              id: 0,
              imagePrompt: imagePrompt,
              imageUrl: null
            } as MeetupImage;
            meetupContent.images.push(newImage);
            setCurrentImage(newImage);
          }
          else {
            meetupContent.images[0].imagePrompt = imagePrompt;
            meetupContent.images[0].imageUrl = null;
          }
          updateMeetupContent(meetupContent);
        }
      }
      setIsLoadingPrompt(false)
    }
  }

  const generateImage = async () => {
    if(currentImage && currentImage.imagePrompt) {
      setIsLoadingImage(true)
      currentImage.imageUrl = await createImage(currentImage.imagePrompt);
      setIsLoadingImage(false)
      updateMeetupContent(meetupContent);
    }
  }

  const generatePromptAndImage = async () => {
    setIsLoadingPromptAndImage(false);
    generatePrompt();
    generateImage();
    setIsLoadingPromptAndImage(false);
  }

  return (
    <Card className="w-[900px]">
      <CardHeader>
        <CardTitle>Event Image</CardTitle>
      </CardHeader>
          <CardContent className="space-y-4" data-color-mode="light">
            {currentImage && currentImage.imagePrompt && (<div className="grid w-full gap-1.5">
              <Label htmlFor="message">Prompt</Label>
              <Textarea id="message" className="max-w-18" rows={8} value={currentImage.imagePrompt} />
            </div>)}
            {currentImage && currentImage.imageUrl && (<div className="grid w-full gap-1.5 relative h-96">
              <Image fill={true} style={{objectFit: "contain"}} src={currentImage.imageUrl} alt="Generated image"/>
            </div>)}
          </CardContent>
          <CardFooter className="flex justify-end gap-6">
            <Button variant="constructive" disabled={isLoadingPrompt} onClick={generatePrompt}>
              <AddLoadingState 
                  isLoading={isLoadingPrompt} 
                  defaultText="Generate Prompt"
                  loadingText={"Generating Prompt"}
                  />
            </Button>
            <Button variant="constructive" disabled={isLoadingImage || !currentImage?.imagePrompt} onClick={generateImage}>
              <AddLoadingState 
                  isLoading={isLoadingImage} 
                  defaultText="Generate Image"
                  loadingText={"Generating Image"}
                  />
            </Button>
            <Button variant="constructive" disabled={isLoadingPromptAndImage} onClick={generatePromptAndImage}>
              <AddLoadingState 
                isLoading={isLoadingPromptAndImage} 
                defaultText="Generate All"
                loadingText={isLoadingPrompt ? "Generating Prompt" : "Generating Image"}
                />
            </Button>
          </CardFooter>
    </Card>
  );
}
