"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Search, FileText, Calendar, Building, Users, AlertCircle, CheckCircle } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function LicenseLookupPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchType, setSearchType] = useState("song")

  const licenses = [
    {
      id: "LIC-2024-001",
      songTitle: "Desert Rose",
      licensee: "Radio Kudu",
      type: "Broadcasting",
      period: "2024-01-01 to 2024-12-31",
      status: "Active",
      fee: "N$2,500.00",
      usageCount: 45,
    },
    {
      id: "LIC-2024-002",
      songTitle: "Namibian Sunset",
      licensee: "NBC Television",
      type: "Synchronization",
      period: "2024-02-01 to 2024-07-31",
      status: "Active",
      fee: "N$5,000.00",
      usageCount: 12,
    },
    {
      id: "LIC-2024-003",
      songTitle: "Windhoek Nights",
      licensee: "Kalahari Mall",
      type: "Public Performance",
      period: "2024-03-01 to 2024-03-31",
      status: "Expired",
      fee: "N$750.00",
      usageCount: 8,
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
      case "Active":
        return (
          <Badge variant="default" className="bg-green-500">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </Badge>
        )
      case "Expired":
        return (
          <Badge variant="destructive">
            <AlertCircle className="w-3 h-3 mr-1" />
            Expired
          </Badge>
        )
      case "Pending":
        return <Badge variant="outline">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredLicenses = licenses.filter(
    (license) =>
      searchQuery === "" ||
      license.songTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      license.licensee.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">License Lookup</h1>
          <p className="text-muted-foreground">Track who is using your music and monitor license agreements</p>
        </div>

        {/* Search Section */}
        <Card>
          <CardHeader>
            <CardTitle>Search Licenses</CardTitle>
            <CardDescription>Find information about how your music is being used</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="search-type">Search Type</Label>
                <Select value={searchType} onValueChange={setSearchType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="song">By Song Title</SelectItem>
                    <SelectItem value="licensee">By Licensee</SelectItem>
                    <SelectItem value="license">By License ID</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="search-query">Search Query</Label>
                <div className="flex gap-2">
                  <Input
                    id="search-query"
                    placeholder="Enter song title, licensee, or license ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button>
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
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
              <CardTitle className="text-sm font-medium">Active Licenses</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">Currently in use</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Licensees</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Organizations using your music</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">License Revenue</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">N$28,750</div>
              <p className="text-xs text-muted-foreground">From active licenses</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
              <AlertCircle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Within 30 days</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Search Results */}
      <Card>
        <CardHeader>
          <CardTitle>License Information</CardTitle>
          <CardDescription>
            {searchQuery ? `Search results for "${searchQuery}"` : "All your music licenses"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredLicenses.length === 0 ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>No licenses found matching your search criteria.</AlertDescription>
            </Alert>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>License ID</TableHead>
                  <TableHead>Song Title</TableHead>
                  <TableHead>Licensee</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLicenses.map((license) => (
                  <TableRow key={license.id}>
                    <TableCell className="font-medium">{license.id}</TableCell>
                    <TableCell>{license.songTitle}</TableCell>
                    <TableCell>{license.licensee}</TableCell>
                    <TableCell>{license.type}</TableCell>
                    <TableCell>{license.period}</TableCell>
                    <TableCell>{license.usageCount} times</TableCell>
                    <TableCell>{license.fee}</TableCell>
                    <TableCell>{getStatusBadge(license.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* License Types Info */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              Broadcasting License
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Allows radio and TV stations to broadcast your music to their audience.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-500" />
              Public Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Permits venues, restaurants, and public spaces to play your music.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-500" />
              Synchronization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Allows your music to be used in films, TV shows, and advertisements.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
