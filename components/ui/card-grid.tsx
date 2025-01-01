import { cn } from "@/lib/utils"

interface CardGridProps {
  children: React.ReactNode
  className?: string
  columns?: {
    default?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  gap?: number
}

export function CardGrid({
  children,
  className,
  columns = {
    default: 1,
    sm: 2,
    md: 2,
    lg: 3,
    xl: 4,
  },
  gap = 4,
}: CardGridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
  }

  return (
    <div
      className={cn(
        "grid",
        `gap-${gap}`,
        gridCols[columns.default || 1],
        columns.sm && `sm:${gridCols[columns.sm]}`,
        columns.md && `md:${gridCols[columns.md]}`,
        columns.lg && `lg:${gridCols[columns.lg]}`,
        columns.xl && `xl:${gridCols[columns.xl]}`,
        className
      )}
    >
      {children}
    </div>
  )
}
