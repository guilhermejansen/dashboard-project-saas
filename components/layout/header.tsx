"use client"

import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { ModeToggle } from "../mode-toggle"
import { UserNav } from "../user-nav"
import { LanguageToggle } from "../language-toggle"
import { SearchCommand } from "../search-command"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="flex h-16 items-center px-4">
        <Button
          variant="ghost"
          className="mr-2 px-2 hover:bg-transparent lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open sidebar</span>
        </Button>
        <div className="flex flex-1 items-center justify-between space-x-4">
          <div className="flex-1">
            <SearchCommand />
          </div>
          <div className="flex items-center space-x-4">
            <LanguageToggle />
            <ModeToggle />
            <UserNav />
          </div>
        </div>
      </div>
    </header>
  )
}
