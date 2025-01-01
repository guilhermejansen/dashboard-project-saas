import { Skeleton } from "./ui/skeleton"

interface LoadingSkeletonProps {
  type: "table" | "chart" | "form" | "list"
  count?: number
}

export function LoadingSkeleton({ type, count = 1 }: LoadingSkeletonProps) {
  switch (type) {
    case "table":
      return (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-8 w-[250px]" />
            <Skeleton className="h-8 w-[150px]" />
          </div>
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-12 w-full" />
            </div>
          ))}
        </div>
      )
    case "chart":
      return <Skeleton className="h-[350px] w-full" />
    case "form":
      return (
        <div className="space-y-4">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      )
    case "list":
      return (
        <div className="space-y-3">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
        </div>
      )
    default:
      return null
  }
}
