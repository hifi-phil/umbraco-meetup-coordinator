"use client";
import { useContext, useEffect, useState } from "react";
import { MeetupContext } from "@/data/meetupContextProvider";

import { BreadcrumbUi } from "@/components/Breadcrumb";
import { TalkCard } from "@/components/TalkCard";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TalkPage({
  searchParams,
}: {
  searchParams: { index?: string };
}) {
  const { meetupContent, getBreadcrumbState } = useContext(MeetupContext);

  const [index] = useState<number>(
    searchParams.index ? Number(searchParams.index) : 0
  );
  const [ activeTab, setActiveTab ] = useState(searchParams.index);

  useEffect(() => {
    if(activeTab == undefined && meetupContent && meetupContent.talks && meetupContent.talks.length > 0) {
      setActiveTab(meetupContent.talks[0].id.toString())
    }
  }, [meetupContent])

  const setCurrentTab = (index: string) => {
    setActiveTab(index);
  }

  const getTabsOrSingle = () => {
    if (meetupContent && meetupContent.talks.length > 0) {
      return (
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              {meetupContent.talks.map((talk, index) => (
                <TabsTrigger value={talk.id.toString()} key={index}>
                  {talk.speakerName}
                </TabsTrigger>
              ))}
              <TabsTrigger value="+">+</TabsTrigger>
            </TabsList>
            {meetupContent.talks.map((talk, index) => (
              <TabsContent value={talk.id.toString()} key={index}>
                <TalkCard index={index} setTab={setCurrentTab} />
              </TabsContent>
            ))}
            <TabsContent value={"+"}>
              <TalkCard index={meetupContent.talks.length} setTab={setCurrentTab} />
            </TabsContent>
          </Tabs>
      );
    } else return <TalkCard index={index} setTab={setCurrentTab} />;
  };

  return (
    <div>
      <BreadcrumbUi className="m-4" items={getBreadcrumbState("talk")} />
      {getTabsOrSingle()}
    </div>
  );
}
