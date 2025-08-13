"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Music, FileText, DollarSign, Users, TrendingUp, Bell, Search, Plus, BarChart3 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const stats = [
    {
      title: "Total Registered Songs",
      value: "1,234",
      change: "+12%",
      icon: Music,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Pending Applications",
      value: "23",
      change: "+5%",
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Total Royalties",
      value: "N$45,678",
      change: "+8%",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Active Members",
      value: "567",
      change: "+3%",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  const recentActivity = [
    {
      id: 1,
      type: "registration",
      title: "New song registered",
      description: '"Desert Wind" by Maria Nghipandulwa',
      time: "2 hours ago",
      status: "completed",
    },
    {
      id: 2,
      type: "royalty",
      title: "Royalty payment processed",
      description: "Monthly distribution for October 2024",
      time: "1 day ago",
      status: "completed",
    },
    {
      id: 3,
      type: "application",
      title: "Membership application",
      description: "New artist application pending review",
      time: "2 days ago",
      status: "pending",
    },
    {
      id: 4,
      type: "license",
      title: "License issued",
      description: "Broadcasting license for NBC Radio",
      time: "3 days ago",
      status: "completed",
    },
  ]

  const quickActions = [
    {
      title: "Register New Song",
      description: "Submit a new musical work for registration",
      icon: Plus,
      href: "/dashboard/music-registration",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "View Profile",
      description: "Manage your member profile and information",
      icon: Users,
      href: "/dashboard/member-profile",
      color: "bg-green-600 hover:bg-green-700",
    },
    {
      title: "Log Sheets",
      description: "Submit performance log sheets",
      icon: FileText,
      href: "/dashboard/log-sheets",
      color: "bg-purple-600 hover:bg-purple-700",
    },
    {
      title: "Royalty Reports",
      description: "View your royalty statements and payments",
      icon: DollarSign,
      href: "/dashboard/royalties",
      color: "bg-orange-600 hover:bg-orange-700",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening with your music.</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">
              {currentTime.toLocaleDateString("en-NA", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-lg font-semibold">
              {currentTime.toLocaleTimeString("en-NA", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>Common tasks and frequently used features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={action.href}>
                  <Card className="cursor-pointer transition-all hover:shadow-md hover:scale-105">
                    <CardContent className="p-4">
                      <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-3`}>
                        <action.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-semibold mb-1">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity & Performance Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === "completed" ? "bg-green-500" : "bg-orange-500"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                  <Badge variant={activity.status === "completed" ? "default" : "secondary"}>{activity.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Performance Overview
            </CardTitle>
            <CardDescription>Your music performance this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Radio Plays</span>
                  <span className="text-sm text-muted-foreground">234 plays</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">TV Broadcasts</span>
                  <span className="text-sm text-muted-foreground">45 broadcasts</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Digital Streams</span>
                  <span className="text-sm text-muted-foreground">1,234 streams</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Live Performances</span>
                  <span className="text-sm text-muted-foreground">12 performances</span>
                </div>
                <Progress value={30} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Quick Search
          </CardTitle>
          <CardDescription>Search your registered songs, applications, and reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input placeholder="Search songs, artists, or applications..." className="w-full" />
            </div>
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
