"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { NavigationMenu } from "./navigation-menu"

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-60 flex-col border-r bg-background transition-transform lg:static lg:translate-x-0",
          !open && "-translate-x-full"
        )}
      >
        <div className="border-b px-4 py-4">
          <h2 className="font-semibold">Dashboard</h2>
        </div>
        <ScrollArea className="flex-1">
          <NavigationMenu />
        </ScrollArea>
      </aside>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/80 lg:hidden"
          onClick={onClose}
        />
      )}
    </>
  )
}
