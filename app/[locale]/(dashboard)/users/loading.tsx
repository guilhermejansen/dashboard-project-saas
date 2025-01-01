import { LoadingSkeleton } from "@/components/loading-skeleton"

export default function UsersLoading() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <LoadingSkeleton type="table" count={10} />
    </div>
  )
}
