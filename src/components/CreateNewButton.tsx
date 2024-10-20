"use client";
import { useContext } from "react";
import { MeetupContext } from "@/data/meetupContextProvider";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { paths } from "@/services/pathHelper";

export const CreateNewButton = () => {

  const router = useRouter();
  const { clearMeetupContent } = useContext(MeetupContext);

  const create = () => {
    clearMeetupContent();
    router.push(paths.event)
  }

  return <Button onClick={create}>Create New Event</Button>
}