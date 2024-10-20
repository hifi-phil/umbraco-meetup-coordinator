import { ReactNode } from "react";

export default function CreateLayout({children} : {children: ReactNode}) {
    return<div className="flex max-h-screen flex-col items-center justify-between">{children}</div>
}