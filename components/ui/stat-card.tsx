"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { LoadingSkeleton } from "../loading-skeleton"

interface StatCardProps {
  title: string
  value: string | number
  change?: number
  trend?: 'up' | 'down'
  icon?: React.ReactNode
  loading?: boolean
  className?: string
}

export function StatCard({
  title,
  value,
  change,
  trend,
  icon,
  loading,
  className,
}: StatCardProps) {
  if (loading) {
    return <LoadingSkeleton type="card" />
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className={cn(
            "text-xs",
            trend === "up" ? "text-green-500" : "text-red-500"
          )}>
            <span className="flex items-center">
              {trend === "up" ? (
                <ArrowUpIcon className="mr-1 h-4 w-4" />
              ) : (
                <ArrowDownIcon className="mr-1 h-4 w-4" />
              )}
              {change}%
            </span>
          </p>
        )}
      </CardContent>
    </Card>
  )
}
