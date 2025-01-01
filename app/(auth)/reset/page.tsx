"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert } from "@/components/ui/alert"

const resetSchema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export default function ResetPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(resetSchema)
  })

  const onSubmit = async (data) => {
    if (!token) {
      setError("Missing reset token")
      return
    }

    try {
      const response = await fetch("/api/auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          password: data.password,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error)
        return
      }

      setSuccess(true)
    } catch (error) {
      setError("An unexpected error occurred")
    }
  }

  if (!token) {
    return (
      <div className="mx-auto max-w-md p-6 text-center">
        <Alert variant="destructive">Invalid reset link</Alert>
      </div>
    )
  }

  if (success) {
    return (
      <div className="mx-auto max-w-md p-6 text-center">
        <h1 className="text-2xl font-bold">Password reset successful</h1>
        <p className="mt-2 text-gray-500">
          Your password has been reset. You can now sign in with your new password.
        </p>
        <a
          href="/auth/login"
          className="mt-4 inline-block text-blue-500 hover:underline"
        >
          Sign in
        </a>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md space-y-6 p-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Reset your password</h1>
        <p className="text-gray-500">Enter your new password below</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <Alert variant="destructive">{error}</Alert>
        )}
        <div className="space-y-2">
          <Input
            type="password"
            placeholder="New Password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Input
            type="password"
            placeholder="Confirm New Password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Resetting..." : "Reset password"}
        </Button>
      </form>
    </div>
  )
}
