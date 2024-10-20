"use client";
import { ReloadIcon } from "@radix-ui/react-icons";

export const AddLoadingState = (props: AddLoadingStateProps) => {

  if (props.isLoading) {
    return <>
      {props.loadingText}
      <ReloadIcon className="ml-2 h-4 w-4 animate-spin" />
    </>;
  }
  else {
    return props.defaultText;
  }

};

export interface AddLoadingStateProps {
  isLoading?: boolean,
  defaultText: string,
  loadingText: string
}
