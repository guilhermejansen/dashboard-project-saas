import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built with Next.js 14",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>
}
