"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DollarSign, TrendingUp, Users, FileText, Play, Download, Calculator } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export default function RoyaltyProcessingPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("march-2024")

  const royaltyData = [
    {
      artist: "Maria Santos",
      totalPlays: 1247,
      grossRoyalties: "N$12,470",
      deductions: "N$1,247",
      netRoyalties: "N$11,223",
      status: "Processed",
      paymentDate: "2024-04-15",
    },
    {
      artist: "David Nambira",
      totalPlays: 856,
      grossRoyalties: "N$8,560",
      deductions: "N$856",
      netRoyalties: "N$7,704",
      status: "Processing",
      paymentDate: "2024-04-15",
    },
    {
      artist: "Anna Kashindi",
      totalPlays: 634,
      grossRoyalties: "N$6,340",
      deductions: "N$634",
      netRoyalties: "N$5,706",
      status: "Pending",
      paymentDate: "2024-04-15",
    },
  ]

  const stats = [
    {
      title: "Total Royalties",
      value: "N$456,789",
      icon: DollarSign,
      color: "bg-green-500/10 text-green-500",
      change: "+12.5%",
    },
    {
      title: "Artists Paid",
      value: "142",
      icon: Users,
      color: "bg-blue-500/10 text-blue-500",
      change: "+8",
    },
    {
      title: "Total Plays",
      value: "89,456",
      icon: Play,
      color: "bg-purple-500/10 text-purple-500",
      change: "+15.2%",
    },
    {
      title: "Processing Status",
      value: "85%",
      icon: Calculator,
      color: "bg-amber-500/10 text-amber-500",
      change: "Complete",
    },
  ]

  const paymentBatches = [
    {
      id: "BATCH-2024-03",
      period: "March 2024",
      totalAmount: "N$456,789",
      artistCount: 142,
      status: "Processing",
      createdDate: "2024-04-01",
      paymentDate: "2024-04-15",
    },
    {
      id: "BATCH-2024-02",
      period: "February 2024",
      totalAmount: "N$398,234",
      artistCount: 138,
      status: "Completed",
      createdDate: "2024-03-01",
      paymentDate: "2024-03-15",
    },
    {
      id: "BATCH-2024-01",
      period: "January 2024",
      totalAmount: "N$423,567",
      artistCount: 145,
      status: "Completed",
      createdDate: "2024-02-01",
      paymentDate: "2024-02-15",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Processed":
        return <Badge className="bg-green-500">Processed</Badge>
      case "Processing":
        return <Badge className="bg-blue-500">Processing</Badge>
      case "Pending":
        return (
          <Badge variant="outline" className="text-amber-600">
            Pending
          </Badge>
        )
      case "Completed":
        return <Badge className="bg-green-500">Completed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
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
          <h1 className="text-3xl font-bold tracking-tight">Royalty Processing</h1>
          <p className="text-muted-foreground">Calculate and distribute royalty payments to artists</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button>
            <Calculator className="mr-2 h-4 w-4" />
            Process Royalties
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
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3" />
                  {stat.change} from last month
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <Tabs defaultValue="current" className="space-y-4">
        <TabsList>
          <TabsTrigger value="current">Current Processing</TabsTrigger>
          <TabsTrigger value="batches">Payment Batches</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          {/* Period Selection */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="march-2024">March 2024</SelectItem>
                    <SelectItem value="february-2024">February 2024</SelectItem>
                    <SelectItem value="january-2024">January 2024</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Processing Progress</span>
                    <span className="text-sm text-muted-foreground">85% Complete</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Royalty Calculations */}
          <Card>
            <CardHeader>
              <CardTitle>Royalty Calculations - March 2024</CardTitle>
              <CardDescription>Individual artist royalty calculations and payment details</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Artist</TableHead>
                    <TableHead>Total Plays</TableHead>
                    <TableHead>Gross Royalties</TableHead>
                    <TableHead>Deductions</TableHead>
                    <TableHead>Net Royalties</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {royaltyData.map((artist, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="font-medium">{artist.artist}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Play className="h-4 w-4 text-muted-foreground" />
                          {artist.totalPlays.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{artist.grossRoyalties}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-red-600">{artist.deductions}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-green-600">{artist.netRoyalties}</div>
                      </TableCell>
                      <TableCell>{getStatusBadge(artist.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                          {artist.status === "Processed" && (
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
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

        <TabsContent value="batches" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Batches</CardTitle>
              <CardDescription>Historical and current royalty payment batches</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Batch ID</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Artists</TableHead>
                    <TableHead>Payment Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentBatches.map((batch) => (
                    <TableRow key={batch.id}>
                      <TableCell>
                        <div className="font-medium">{batch.id}</div>
                      </TableCell>
                      <TableCell>{batch.period}</TableCell>
                      <TableCell>
                        <div className="font-medium">{batch.totalAmount}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          {batch.artistCount}
                        </div>
                      </TableCell>
                      <TableCell>{new Date(batch.paymentDate).toLocaleDateString()}</TableCell>
                      <TableCell>{getStatusBadge(batch.status)}</TableCell>
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

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Royalty Trends</CardTitle>
                <CardDescription>Royalty payments over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-lg font-medium">Royalty Trends</p>
                    <p className="text-sm text-muted-foreground">Chart showing monthly royalty distributions</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Earning Artists</CardTitle>
                <CardDescription>Highest royalty earners this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Maria Santos", earnings: "N$11,223", plays: 1247 },
                    { name: "David Nambira", earnings: "N$7,704", plays: 856 },
                    { name: "Anna Kashindi", earnings: "N$5,706", plays: 634 },
                  ].map((artist, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{artist.name}</div>
                        <div className="text-sm text-muted-foreground">{artist.plays} plays</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{artist.earnings}</div>
                        <Progress value={(artist.plays / 1247) * 100} className="w-20 h-2" />
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
