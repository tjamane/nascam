"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { UserCheck, Clock, CheckCircle, XCircle, Eye, Filter, Search, Download } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

export default function MemberApplicationsPage() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const applications = [
    {
      id: "APP-2024-008",
      name: "Maria Santos",
      email: "maria@example.com",
      phone: "+264 81 567 8901",
      genres: ["Traditional", "Afro Pop"],
      instruments: ["Vocals", "Marimba"],
      submitted: "2024-03-15",
      status: "Pending",
      documents: ["ID Copy", "Portfolio", "Demo Recording"],
    },
    {
      id: "APP-2024-007",
      name: "David Nambira",
      email: "david.nambira@email.com",
      phone: "+264 85 234 5678",
      genres: ["Jazz", "Contemporary"],
      instruments: ["Piano", "Saxophone"],
      submitted: "2024-03-12",
      status: "Under Review",
      documents: ["ID Copy", "CV", "Music Samples"],
    },
    {
      id: "APP-2024-006",
      name: "Anna Kashindi",
      email: "anna.k@example.com",
      phone: "+264 81 345 6789",
      genres: ["Gospel", "Traditional"],
      instruments: ["Vocals", "Guitar"],
      submitted: "2024-03-10",
      status: "Approved",
      documents: ["ID Copy", "Portfolio", "References"],
    },
  ]

  const stats = [
    {
      title: "Pending Applications",
      value: "8",
      icon: Clock,
      color: "bg-amber-500/10 text-amber-500",
    },
    {
      title: "Under Review",
      value: "5",
      icon: Eye,
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "Approved This Month",
      value: "12",
      icon: CheckCircle,
      color: "bg-green-500/10 text-green-500",
    },
    {
      title: "Total Applications",
      value: "156",
      icon: UserCheck,
      color: "bg-purple-500/10 text-purple-500",
    },
  ]

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return (
          <Badge variant="outline" className="text-amber-600">
            Pending
          </Badge>
        )
      case "Under Review":
        return <Badge variant="secondary">Under Review</Badge>
      case "Approved":
        return (
          <Badge variant="default" className="bg-green-500">
            Approved
          </Badge>
        )
      case "Rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredApplications = applications.filter((app) => {
    const matchesStatus = statusFilter === "all" || app.status.toLowerCase().replace(" ", "-") === statusFilter
    const matchesSearch =
      searchQuery === "" ||
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Member Applications</h1>
          <p className="text-muted-foreground">Review and approve new NASCAM membership applications</p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Applications
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

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search applications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="under-review">Under Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Applications ({filteredApplications.length})</CardTitle>
          <CardDescription>Manage membership applications and review candidate information</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Genres</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" alt={application.name} />
                        <AvatarFallback>
                          {application.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{application.name}</div>
                        <div className="text-sm text-muted-foreground">{application.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">{application.email}</div>
                      <div className="text-sm text-muted-foreground">{application.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {application.genres.slice(0, 2).map((genre) => (
                        <Badge key={genre} variant="outline" className="text-xs">
                          {genre}
                        </Badge>
                      ))}
                      {application.genres.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{application.genres.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{new Date(application.submitted).toLocaleDateString()}</TableCell>
                  <TableCell>{getStatusBadge(application.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Application Details - {application.name}</DialogTitle>
                            <DialogDescription>Review the complete application information</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="text-sm font-medium">Full Name</Label>
                                <p className="text-sm">{application.name}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Application ID</Label>
                                <p className="text-sm">{application.id}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Email</Label>
                                <p className="text-sm">{application.email}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Phone</Label>
                                <p className="text-sm">{application.phone}</p>
                              </div>
                            </div>
                            <Separator />
                            <div>
                              <Label className="text-sm font-medium">Musical Genres</Label>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {application.genres.map((genre) => (
                                  <Badge key={genre} variant="secondary">
                                    {genre}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">Instruments</Label>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {application.instruments.map((instrument) => (
                                  <Badge key={instrument} variant="outline">
                                    {instrument}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">Documents Submitted</Label>
                              <div className="space-y-2 mt-2">
                                {application.documents.map((doc, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center justify-between p-2 bg-secondary/20 rounded"
                                  >
                                    <span className="text-sm">{doc}</span>
                                    <Button variant="ghost" size="sm">
                                      <Download className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                            {application.status === "Pending" && (
                              <div className="space-y-4">
                                <Separator />
                                <div>
                                  <Label htmlFor="comments">Review Comments</Label>
                                  <Textarea id="comments" placeholder="Add comments about this application..." />
                                </div>
                                <div className="flex justify-end gap-2">
                                  <Button variant="outline" className="text-red-600 border-red-200 bg-transparent">
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Reject
                                  </Button>
                                  <Button className="bg-green-600 hover:bg-green-700">
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Approve
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                      {application.status === "Pending" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 border-green-200 bg-transparent"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 border-red-200 bg-transparent">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
