"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Users, Search, Edit, Eye, Mail, Phone, Music, Award, MoreHorizontal } from "lucide-react"

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function ArtistProfilesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [membershipFilter, setMembershipFilter] = useState("all")

  const artists = [
    {
      id: "ART-001",
      name: "Maria Santos",
      stageName: "Maria S",
      email: "maria@example.com",
      phone: "+264 81 567 8901",
      membershipType: "Composer",
      status: "Active",
      joinDate: "2023-01-15",
      totalWorks: 24,
      totalEarnings: "N$45,230",
      genres: ["Traditional", "Afro Pop"],
      instruments: ["Vocals", "Marimba"],
      avatar: "/placeholder.svg",
    },
    {
      id: "ART-002",
      name: "David Nambira",
      stageName: "DJ Dave",
      email: "david.nambira@email.com",
      phone: "+264 85 234 5678",
      membershipType: "Performer",
      status: "Active",
      joinDate: "2022-08-20",
      totalWorks: 18,
      totalEarnings: "N$32,150",
      genres: ["Jazz", "Contemporary"],
      instruments: ["Piano", "Saxophone"],
      avatar: "/placeholder.svg",
    },
    {
      id: "ART-003",
      name: "Anna Kashindi",
      stageName: "Anna K",
      email: "anna.k@example.com",
      phone: "+264 81 345 6789",
      membershipType: "Author/Lyricist",
      status: "Suspended",
      joinDate: "2023-03-10",
      totalWorks: 12,
      totalEarnings: "N$18,900",
      genres: ["Gospel", "Traditional"],
      instruments: ["Vocals", "Guitar"],
      avatar: "/placeholder.svg",
    },
    {
      id: "ART-004",
      name: "Thomas Shilongo",
      stageName: "Tommy S",
      email: "thomas@example.com",
      phone: "+264 81 456 7890",
      membershipType: "Publisher",
      status: "Active",
      joinDate: "2021-11-05",
      totalWorks: 35,
      totalEarnings: "N$67,800",
      genres: ["Rock", "Pop"],
      instruments: ["Guitar", "Bass"],
      avatar: "/placeholder.svg",
    },
  ]

  const stats = [
    {
      title: "Total Artists",
      value: "156",
      icon: Users,
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "Active Members",
      value: "142",
      icon: Award,
      color: "bg-green-500/10 text-green-500",
    },
    {
      title: "New This Month",
      value: "8",
      icon: Music,
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      title: "Suspended",
      value: "3",
      icon: Users,
      color: "bg-red-500/10 text-red-500",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-500">Active</Badge>
      case "Suspended":
        return <Badge variant="destructive">Suspended</Badge>
      case "Inactive":
        return <Badge variant="secondary">Inactive</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getMembershipBadge = (type: string) => {
    const colors = {
      Composer: "bg-blue-500/10 text-blue-500",
      Performer: "bg-green-500/10 text-green-500",
      "Author/Lyricist": "bg-purple-500/10 text-purple-500",
      Publisher: "bg-orange-500/10 text-orange-500",
    }
    return (
      <Badge variant="outline" className={colors[type as keyof typeof colors] || ""}>
        {type}
      </Badge>
    )
  }

  const filteredArtists = artists.filter((artist) => {
    const matchesSearch =
      searchQuery === "" ||
      artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.stageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || artist.status.toLowerCase() === statusFilter
    const matchesMembership = membershipFilter === "all" || artist.membershipType === membershipFilter

    return matchesSearch && matchesStatus && matchesMembership
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
          <h1 className="text-3xl font-bold tracking-tight">Artist Profiles</h1>
          <p className="text-muted-foreground">Manage NASCAM member profiles and information</p>
        </div>
        <Button>
          <Users className="mr-2 h-4 w-4" />
          Add New Artist
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

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search artists..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={membershipFilter} onValueChange={setMembershipFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Membership" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Composer">Composer</SelectItem>
                <SelectItem value="Performer">Performer</SelectItem>
                <SelectItem value="Author/Lyricist">Author/Lyricist</SelectItem>
                <SelectItem value="Publisher">Publisher</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Artists Table */}
      <Card>
        <CardHeader>
          <CardTitle>Artists ({filteredArtists.length})</CardTitle>
          <CardDescription>Manage artist profiles and membership information</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Artist</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Membership</TableHead>
                <TableHead>Works</TableHead>
                <TableHead>Earnings</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredArtists.map((artist) => (
                <TableRow key={artist.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={artist.avatar || "/placeholder.svg"} alt={artist.name} />
                        <AvatarFallback>
                          {artist.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{artist.name}</div>
                        <div className="text-sm text-muted-foreground">{artist.stageName}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3" />
                        {artist.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {artist.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      {getMembershipBadge(artist.membershipType)}
                      <div className="text-xs text-muted-foreground">
                        Since {new Date(artist.joinDate).toLocaleDateString()}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium">{artist.totalWorks}</div>
                    <div className="text-xs text-muted-foreground">registered works</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium">{artist.totalEarnings}</div>
                    <div className="text-xs text-muted-foreground">total earnings</div>
                  </TableCell>
                  <TableCell>{getStatusBadge(artist.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[700px]">
                          <DialogHeader>
                            <DialogTitle>Artist Profile - {artist.name}</DialogTitle>
                            <DialogDescription>Complete artist information and statistics</DialogDescription>
                          </DialogHeader>
                          <Tabs defaultValue="profile" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                              <TabsTrigger value="profile">Profile</TabsTrigger>
                              <TabsTrigger value="works">Works</TabsTrigger>
                              <TabsTrigger value="earnings">Earnings</TabsTrigger>
                            </TabsList>
                            <TabsContent value="profile" className="space-y-4">
                              <div className="flex items-center gap-4">
                                <Avatar className="h-16 w-16">
                                  <AvatarImage src={artist.avatar || "/placeholder.svg"} alt={artist.name} />
                                  <AvatarFallback>
                                    {artist.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="text-lg font-semibold">{artist.name}</h3>
                                  <p className="text-muted-foreground">{artist.stageName}</p>
                                  {getMembershipBadge(artist.membershipType)}
                                </div>
                              </div>
                              <Separator />
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-sm font-medium">Email</Label>
                                  <p className="text-sm">{artist.email}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Phone</Label>
                                  <p className="text-sm">{artist.phone}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Member Since</Label>
                                  <p className="text-sm">{new Date(artist.joinDate).toLocaleDateString()}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Status</Label>
                                  <div className="mt-1">{getStatusBadge(artist.status)}</div>
                                </div>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Genres</Label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {artist.genres.map((genre) => (
                                    <Badge key={genre} variant="secondary">
                                      {genre}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Instruments</Label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {artist.instruments.map((instrument) => (
                                    <Badge key={instrument} variant="outline">
                                      {instrument}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </TabsContent>
                            <TabsContent value="works" className="space-y-4">
                              <div className="text-center py-8">
                                <Music className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                                <p className="text-lg font-medium">{artist.totalWorks} Registered Works</p>
                                <p className="text-sm text-muted-foreground">
                                  Complete works catalog would be displayed here
                                </p>
                              </div>
                            </TabsContent>
                            <TabsContent value="earnings" className="space-y-4">
                              <div className="text-center py-8">
                                <Award className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                                <p className="text-lg font-medium">{artist.totalEarnings}</p>
                                <p className="text-sm text-muted-foreground">
                                  Detailed earnings breakdown would be displayed here
                                </p>
                              </div>
                            </TabsContent>
                          </Tabs>
                        </DialogContent>
                      </Dialog>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Message
                          </DropdownMenuItem>
                          {artist.status === "Active" ? (
                            <DropdownMenuItem className="text-red-600">Suspend Account</DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-green-600">Activate Account</DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
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
