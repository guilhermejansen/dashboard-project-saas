"use client"

import { useEffect } from "react"
import { Button } from "./ui/button"
import { AlertCircle, RefreshCcw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"

interface ErrorBoundaryProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex h-[calc(100vh-4rem)] items-center justify-center p-6">
      <Alert variant="destructive" className="max-w-2xl">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Something went wrong!</AlertTitle>
        <AlertDescription className="mt-2 flex flex-col gap-4">
          <p>
            {error.message || "An unexpected error occurred. Please try again."}
          </p>
          <Button
            variant="outline"
            className="w-fit"
            onClick={reset}
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Try again
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  )
}
