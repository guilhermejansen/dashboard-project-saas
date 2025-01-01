"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible"

interface InfoPanelProps {
  title: string
  description?: string
  children: React.ReactNode
  collapsible?: boolean
  defaultOpen?: boolean
  className?: string
}

export function InfoPanel({
  title,
  description,
  children,
  collapsible = false,
  defaultOpen = true,
  className,
}: InfoPanelProps) {
  if (!collapsible) {
    return (
      <div className={cn("rounded-lg border bg-card p-6", className)}>
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
        <div className="mt-4">{children}</div>
      </div>
    )
  }

  return (
    <Collapsible
      defaultOpen={defaultOpen}
      className={cn("rounded-lg border bg-card", className)}
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            {description && (
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          <CollapsibleTrigger className="rounded-md p-2 hover:bg-muted">
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="mt-4">
          {children}
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}
