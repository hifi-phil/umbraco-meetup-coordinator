import Link from "next/link"
import React from "react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function BreadcrumbUi(props : BreadcrumbProps) {
  return (
    <Breadcrumb className={props.className}>
      <BreadcrumbList>
        {props.items.map((item, index) => (
            <React.Fragment key={index}>
                <BreadcrumbItem>
                    {item.href 
                    ? <BreadcrumbLink><Link href={item.href}>{item.label}</Link></BreadcrumbLink>
                    : <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    }
                </BreadcrumbItem>
                {index < props.items.length - 1 && (<BreadcrumbSeparator/>)}
            </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

interface BreadcrumbProps {
    className?: string,
    items: BreadcrumbItemProp[]
}

export interface BreadcrumbItemProp {
    label: string,
    href?: string,
}
