"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert } from "@/components/ui/alert"

const forgotSchema = z.object({
  email: z.string().email(),
})

export default function ForgotPage() {
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(forgotSchema)
  })

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/auth/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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

  if (success) {
    return (
      <div className="mx-auto max-w-md p-6 text-center">
        <h1 className="text-2xl font-bold">Check your email</h1>
        <p className="mt-2 text-gray-500">
          If an account exists with that email, we've sent you password reset instructions.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md space-y-6 p-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Forgot your password?</h1>
        <p className="text-gray-500">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <Alert variant="destructive">{error}</Alert>
        )}
        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send reset link"}
        </Button>
      </form>

      <div className="text-center text-sm">
        Remember your password?{" "}
        <a href="/auth/login" className="text-blue-500 hover:underline">
          Sign in
        </a>
      </div>
    </div>
  )
}
