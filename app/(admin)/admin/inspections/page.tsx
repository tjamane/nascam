"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Calendar, MapPin, CheckCircle, Clock, AlertTriangle, Plus, Filter } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function InspectionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const inspections = [
    {
      id: "INS-2024-012",
      venue: "Windhoek Shopping Mall",
      address: "Independence Ave, Windhoek",
      type: "Retail",
      scheduledDate: "2024-04-15",
      inspector: "John Inspector",
      status: "Scheduled",
      lastInspection: "2023-04-10",
      compliance: "Compliant",
      notes: "Annual compliance check",
    },
    {
      id: "INS-2024-011",
      venue: "Café Schneider",
      address: "Tal Street, Windhoek",
      type: "Restaurant",
      scheduledDate: "2024-04-12",
      inspector: "Sarah Auditor",
      status: "Completed",
      lastInspection: "2024-04-12",
      compliance: "Non-Compliant",
      notes: "Playing unlicensed music",
    },
    {
      id: "INS-2024-010",
      venue: "Hotel Safari",
      address: "Auas Road, Windhoek",
      type: "Hotel",
      scheduledDate: "2024-04-10",
      inspector: "Mike Checker",
      status: "In Progress",
      lastInspection: "2023-10-15",
      compliance: "Pending",
      notes: "Routine inspection in progress",
    },
  ]

  const stats = [
    {
      title: "Scheduled Inspections",
      value: "12",
      icon: Calendar,
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "Completed This Month",
      value: "8",
      icon: CheckCircle,
      color: "bg-green-500/10 text-green-500",
    },
    {
      title: "Non-Compliant Venues",
      value: "3",
      icon: AlertTriangle,
      color: "bg-red-500/10 text-red-500",
    },
    {
      title: "Pending Follow-up",
      value: "5",
      icon: Clock,
      color: "bg-amber-500/10 text-amber-500",
    },
  ]

  const inspectors = [
    {
      name: "John Inspector",
      id: "INS-001",
      region: "Central Windhoek",
      activeInspections: 4,
      completedThisMonth: 12,
      status: "Available",
    },
    {
      name: "Sarah Auditor",
      id: "INS-002",
      region: "Northern Suburbs",
      activeInspections: 3,
      completedThisMonth: 15,
      status: "Busy",
    },
    {
      name: "Mike Checker",
      id: "INS-003",
      region: "Industrial Area",
      activeInspections: 2,
      completedThisMonth: 9,
      status: "Available",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Scheduled":
        return <Badge className="bg-blue-500">Scheduled</Badge>
      case "In Progress":
        return (
          <Badge variant="outline" className="text-amber-600">
            In Progress
          </Badge>
        )
      case "Completed":
        return <Badge className="bg-green-500">Completed</Badge>
      case "Cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getComplianceBadge = (compliance: string) => {
    switch (compliance) {
      case "Compliant":
        return <Badge className="bg-green-500">Compliant</Badge>
      case "Non-Compliant":
        return <Badge variant="destructive">Non-Compliant</Badge>
      case "Pending":
        return (
          <Badge variant="outline" className="text-amber-600">
            Pending
          </Badge>
        )
      default:
        return <Badge variant="outline">{compliance}</Badge>
    }
  }

  const filteredInspections = inspections.filter((inspection) => {
    const matchesSearch =
      searchQuery === "" ||
      inspection.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inspection.address.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || inspection.status.toLowerCase().replace(" ", "-") === statusFilter

    return matchesSearch && matchesStatus
  })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inspections</h1>
          <p className="text-muted-foreground">Schedule and manage venue compliance inspections</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Schedule Inspection
        </Button>
      </div>

      {/* Stats Overview */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat, index) => (
          <motion.div key={stat.title} variants={item}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`rounded-full p-2 ${stat.color}`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <Tabs defaultValue="inspections" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inspections">Inspections</TabsTrigger>
          <TabsTrigger value="inspectors">Inspectors</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="inspections" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search venues..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[160px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Inspections Table */}
          <Card>
            <CardHeader>
              <CardTitle>Venue Inspections ({filteredInspections.length})</CardTitle>
              <CardDescription>Track venue compliance and inspection schedules</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Venue</TableHead>
                    <TableHead>Inspector</TableHead>
                    <TableHead>Scheduled Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Compliance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInspections.map((inspection) => (
                    <TableRow key={inspection.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{inspection.venue}</div>
                            <div className="text-sm text-muted-foreground">{inspection.address}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{inspection.inspector}</div>
                          <div className="text-sm text-muted-foreground">{inspection.type}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {new Date(inspection.scheduledDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(inspection.status)}</TableCell>
                      <TableCell>{getComplianceBadge(inspection.compliance)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            View Report
                          </Button>
                          {inspection.status === "Scheduled" && (
                            <Button variant="outline" size="sm">
                              Reschedule
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inspectors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inspector Team</CardTitle>
              <CardDescription>Manage inspection team and assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {inspectors.map((inspector) => (
                  <Card key={inspector.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-medium">{inspector.name}</h3>
                          <p className="text-sm text-muted-foreground">{inspector.region}</p>
                        </div>
                        <Badge variant={inspector.status === "Available" ? "default" : "secondary"}>
                          {inspector.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Active Inspections:</span>
                          <span className="font-medium">{inspector.activeInspections}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Completed This Month:</span>
                          <span className="font-medium">{inspector.completedThisMonth}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" size="sm">
                          View Schedule
                        </Button>
                        <Button variant="outline" size="sm">
                          Assign
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inspection Calendar</CardTitle>
              <CardDescription>View and manage inspection schedules</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                <div className="text-center">
                  <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">Inspection Calendar</p>
                  <p className="text-sm text-muted-foreground">Calendar view of scheduled inspections</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
