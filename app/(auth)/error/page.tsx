"use client"

import { useSearchParams } from "next/navigation"
import { Alert } from "@/components/ui/alert"

const errorMessages = {
  Configuration: "There is a problem with the server configuration.",
  AccessDenied: "You do not have permission to sign in.",
  Verification: "The verification token has expired or has already been used.",
  Default: "An unexpected error occurred.",
}

export default function ErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")
  const errorMessage = errorMessages[error] || errorMessages.Default

  return (
    <div className="mx-auto max-w-md p-6 text-center">
      <h1 className="text-2xl font-bold">Authentication Error</h1>
      <Alert variant="destructive" className="mt-4">
        {errorMessage}
      </Alert>
      <a
        href="/auth/login"
        className="mt-4 inline-block text-blue-500 hover:underline"
      >
        Back to sign in
      </a>
    </div>
  )
}
