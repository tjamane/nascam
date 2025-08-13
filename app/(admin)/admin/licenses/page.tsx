"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FileCheck, Plus, Search, Calendar, Building, Music, DollarSign, Eye, Edit } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LicensesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const licenses = [
    {
      id: "LIC-2024-045",
      licensee: "Windhoek Shopping Mall",
      type: "Public Performance",
      category: "Retail",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      status: "Active",
      fee: "N$12,000",
      songsCount: 150,
      contact: "manager@wsmall.com",
    },
    {
      id: "LIC-2024-044",
      licensee: "Radio Energy 100.7",
      type: "Broadcasting",
      category: "Radio",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      status: "Active",
      fee: "N$45,000",
      songsCount: 500,
      contact: "licensing@radioenergy.com",
    },
    {
      id: "LIC-2024-043",
      licensee: "Café Schneider",
      type: "Public Performance",
      category: "Restaurant",
      startDate: "2024-03-01",
      endDate: "2025-02-28",
      status: "Pending Renewal",
      fee: "N$3,600",
      songsCount: 75,
      contact: "info@cafeschneider.com",
    },
    {
      id: "LIC-2024-042",
      licensee: "One Africa Television",
      type: "Synchronization",
      category: "Television",
      startDate: "2024-02-15",
      endDate: "2024-08-15",
      status: "Expired",
      fee: "N$25,000",
      songsCount: 200,
      contact: "content@oneafrica.tv",
    },
  ]

  const stats = [
    {
      title: "Active Licenses",
      value: "156",
      icon: FileCheck,
      color: "bg-green-500/10 text-green-500",
    },
    {
      title: "Pending Renewal",
      value: "23",
      icon: Calendar,
      color: "bg-amber-500/10 text-amber-500",
    },
    {
      title: "Revenue This Month",
      value: "N$89,450",
      icon: DollarSign,
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "New Applications",
      value: "8",
      icon: Plus,
      color: "bg-purple-500/10 text-purple-500",
    },
  ]

  const licenseTypes = [
    {
      name: "Public Performance",
      description: "For venues playing music publicly",
      count: 89,
      revenue: "N$234,500",
    },
    {
      name: "Broadcasting",
      description: "For radio and TV stations",
      count: 12,
      revenue: "N$456,000",
    },
    {
      name: "Synchronization",
      description: "For music in audiovisual content",
      count: 34,
      revenue: "N$123,400",
    },
    {
      name: "Mechanical",
      description: "For reproduction and distribution",
      count: 21,
      revenue: "N$67,800",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-500">Active</Badge>
      case "Pending Renewal":
        return (
          <Badge variant="outline" className="text-amber-600">
            Pending Renewal
          </Badge>
        )
      case "Expired":
        return <Badge variant="destructive">Expired</Badge>
      case "Suspended":
        return <Badge variant="secondary">Suspended</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Radio":
      case "Television":
        return <Building className="h-4 w-4" />
      case "Retail":
      case "Restaurant":
        return <Building className="h-4 w-4" />
      default:
        return <Music className="h-4 w-4" />
    }
  }

  const filteredLicenses = licenses.filter((license) => {
    const matchesSearch =
      searchQuery === "" ||
      license.licensee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      license.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || license.status.toLowerCase().replace(" ", "-") === statusFilter
    const matchesType = typeFilter === "all" || license.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
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
          <h1 className="text-3xl font-bold tracking-tight">Licenses</h1>
          <p className="text-muted-foreground">Manage music licensing and permissions</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Issue New License
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

      <Tabs defaultValue="licenses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="licenses">Active Licenses</TabsTrigger>
          <TabsTrigger value="types">License Types</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
        </TabsList>

        <TabsContent value="licenses" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search licenses..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending-renewal">Pending Renewal</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Public Performance">Public Performance</SelectItem>
                    <SelectItem value="Broadcasting">Broadcasting</SelectItem>
                    <SelectItem value="Synchronization">Synchronization</SelectItem>
                    <SelectItem value="Mechanical">Mechanical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Licenses Table */}
          <Card>
            <CardHeader>
              <CardTitle>Licenses ({filteredLicenses.length})</CardTitle>
              <CardDescription>Manage active licenses and renewals</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>License ID</TableHead>
                    <TableHead>Licensee</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Fee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLicenses.map((license) => (
                    <TableRow key={license.id}>
                      <TableCell>
                        <div className="font-medium">{license.id}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(license.category)}
                          <div>
                            <div className="font-medium">{license.licensee}</div>
                            <div className="text-sm text-muted-foreground">{license.category}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{license.type}</div>
                          <div className="text-sm text-muted-foreground">{license.songsCount} songs</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">{new Date(license.startDate).toLocaleDateString()}</div>
                          <div className="text-sm text-muted-foreground">
                            to {new Date(license.endDate).toLocaleDateString()}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{license.fee}</div>
                      </TableCell>
                      <TableCell>{getStatusBadge(license.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="types" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {licenseTypes.map((type) => (
              <Card key={type.name}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck className="h-5 w-5" />
                    {type.name}
                  </CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl font-bold">{type.count}</div>
                      <div className="text-sm text-muted-foreground">Active Licenses</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{type.revenue}</div>
                      <div className="text-sm text-muted-foreground">Total Revenue</div>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-transparent" variant="outline">
                    Manage {type.name} Licenses
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>License Applications</CardTitle>
              <CardDescription>Review and process new license applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <FileCheck className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No Pending Applications</p>
                <p className="text-sm text-muted-foreground">New license applications will appear here for review</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
