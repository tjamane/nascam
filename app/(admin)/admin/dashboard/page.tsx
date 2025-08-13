"use client"

import { motion } from "framer-motion"
import { FileMusic, Users, Clock, CheckCircle, ArrowRight, BarChart3 } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function AdminDashboardPage() {
  const stats = [
    {
      title: "Total Songs",
      value: "156",
      icon: FileMusic,
      description: "Registered works",
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "Total Users",
      value: "48",
      icon: Users,
      description: "Registered artists",
      color: "bg-green-500/10 text-green-500",
    },
    {
      title: "Pending Approvals",
      value: "12",
      icon: Clock,
      description: "Awaiting review",
      color: "bg-amber-500/10 text-amber-500",
    },
    {
      title: "Approved Songs",
      value: "144",
      icon: CheckCircle,
      description: "Approved works",
      color: "bg-purple-500/10 text-purple-500",
    },
  ]

  const recentSubmissions = [
    {
      title: "Desert Rose",
      artist: "John Doe",
      genre: "Afro Pop",
      date: "2023-05-08",
      status: "pending",
    },
    {
      title: "Namibian Sunset",
      artist: "Maria Nangolo",
      genre: "Traditional",
      date: "2023-05-07",
      status: "pending",
    },
    {
      title: "Windhoek Nights",
      artist: "Thomas Shilongo",
      genre: "Jazz",
      date: "2023-05-06",
      status: "pending",
    },
    {
      title: "Kalahari Dreams",
      artist: "Sarah Amukwaya",
      genre: "Folk",
      date: "2023-05-05",
      status: "pending",
    },
    {
      title: "African Skies",
      artist: "Peter Nakashona",
      genre: "Fusion",
      date: "2023-05-04",
      status: "pending",
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
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the NASCAM administration panel.</p>
      </div>

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
                <p className="text-xs text-muted-foreground pt-1">{stat.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Submissions</CardTitle>
              <CardDescription>Latest songs submitted for approval</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-4">
                {recentSubmissions.map((song, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{song.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {song.artist} • {song.genre}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20">
                        Pending
                      </Badge>
                      <div className="text-sm text-muted-foreground">{new Date(song.date).toLocaleDateString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full" asChild>
                <a href="/admin/pending-songs">
                  View all pending songs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Registration Activity</CardTitle>
              <CardDescription>Song registrations over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="mx-auto h-12 w-12 text-muted" />
                  <p className="mt-2 text-sm text-muted-foreground">Chart visualization would appear here</p>
                  <p className="text-xs text-muted-foreground">(Bar chart showing monthly registrations)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
