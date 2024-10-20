"use client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { getAllMeetupContents, removeMeetupContent } from "@/services/meetupContentRepo";
import { Button } from "./ui/button";
import { MeetupContext } from "@/data/meetupContextProvider";
import { MeetupContent } from "@/data/meetupContent";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";
import { IsDemo } from "@/services/utls";

export function MeetupListing() {

    const { updateMeetupContent } = useContext(MeetupContext);

    const router = useRouter();

    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [meetups, setMeetups] = useState<MeetupContent[]>([])

    useEffect(() => {
        fetchData();
    }, [])

    const edit = (meetup : MeetupContent) => {
        updateMeetupContent(meetup);
        router.push('/create/description');
    }

    const remove = async (meetup : MeetupContent) => {
        await removeMeetupContent(meetup.id);
        toast({
            title: `Meetup content deleted`,
        })
        await fetchData();
    }

    const fetchData = async () => {
        try {
            const items = await getAllMeetupContents();
            setMeetups(items!);
            setIsLoaded(true);
        } catch (error) {
            console.error('Error fetching meetups:', error);
            // Handle errors here, e.g., set an error state
        }
    };

    if(isLoaded) {
        return (
            <>
                <Table className="w-[900px] mt-8 mx-auto">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Id</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Host</TableHead>
                            <TableHead>Event Type</TableHead>
                            <TableHead className="text-right w-[100px]"></TableHead>
                            <TableHead className="text-right w-[100px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {meetups?.map(item => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.id}</TableCell>
                                <TableCell className="font-medium">{item.location}</TableCell>
                                <TableCell>{item.date?.toDateString()}</TableCell>
                                <TableCell>{item.host}</TableCell>
                                <TableCell>{item.eventType}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="link" onClick={() => edit(item)}>Edit</Button>
                                </TableCell>
                                {!IsDemo() && <TableCell className="text-right">
                                    <Button variant="link" onClick={() => { remove(item) }}>Remove</Button>
                                </TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </>
        )
    }

}

