"use client";
import { BreadcrumbUi } from "@/components/Breadcrumb";
import { EventCard } from "@/components/EventCard";
import { MeetupContext } from "@/data/meetupContextProvider";
import { useContext } from "react";

export default function CreateNewEvent() {

    const { getBreadcrumbState } = useContext(MeetupContext);

    return (
        <div>
            <BreadcrumbUi className="m-4" items={getBreadcrumbState("event")} />
            <EventCard/>
        </div>
    ) 
}