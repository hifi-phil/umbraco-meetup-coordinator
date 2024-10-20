"use client";
import { useContext, useState, useEffect } from "react";
import { MeetupContext } from "@/data/meetupContextProvider";
import { useRouter } from "next/navigation";
import { capitalCase } from "change-case";

import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { CalendarIcon } from "@radix-ui/react-icons";

import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "./ui/textarea";
import { EventType } from "@prisma/client";
import { paths } from "@/services/pathHelper";
import { Input } from "./ui/input";

const FormSchema = z.object({
  location: z.string({
    required_error: "Please select a location"
  }).nullable(),
  host: z.string({
    required_error: "Please select a host"
  }).nullable(),
  date: z.date({
    required_error: "A date of birth is required.",
  }).nullable(),
  eventType: z.nativeEnum(EventType)
  .nullable(),
  eventDescription: z.string({
    required_error: "Event description is required.",
  }).optional().nullable()
});

export function EventCard() {

  const { meetupContent, updateMeetupContent, getEmptyMeetupContent: createEmptyMeetupContent } = useContext(MeetupContext);
  const [key, setKey] = useState<number>(Date.now())

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  });

  const router = useRouter();

  useEffect(() => {
    if(meetupContent) {
      meetupContent.host && form.setValue("host", meetupContent.host);
      meetupContent.eventType && form.setValue("eventType", meetupContent.eventType);
      meetupContent.eventDescription && form.setValue("eventDescription", meetupContent.eventDescription);
      meetupContent.location && form.setValue("location", meetupContent.location);
      form.setValue("date", meetupContent.date ? new Date(meetupContent.date) : new Date())
      setKey(Date.now())
    }
  }, [meetupContent])

  const hasTalks = () => {
    const currentEvent = form.watch("eventType") as EventType;
    if (currentEvent === undefined || currentEvent === null) return true;
    if (currentEvent === EventType.Talks) return true;
    if (currentEvent === EventType.LightningTalks) return true;
    return false;
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    
    let value = meetupContent ? meetupContent : createEmptyMeetupContent();
    value.location = data.location,
    value.date = data.date,
    value.host = data.host,
    value.eventType = data.eventType,
    value.eventDescription = data.eventDescription!,
    updateMeetupContent(value);

    if(data.eventType === EventType.Talks) {
      router.push(paths.talks);
    }
    else {
      router.push(paths.contentGeneration);
    }
  }

  return (
    <Card className="w-[900px]">
      <CardHeader>
        <CardTitle>Create a new Umbraco Meetups</CardTitle>
        <CardDescription>
          Automate creating and promoting events
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form key={key} onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value!}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a meetup" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="umbManchester">Umbraco Manchester</SelectItem>
                      <SelectItem value="umbLeeds">Umbraco Leeds</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value!}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date()
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="host"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Host</FormLabel>
                    <FormControl>
                      <Input placeholder="Host" {...field} value={field.value!} />
                    </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />  
            <FormField
              control={form.control}
              name="eventType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value!}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a an event type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(EventType).map((value) => (
                        <SelectItem key={value} value={value}>
                          {capitalCase(value)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />      
          {!hasTalks() && <FormField
              control={form.control}
              name="eventDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Description</FormLabel>
                  <Textarea rows={5} placeholder="Event description" {...field} value={field.value!} />
                  <FormMessage />
                </FormItem>
              )}
            />}     
          </CardContent>
          <CardFooter className="flex justify-end">
            {form.watch("eventType") && <Button type="submit">Next &gt;</Button>}
          </CardFooter>
          </form>
      </Form>
    </Card>
  );
}
