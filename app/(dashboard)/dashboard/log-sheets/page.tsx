"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Radio, Tv, Music, Users, Plus, Eye, Download } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function LogSheetsPage() {
  const [selectedTab, setSelectedTab] = useState("upload")

  const logSheets = [
    {
      id: "LS-2024-001",
      station: "Radio Kudu",
      type: "Radio",
      period: "January 2024",
      songs: 45,
      status: "Processed",
      submitted: "2024-01-31",
      royalties: "N$892.50",
    },
    {
      id: "LS-2024-002",
      station: "NBC TV",
      type: "Television",
      period: "January 2024",
      songs: 12,
      status: "Processing",
      submitted: "2024-02-01",
      royalties: "N$456.00",
    },
    {
      id: "LS-2024-003",
      station: "Radio Wave",
      type: "Radio",
      period: "February 2024",
      songs: 38,
      status: "Pending",
      submitted: "2024-02-28",
      royalties: "-",
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
      case "Processed":
        return <Badge variant="default">Processed</Badge>
      case "Processing":
        return <Badge variant="secondary">Processing</Badge>
      case "Pending":
        return <Badge variant="outline">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Log Sheets</h1>
          <p className="text-muted-foreground">Track music performance across different platforms</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Upload Log Sheet
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Upload New Log Sheet</DialogTitle>
              <DialogDescription>
                Upload performance data from radio stations, TV channels, or streaming platforms.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="platform-type">Platform Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="radio">Radio Station</SelectItem>
                    <SelectItem value="television">Television</SelectItem>
                    <SelectItem value="streaming">Streaming Service</SelectItem>
                    <SelectItem value="live">Live Venue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="station-name">Station/Platform Name</Label>
                <Input id="station-name" placeholder="e.g., Radio Kudu" />
              </div>
              <div>
                <Label htmlFor="period">Reporting Period</Label>
                <Input id="period" type="month" />
              </div>
              <div>
                <Label htmlFor="log-file">Log Sheet File</Label>
                <Input id="log-file" type="file" accept=".csv,.xlsx,.xls" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Upload</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
          >
            <motion.div variants={item}>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <Radio className="h-12 w-12 text-blue-500 mb-4" />
                  <h3 className="font-semibold mb-2">Radio Stations</h3>
                  <p className="text-sm text-muted-foreground">Upload airplay data from radio stations</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <Tv className="h-12 w-12 text-purple-500 mb-4" />
                  <h3 className="font-semibold mb-2">Television</h3>
                  <p className="text-sm text-muted-foreground">Track TV broadcasts and music videos</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <Music className="h-12 w-12 text-green-500 mb-4" />
                  <h3 className="font-semibold mb-2">Streaming</h3>
                  <p className="text-sm text-muted-foreground">Digital platform performance data</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <Users className="h-12 w-12 text-orange-500 mb-4" />
                  <h3 className="font-semibold mb-2">Live Venues</h3>
                  <p className="text-sm text-muted-foreground">Concert and event performance logs</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Log Sheet History</CardTitle>
              <CardDescription>View all submitted log sheets and their processing status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Log Sheet ID</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Songs</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Royalties</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logSheets.map((sheet) => (
                    <TableRow key={sheet.id}>
                      <TableCell className="font-medium">{sheet.id}</TableCell>
                      <TableCell>{sheet.station}</TableCell>
                      <TableCell>{sheet.type}</TableCell>
                      <TableCell>{sheet.period}</TableCell>
                      <TableCell>{sheet.songs}</TableCell>
                      <TableCell>{getStatusBadge(sheet.status)}</TableCell>
                      <TableCell>{sheet.royalties}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
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

        <TabsContent value="analytics">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total Submissions</span>
                    <span className="text-2xl font-bold">95</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Songs Tracked</span>
                    <span className="text-2xl font-bold">1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total Royalties</span>
                    <span className="text-2xl font-bold">N$12,450</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Songs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Desert Rose</span>
                    <span className="text-sm font-medium">45 plays</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Namibian Sunset</span>
                    <span className="text-sm font-medium">38 plays</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Windhoek Nights</span>
                    <span className="text-sm font-medium">29 plays</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Radio Station Template</CardTitle>
                <CardDescription>Standard format for radio airplay logs</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download CSV Template
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>TV Broadcast Template</CardTitle>
                <CardDescription>Format for television music usage tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Excel Template
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Live Venue Template</CardTitle>
                <CardDescription>Concert and event performance logging</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF Template
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
