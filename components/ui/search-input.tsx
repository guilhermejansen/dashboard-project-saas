"use client"

import * as React from "react"
import { Search, X } from "lucide-react"
import { Input } from "./input"
import { Button } from "./button"
import { useDebounce } from "@/hooks/use-debounce"

interface SearchInputProps {
  onSearch: (value: string) => void
  placeholder?: string
  debounceMs?: number
  loading?: boolean
  className?: string
}

export function SearchInput({
  onSearch,
  placeholder = "Search...",
  debounceMs = 300,
  loading,
  className,
}: SearchInputProps) {
  const [value, setValue] = React.useState("")
  const debouncedValue = useDebounce(value, debounceMs)

  React.useEffect(() => {
    onSearch(debouncedValue)
  }, [debouncedValue, onSearch])

  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="pl-8 pr-8"
      />
      {value && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-2 hover:bg-transparent"
          onClick={() => setValue("")}
          disabled={loading}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
