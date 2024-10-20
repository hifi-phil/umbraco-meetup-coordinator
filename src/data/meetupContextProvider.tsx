"use client";
import { ReactNode, createContext, useCallback, useEffect, useState } from 'react';
import { MeetupContent } from '@/data/meetupContent';
import { BreadcrumbItemProp } from '@/components/Breadcrumb';
import { EventType } from '@prisma/client';
import { paths } from '@/services/pathHelper';

interface MeetupContextProps {
  meetupContent: MeetupContent;
  getEmptyMeetupContent: () => MeetupContent
  clearMeetupContent: () => void;
  updateMeetupContent: (content: MeetupContent) => void;
  getBreadcrumbState: (currentPage: string) => BreadcrumbItemProp[];
}

interface MeetupContextProviderProps {
  value?: MeetupContent,
  children: ReactNode
}

const createEmpty = () => {

  return {
      id: 0,
      location: null,
      date: null,
      host: null,
      eventType: null,
      eventDescription: null,
      meetupRSVPUrl: null,
      createdAt: null, 
      updatedAt: null, 
      talks: [],
      descriptions: [],
      images: [],
      shortMessages: [],
      longMessages: [],
      followUpEmails: [],
      postEventMessages: []
  } as MeetupContent;
  
}

export const MeetupContext = createContext<MeetupContextProps>({
  meetupContent: createEmpty(),
  getEmptyMeetupContent: createEmpty,
  clearMeetupContent: () => {},
  updateMeetupContent: () => {},
  getBreadcrumbState: (_currentPage: string) => []
});

export function MeetupContextProvider(props: MeetupContextProviderProps) {

  const [meetupContent, setMeetupContent] = useState<MeetupContent>(createEmpty());

  useEffect(() => {
    const storedState = localStorage.getItem('meetupContent');
    if (storedState) {
      setMeetupContent(JSON.parse(storedState));
    }
  }, []);

  const updateMeetupContent = useCallback((newState: MeetupContent) => {
    setMeetupContent((prevState) => ({
        ...prevState,
        ...newState,
      }));
  }, []); 

  const clearMeetupContent = useCallback(() => {
    setMeetupContent(createEmpty());
    localStorage.removeItem('meetupContent');
  }, []); 

  useEffect(() => {
    if(JSON.stringify(meetupContent) !== JSON.stringify(createEmpty())) {
      localStorage.setItem('meetupContent', JSON.stringify(meetupContent));
    }
  }, [meetupContent]);

  const getBreadcrumbState = (currentPage: string) => {

    const output : BreadcrumbItemProp[] = [];

    output.push({ label: "Home", href: paths.home })

    if(currentPage === 'event') {
      output.push({ label: "Event" })
    }
    else {
      output.push({ label: "Event", href: paths.event })
    }

    if(meetupContent.eventType === EventType.Talks) {
      if(currentPage === 'talk') {
        output.push({ label: "Talks" })
      }
      else if (meetupContent.talks.length > 0) {
        output.push({ label: "Talks", href: paths.talks })
      } 
    }

    if(currentPage === 'generate') {
      output.push({ label: "Content Generation" })
    }
    else if (meetupContent.descriptions.length > 0) {
      output.push({ label: "Content Generation", href: paths.contentGeneration })
    }

    return output;
  }

  const getEmptyMeetupContent = () => {
    return createEmpty();
  }

  return (
    <MeetupContext.Provider value={{ meetupContent, updateMeetupContent, clearMeetupContent, getBreadcrumbState, getEmptyMeetupContent: getEmptyMeetupContent }}>
      {props.children}
    </MeetupContext.Provider>
  );
};