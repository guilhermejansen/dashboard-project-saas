import * as React from "react"
import { useFormContext } from "react-hook-form"
import { Label } from "./label"
import { Input } from "./input"
import { cn } from "@/lib/utils"

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  description?: string
  error?: string
}

export function FormField({
  label,
  name,
  description,
  error,
  className,
  ...props
}: FormFieldProps) {
  const { register } = useFormContext()

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        {...register(name)}
        className={cn(error && "border-destructive", className)}
        aria-describedby={`${name}-description ${name}-error`}
        {...props}
      />
      {description && (
        <p
          id={`${name}-description`}
          className="text-sm text-muted-foreground"
        >
          {description}
        </p>
      )}
      {error && (
        <p
          id={`${name}-error`}
          className="text-sm text-destructive"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  )
}
