"use client";
import { BreadcrumbUi } from "@/components/Breadcrumb";
import { MeetupContext } from "@/data/meetupContextProvider";
import { useContext, useState } from "react";
import { BottomMenu } from "@/components/BottomMenu";
import { Button } from "@/components/ui/button";
import { saveMeetupContent, updateMeetupContent } from "@/services/meetupContentRepo";
import DeescriptionGeneratorTabs from "@/components/DescriptionGeneratorTabs";
import { useRouter } from "next/navigation";
import { AddLoadingState } from "@/components/AddLoadingState";
import { paths } from "@/services/pathHelper";
import { IsDemo } from "@/services/utls";

export const maxDuration = 60;

export default function Home() {
  
  const [ isSaving, setIsSaving ] = useState<boolean>(false);
  const { meetupContent, getBreadcrumbState } = useContext(MeetupContext);
  const router = useRouter();

  const create = async () => {
    setIsSaving(true);
    await saveMeetupContent(meetupContent)
    setIsSaving(false);
  }

  const update = async () => {
    setIsSaving(true);
    await updateMeetupContent(meetupContent)
    setIsSaving(false);
    router.push(paths.home);
  }

  return (
    <div>
      <BreadcrumbUi className="m-4" items={getBreadcrumbState("generate")} />
      <DeescriptionGeneratorTabs/>
      {!IsDemo() && <BottomMenu>
          {meetupContent.id === 0 
            ? <Button variant="constructive" disabled={isSaving} onClick={create}>
                <AddLoadingState isLoading={isSaving} defaultText="Save Content" loadingText="Creating Content" />
              </Button>
            : <Button variant="constructive" disabled={isSaving} onClick={update}>
                <AddLoadingState isLoading={isSaving} defaultText="Update Content" loadingText="Updating Content" />
              </Button>
          }
        </BottomMenu>}
    </div>
  );
}
