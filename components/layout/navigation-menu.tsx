"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Settings,
  Users,
  BarChart,
  FileText,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart },
  { name: "Users", href: "/dashboard/users", icon: Users },
  { name: "Reports", href: "/dashboard/reports", icon: FileText },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function NavigationMenu() {
  const pathname = usePathname()

  return (
    <nav className="space-y-1 p-2" role="navigation" aria-label="Main">
      {navigation.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            <item.icon className="mr-3 h-5 w-5" aria-hidden="true" />
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}
