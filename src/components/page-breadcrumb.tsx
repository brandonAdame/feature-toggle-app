import { Link, useLocation } from "@tanstack/react-router"
import * as React from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb"
import { buttonVariants } from "./ui/button"

export function PageBreadcrumb() {
  const pathname = useLocation({
    select: (location) => location.pathname,
  })

  const renderPageBreadcrumb = () => {
    const segments = pathname.split("/").filter(Boolean)

    if (segments.length === 0) {
      return (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                render={
                  <Link to="/" className={buttonVariants({ variant: "link" })}>
                    Home
                  </Link>
                }
              ></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>Overview</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
    }
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              render={
                <Link to="/" className={buttonVariants({ variant: "link" })}>
                  Home
                </Link>
              }
            ></BreadcrumbLink>
          </BreadcrumbItem>
          {segments.map((segment, index) => (
            <React.Fragment key={index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {segment
                  .toLowerCase()
                  .replace(/(^|\s)\S/g, (match) => match.toUpperCase())}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    )
  }

  return <>{renderPageBreadcrumb()}</>
}
