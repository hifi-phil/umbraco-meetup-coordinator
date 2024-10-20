"use client";

import { SessionProvider } from "next-auth/react";
import { MeetupContextProvider } from "@/data/meetupContextProvider";

export default function Providers({
    children,
  }: {
    children: React.ReactNode;
  }) {

    return <SessionProvider>
      <MeetupContextProvider>
        {children}
      </MeetupContextProvider>
    </SessionProvider>

}