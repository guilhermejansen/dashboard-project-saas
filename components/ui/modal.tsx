"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog"
import { Button } from "./button"

interface ModalProps {
  title?: string
  description?: string
  children: React.ReactNode
  trigger?: React.ReactNode
  className?: string
  onClose?: () => void
}

export function Modal({
  title,
  description,
  children,
  trigger,
  className,
  onClose,
}: ModalProps) {
  const [open, setOpen] = React.useState(false)

  const handleClose = () => {
    setOpen(false)
    onClose?.()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        className={cn("sm:max-w-[425px]", className)}
        onInteractOutside={handleClose}
        onEscapeKeyDown={handleClose}
      >
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <Button
          variant="ghost"
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
        {children}
      </DialogContent>
    </Dialog>
  )
}
