import type React from "react"
import { AdminDashboardLayout } from "@/components/admin-dashboard-layout"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminDashboardLayout>{children}</AdminDashboardLayout>
}
