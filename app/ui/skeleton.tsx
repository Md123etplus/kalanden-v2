import * as React from "react"

import { cn } from "@/lib/utils"

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn("pointer-events-none flex items-center", "animate-pulse rounded-md bg-secondary", className)}
      ref={ref}
      {...props}
    />
  )
})
Skeleton.displayName = "Skeleton"

export { Skeleton }

