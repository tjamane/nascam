"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FileText, Upload, Download, Calendar, Radio, Tv, Globe, CheckCircle, Clock } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export default function LogSheetsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("current")
  const [selectedBroadcaster, setSelectedBroadcaster] = useState("all")

  const logSheets = [
    {
      id: "LOG-2024-003",
      broadcaster: "NBC Radio",
      type: "Radio",
      period: "March 2024",
      submittedDate: "2024-04-02",
      status: "Processed",
      totalPlays: 1247,
      uniqueSongs: 89,
      totalRoyalties: "N$12,470",
      submittedBy: "John Manager",
    },
    {
      id: "LOG-2024-002",
      broadcaster: "One Africa TV",
      type: "Television",
      period: "March 2024",
      submittedDate: "2024-04-01",
      status: "Processing",
      totalPlays: 856,
      uniqueSongs: 67,
      totalRoyalties: "N$8,560",
      submittedBy: "Sarah Admin",
    },
    {
      id: "LOG-2024-001",
      broadcaster: "Radio Energy",
      type: "Radio",
      period: "March 2024",
      submittedDate: "2024-03-28",
      status: "Pending Review",
      totalPlays: 2134,
      uniqueSongs: 156,
      totalRoyalties: "N$21,340",
      submittedBy: "Mike Operator",
    },
  ]

  const stats = [
    {
      title: "Total Log Sheets",
      value: "24",
      icon: FileText,
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "Processed This Month",
      value: "8",
      icon: CheckCircle,
      color: "bg-green-500/10 text-green-500",
    },
    {
      title: "Pending Review",
      value: "3",
      icon: Clock,
      color: "bg-amber-500/10 text-amber-500",
    },
    {
      title: "Total Plays Tracked",
      value: "45,678",
      icon: Radio,
      color: "bg-purple-500/10 text-purple-500",
    },
  ]

  const broadcasters = [
    { name: "NBC Radio", type: "Radio", status: "Active", lastSubmission: "2024-04-02" },
    { name: "One Africa TV", type: "Television", status: "Active", lastSubmission: "2024-04-01" },
    { name: "Radio Energy", type: "Radio", status: "Active", lastSubmission: "2024-03-28" },
    { name: "TBN Namibia", type: "Television", status: "Pending", lastSubmission: "2024-03-15" },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Processed":
        return <Badge className="bg-green-500">Processed</Badge>
      case "Processing":
        return <Badge className="bg-blue-500">Processing</Badge>
      case "Pending Review":
        return (
          <Badge variant="outline" className="text-amber-600">
            Pending Review
          </Badge>
        )
      case "Rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getBroadcasterIcon = (type: string) => {
    switch (type) {
      case "Radio":
        return <Radio className="h-4 w-4" />
      case "Television":
        return <Tv className="h-4 w-4" />
      case "Online":
        return <Globe className="h-4 w-4" />
      default:
        return <Radio className="h-4 w-4" />
    }
  }

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
          <h1 className="text-3xl font-bold tracking-tight">Log Sheets</h1>
          <p className="text-muted-foreground">Manage music performance data from broadcasters</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload Log Sheet
          </Button>
        </div>
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

      <Tabs defaultValue="submissions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="submissions">Log Sheet Submissions</TabsTrigger>
          <TabsTrigger value="broadcasters">Broadcasters</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="submissions" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-[180px]">
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">Current Month</SelectItem>
                    <SelectItem value="last">Last Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedBroadcaster} onValueChange={setSelectedBroadcaster}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Broadcasters" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Broadcasters</SelectItem>
                    <SelectItem value="nbc">NBC Radio</SelectItem>
                    <SelectItem value="oneafrica">One Africa TV</SelectItem>
                    <SelectItem value="energy">Radio Energy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Log Sheets Table */}
          <Card>
            <CardHeader>
              <CardTitle>Log Sheet Submissions</CardTitle>
              <CardDescription>Review and process music performance data from broadcasters</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Log Sheet ID</TableHead>
                    <TableHead>Broadcaster</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Performance Data</TableHead>
                    <TableHead>Royalties</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logSheets.map((sheet) => (
                    <TableRow key={sheet.id}>
                      <TableCell>
                        <div className="font-medium">{sheet.id}</div>
                        <div className="text-sm text-muted-foreground">
                          Submitted {new Date(sheet.submittedDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getBroadcasterIcon(sheet.type)}
                          <div>
                            <div className="font-medium">{sheet.broadcaster}</div>
                            <div className="text-sm text-muted-foreground">{sheet.type}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{sheet.period}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">{sheet.totalPlays.toLocaleString()} plays</div>
                          <div className="text-sm text-muted-foreground">{sheet.uniqueSongs} unique songs</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{sheet.totalRoyalties}</div>
                      </TableCell>
                      <TableCell>{getStatusBadge(sheet.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
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

        <TabsContent value="broadcasters" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Registered Broadcasters</CardTitle>
              <CardDescription>Manage broadcasters and their submission requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {broadcasters.map((broadcaster) => (
                  <Card key={broadcaster.name}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          {getBroadcasterIcon(broadcaster.type)}
                          <div>
                            <h3 className="font-medium">{broadcaster.name}</h3>
                            <p className="text-sm text-muted-foreground">{broadcaster.type}</p>
                          </div>
                        </div>
                        <Badge variant={broadcaster.status === "Active" ? "default" : "secondary"}>
                          {broadcaster.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Last Submission:</span>
                          <span>{new Date(broadcaster.lastSubmission).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Compliance:</span>
                          <span className="text-green-600">100%</span>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" size="sm">
                          View History
                        </Button>
                        <Button variant="outline" size="sm">
                          Contact
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance Trends</CardTitle>
                <CardDescription>Music performance data over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-lg font-medium">Performance Analytics</p>
                    <p className="text-sm text-muted-foreground">Chart showing monthly performance trends</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Songs</CardTitle>
                <CardDescription>Most played songs this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "Desert Rose", artist: "Maria Santos", plays: 234 },
                    { title: "Namibian Sunset", artist: "David Nambira", plays: 198 },
                    { title: "Windhoek Nights", artist: "Anna Kashindi", plays: 167 },
                  ].map((song, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{song.title}</div>
                        <div className="text-sm text-muted-foreground">{song.artist}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{song.plays} plays</div>
                        <Progress value={(song.plays / 234) * 100} className="w-20 h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
