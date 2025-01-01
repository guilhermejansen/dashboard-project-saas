"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Alert } from "@/components/ui/alert"
import { LoadingSkeleton } from "@/components/loading-skeleton"

export default function VerifyPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [error, setError] = useState("")

  useEffect(() => {
    if (!token) {
      setStatus("error")
      setError("Missing verification token")
      return
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch(`/api/auth/verify?token=${token}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error)
        }

        setStatus("success")
      } catch (error) {
        setStatus("error")
        setError(error.message)
      }
    }

    verifyEmail()
  }, [token])

  if (status === "loading") {
    return <LoadingSkeleton type="card" />
  }

  return (
    <div className="mx-auto max-w-md p-6 text-center">
      {status === "success" ? (
        <>
          <h1 className="text-2xl font-bold">Email verified</h1>
          <p className="mt-2 text-gray-500">
            Your email has been verified. You can now sign in to your account.
          </p>
          <a
            href="/auth/login"
            className="mt-4 inline-block text-blue-500 hover:underline"
          >
            Sign in
          </a>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold">Verification failed</h1>
          <Alert variant="destructive" className="mt-4">
            {error}
          </Alert>
          <a
            href="/auth/register"
            className="mt-4 inline-block text-blue-500 hover:underline"
          >
            Try again
          </a>
        </>
      )}
    </div>
  )
}
