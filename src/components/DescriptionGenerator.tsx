"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { MeetupContext } from "@/data/meetupContextProvider";

import MDEditor from '@uiw/react-md-editor';

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { getMeetupDescription } from "@/services/descriptionGenerator";
import { MeetupContent } from "@/data/meetupContent";
import { AddLoadingState } from "./AddLoadingState";
import { toast } from "./ui/use-toast";
import { Input } from "./ui/input";

const FormSchema = z.object({
  description: z.string({
    required_error: "Please generate a talk description"
  }),
  meetupRSVPUrl: z.string({
    required_error: "Please add a Meetup event url for the RSVP"
  })
});

export function DescriptionGenerator() {

  const { meetupContent, updateMeetupContent } = useContext(MeetupContext);
  const [isInitialised, setIsInitialised] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const lastSavedData = useRef({});

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  });

  const watchedFields = form.watch();

  useEffect(() => {
    if(meetupContent) {
        const last = meetupContent.descriptions.at(-1);
        const formValues = {
          description: last?.text!,
          meetupRSVPUrl: meetupContent.meetupRSVPUrl!
        }
        lastSavedData.current = formValues;
        form.reset(formValues);
        setIsInitialised(true);
    }
  }, [meetupContent])

  const generate = async () => {
    setIsLoading(true);
    const description = await getMeetupDescription(meetupContent);
    if(description) {
      form.setValue("description", description);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      const hasChanged = JSON.stringify(watchedFields) !== JSON.stringify(lastSavedData.current);
      if (isInitialised && hasChanged) {
        saveData(watchedFields);
      }
    }, 1500);

    return () => clearTimeout(timeout);
  }, [watchedFields]); 

  function saveData(data: z.infer<typeof FormSchema>) {
    const value : MeetupContent = {
      ...meetupContent,
      meetupRSVPUrl: data.meetupRSVPUrl
    }
    if(value.descriptions.length === 0 ) {
      value.descriptions.push({
        id: 0,
        text: data.description
      })
    }
    else {
      value.descriptions[0].text = data.description;
    }

    updateMeetupContent(value);

    toast({
      title: `Meetup description save`,
    })

    lastSavedData.current = data;

  }

  return (
    <Card className="w-[900px]">
      <CardHeader>
        <CardTitle>Generate meetup description</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form>
          <CardContent className="space-y-4" data-color-mode="light">
            <FormField
              name="meetupRSVPUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meetup RSVP Page URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Event meetup page URL " {...field} value={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />    
            <FormField
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meetup description</FormLabel>
                  <FormControl>
                    <>
                      <MDEditor
                        height={400}
                        hideToolbar={false}
                        preview="preview"
                        {...field}
                      />
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />              
          </CardContent>
          <CardFooter className="flex justify-end gap-6">
            <Button disabled={isLoading} onClick={generate}>
              <AddLoadingState isLoading={isLoading} defaultText="Generate" loadingText="Generating" />
            </Button>
          </CardFooter>
          </form>
      </Form>
    </Card>
  );
}
