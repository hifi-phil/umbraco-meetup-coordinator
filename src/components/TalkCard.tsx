"use client";
import { useContext, useEffect, useState } from "react";
import { MeetupContext } from "@/data/meetupContextProvider";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MeetupTalk } from "@/data/meetupContent";
import { useToast } from "./ui/use-toast";
import { paths } from "@/services/pathHelper";

const FormSchema = z.object({
  speakerName: z.string({
    required_error: "Please select a speaker name"
  }),
  speakerCompany: z.string(),
  title: z.string({
    required_error: "Please select a talk title"
  }),
  description: z.string({
    required_error: "Please select a talk description"
  }),
});

export function TalkCard({ index, setTab: setActiveTab } : { index: number, setTab : (index: string) => void }) {

  const { meetupContent, updateMeetupContent } = useContext(MeetupContext);
  const [isNew, setisNew] = useState(true);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  });

  const { toast } = useToast();

  useEffect(() => {
    if(meetupContent && meetupContent.talks[index]) {
      form.reset(meetupContent.talks[index]);
      setisNew(false);
    }
  }, [meetupContent])

  const router = useRouter();

  const next = () => {
    router.push(paths.contentGeneration);
  }

  const remove = () => {
    meetupContent.talks.splice(index, 1);
    updateMeetupContent(meetupContent);
    setActiveTab("0")
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const talk : MeetupTalk = {
      id: index,
      speakerName: data.speakerName,
      speakerCompany: data.speakerCompany,
      title: data.title,
      description: data.description
    }
    
    if(meetupContent.talks.length >= index + 1) {
      meetupContent.talks[index] = talk;
    }
    else {
      meetupContent.talks.push(talk);
    }

    updateMeetupContent(meetupContent);

    toast({
      title: `Talk updated`,
      description: "Friday, February 10, 2023 at 5:57 PM",
    })

    setActiveTab(index.toString())
  }

  return (
    <Card className="w-[900px]">
      <CardHeader>
        <CardTitle>{isNew ? ('Add new talk') : ('Update talk')}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="flex w-100 gap-6">
              <FormField
                control={form.control}
                name="speakerName"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Speaker name</FormLabel>
                    <FormControl>
                      <Input placeholder="Speaker name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="speakerCompany"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Speaker company</FormLabel>
                    <FormControl>
                      <Input placeholder="Speaker organisation" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />            
            </div>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Talk title</FormLabel>
                  <FormControl>
                    <Textarea rows={3} placeholder="Talk title" {...field} value={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />  
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Talk description</FormLabel>
                  <FormControl>
                    <Textarea rows={10} placeholder="talk description" {...field} value={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />               
          </CardContent>
          <CardFooter className="flex justify-end gap-5">
            {!isNew ? 
            (
              <>
                <Button type="button" onClick={remove} variant="destructive">Remove</Button>
                <Button type="submit" variant="constructive">Update</Button>
                <Button type="button" onClick={next}>Next &gt;</Button>
              </>
            )
            :(
              <Button type="submit" variant="constructive">Add New</Button>
            )}
          </CardFooter>
          </form>
      </Form>
    </Card>
  );
}
