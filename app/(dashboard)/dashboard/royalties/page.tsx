"use client"

import { motion } from "framer-motion"
import { DollarSign, TrendingUp, Calendar, Download, Eye, ArrowUpRight } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

export default function RoyaltiesPage() {
  const royaltyData = {
    totalEarnings: 12450.5,
    pendingPayments: 1245.0,
    thisMonth: 892.5,
    lastMonth: 1156.25,
    growth: 12.5,
  }

  const paymentHistory = [
    {
      id: "PAY-2024-003",
      period: "February 2024",
      amount: 1156.25,
      date: "2024-03-01",
      status: "Paid",
      songs: 45,
      breakdown: {
        radio: 678.5,
        tv: 289.75,
        streaming: 188.0,
      },
    },
    {
      id: "PAY-2024-002",
      period: "January 2024",
      amount: 892.5,
      date: "2024-02-01",
      status: "Paid",
      songs: 38,
      breakdown: {
        radio: 534.5,
        tv: 234.0,
        streaming: 124.0,
      },
    },
    {
      id: "PAY-2024-001",
      period: "December 2023",
      amount: 1345.75,
      date: "2024-01-01",
      status: "Paid",
      songs: 52,
      breakdown: {
        radio: 789.45,
        tv: 356.3,
        streaming: 200.0,
      },
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
      case "Paid":
        return <Badge variant="default">Paid</Badge>
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
          <h1 className="text-3xl font-bold tracking-tight">Royalty Reports</h1>
          <p className="text-muted-foreground">Track your earnings from music performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button>
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">N${royaltyData.totalEarnings.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">All time earnings</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">N${royaltyData.thisMonth.toLocaleString()}</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />+{royaltyData.growth}% from last month
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">N${royaltyData.pendingPayments.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Next payment: March 1</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Payment Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">75%</div>
              <Progress value={75} className="mt-2" />
              <p className="text-xs text-muted-foreground">March processing</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <Tabs defaultValue="payments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="payments">Payment History</TabsTrigger>
          <TabsTrigger value="breakdown">Revenue Breakdown</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Your royalty payments and earnings breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment ID</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Songs</TableHead>
                    <TableHead>Date Paid</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>{payment.period}</TableCell>
                      <TableCell>N${payment.amount.toLocaleString()}</TableCell>
                      <TableCell>{payment.songs}</TableCell>
                      <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
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

        <TabsContent value="breakdown">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Platform</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Radio Stations</span>
                  <span className="text-sm">N$7,234.50 (58%)</span>
                </div>
                <Progress value={58} />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Television</span>
                  <span className="text-sm">N$3,456.25 (28%)</span>
                </div>
                <Progress value={28} />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Streaming</span>
                  <span className="text-sm">N$1,759.75 (14%)</span>
                </div>
                <Progress value={14} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Earning Songs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Desert Rose</p>
                      <p className="text-xs text-muted-foreground">Afro Pop</p>
                    </div>
                    <span className="text-sm font-medium">N$2,456.50</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Namibian Sunset</p>
                      <p className="text-xs text-muted-foreground">Traditional</p>
                    </div>
                    <span className="text-sm font-medium">N$1,892.75</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Windhoek Nights</p>
                      <p className="text-xs text-muted-foreground">Jazz</p>
                    </div>
                    <span className="text-sm font-medium">N$1,534.25</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Plays</span>
                    <span className="text-sm font-medium">1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Avg. per Song</span>
                    <span className="text-sm font-medium">N$518.54</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Best Month</span>
                    <span className="text-sm font-medium">Dec 2023</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Growth Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">This Quarter</span>
                    <div className="flex items-center text-green-600">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      <span className="text-sm">+12.5%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Last Quarter</span>
                    <div className="flex items-center text-green-600">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      <span className="text-sm">+8.2%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Year over Year</span>
                    <div className="flex items-center text-green-600">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      <span className="text-sm">+24.7%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-secondary/20 rounded-lg">
                    <p className="text-sm font-medium">March 2024</p>
                    <p className="text-xs text-muted-foreground">Expected: N$1,245.00</p>
                    <p className="text-xs text-muted-foreground">Due: March 1, 2024</p>
                  </div>
                  <div className="p-3 bg-secondary/10 rounded-lg">
                    <p className="text-sm font-medium">April 2024</p>
                    <p className="text-xs text-muted-foreground">Estimated: N$950.00</p>
                    <p className="text-xs text-muted-foreground">Due: April 1, 2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
