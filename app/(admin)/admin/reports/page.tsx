"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { BarChart3, Download, Calendar, TrendingUp, Users, DollarSign, FileText, Filter } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")
  const [selectedReport, setSelectedReport] = useState("overview")

  const reportTypes = [
    {
      id: "financial",
      name: "Financial Reports",
      description: "Revenue, royalties, and financial analytics",
      icon: DollarSign,
      reports: ["Monthly Revenue", "Royalty Distribution", "License Revenue", "Payment Reports"],
    },
    {
      id: "membership",
      name: "Membership Reports",
      description: "Member statistics and growth analytics",
      icon: Users,
      reports: ["Member Growth", "Application Status", "Member Demographics", "Retention Analysis"],
    },
    {
      id: "performance",
      name: "Performance Reports",
      description: "Music performance and usage analytics",
      icon: TrendingUp,
      reports: ["Top Performing Songs", "Broadcaster Analytics", "Genre Analysis", "Play Statistics"],
    },
    {
      id: "compliance",
      name: "Compliance Reports",
      description: "License compliance and inspection reports",
      icon: FileText,
      reports: ["License Compliance", "Inspection Results", "Violation Reports", "Audit Trails"],
    },
  ]

  const quickStats = [
    {
      title: "Total Revenue",
      value: "N$1,234,567",
      change: "+15.2%",
      period: "This Quarter",
      icon: DollarSign,
      color: "bg-green-500/10 text-green-500",
    },
    {
      title: "Active Members",
      value: "1,456",
      change: "+8.3%",
      period: "This Month",
      icon: Users,
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "Songs Registered",
      value: "12,345",
      change: "+12.7%",
      period: "This Year",
      icon: FileText,
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      title: "License Revenue",
      value: "N$456,789",
      change: "+9.1%",
      period: "This Quarter",
      icon: TrendingUp,
      color: "bg-amber-500/10 text-amber-500",
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">Generate and analyze business intelligence reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Report
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export All
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        {quickStats.map((stat, index) => (
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
                  {stat.change} {stat.period}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="membership">Membership</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Report Categories */}
          <div className="grid gap-4 md:grid-cols-2">
            {reportTypes.map((category) => (
              <Card key={category.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <category.icon className="h-5 w-5" />
                    {category.name}
                  </CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {category.reports.map((report, index) => (
                      <div key={index} className="flex items-center justify-between p-2 hover:bg-secondary/50 rounded">
                        <span className="text-sm">{report}</span>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4 bg-transparent" variant="outline">
                    View All {category.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          {/* Financial Reports */}
          <Card>
            <CardHeader>
              <CardTitle>Financial Analytics</CardTitle>
              <CardDescription>Revenue and financial performance reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Advanced Filters
                </Button>
              </div>

              <div className="h-[400px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">Financial Analytics Chart</p>
                  <p className="text-sm text-muted-foreground">Revenue trends and financial performance metrics</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="membership" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Membership Analytics</CardTitle>
              <CardDescription>Member growth and demographic analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                <div className="text-center">
                  <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">Membership Analytics</p>
                  <p className="text-sm text-muted-foreground">Member growth trends and demographic breakdowns</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>Music performance and usage statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">Performance Analytics</p>
                  <p className="text-sm text-muted-foreground">Song performance and broadcaster analytics</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Reports</CardTitle>
              <CardDescription>License compliance and inspection analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                <div className="text-center">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">Compliance Analytics</p>
                  <p className="text-sm text-muted-foreground">License compliance and inspection reports</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
