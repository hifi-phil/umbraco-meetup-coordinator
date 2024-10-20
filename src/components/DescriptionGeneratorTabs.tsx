"use client";
import { DescriptionGenerator } from "@/components/DescriptionGenerator";
import { ImageGenerator } from "@/components/ImageGenerator";
import { useContext, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShortMessagesGenerator } from "@/components/ShortMessagesGenerator";
import { LongMessagesGenerator } from "@/components/LongMessagesGenerator";
import { MeetupContext } from "@/data/meetupContextProvider";

export default function DeescriptionGeneratorTabs() {

  const [activeTab, setActiveTab] = useState<string>();
  const [showTabs, setShowTabs] = useState<boolean>(false);
  const { meetupContent } = useContext(MeetupContext);

  useEffect(() => {
    if(meetupContent.descriptions.length > 0) {
      setShowTabs(true);
    }
  }, [meetupContent])

  if(showTabs) {
    return (
      <Tabs
        defaultValue="Description"
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="Description">Meetup Description</TabsTrigger>
          <TabsTrigger value="Image">Image</TabsTrigger>
          <TabsTrigger value="Short Messages">Short Messages</TabsTrigger>
          <TabsTrigger value="Long Messages">Long Messages</TabsTrigger>
        </TabsList>
        <TabsContent value="Description">
          <DescriptionGenerator />
        </TabsContent>
        <TabsContent value="Image">
          <ImageGenerator />
        </TabsContent>
        <TabsContent value="Short Messages">
          <ShortMessagesGenerator />
        </TabsContent>
        <TabsContent value="Long Messages">
          <LongMessagesGenerator />
        </TabsContent>
      </Tabs>
    );
  }
  else {
    return <DescriptionGenerator />
  }
}
