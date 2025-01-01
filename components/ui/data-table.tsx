"use client"

import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"
import { LoadingSkeleton } from "../loading-skeleton"
import { cn } from "@/lib/utils"

interface Column {
  key: string
  title: string
  render?: (value: any) => React.ReactNode
}

interface DataTableProps<T> {
  data: T[]
  columns: Column[]
  pagination?: boolean
  sorting?: boolean
  filtering?: boolean
  loading?: boolean
  onRowClick?: (row: T) => void
  className?: string
}

export function DataTable<T>({
  data,
  columns,
  loading,
  onRowClick,
  className,
}: DataTableProps<T>) {
  if (loading) {
    return <LoadingSkeleton type="table" count={5} />
  }

  return (
    <div className={cn("rounded-md border", className)}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key}>{column.title}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, i) => (
            <TableRow
              key={i}
              onClick={() => onRowClick?.(row)}
              className={onRowClick ? "cursor-pointer" : ""}
            >
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {column.render
                    ? column.render(row[column.key as keyof T])
                    : row[column.key as keyof T]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
