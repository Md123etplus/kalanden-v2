import { Skeleton } from "@/app/ui/skeleton"

export default function Loading() {
  return (
    <>
      <div className="w-full flex items-center justify-between">
        <h1 className="antialiased">Revenue</h1>
      </div>
      <div>
        <Skeleton height="70px" width="140px" />
      </div>
      <div className="mt-4">
        <Skeleton height="20px" width="100%" />
        <Skeleton height="20px" width="100%" />
        <Skeleton height="20px" width="100%" />
      </div>
    </>
  )
}

