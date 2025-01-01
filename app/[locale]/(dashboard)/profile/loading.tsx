import { LoadingSkeleton } from "@/components/loading-skeleton"

export default function ProfileLoading() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <LoadingSkeleton type="form" count={3} />
    </div>
  )
}
