"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, XCircle, Search, AlertCircle, Loader2 } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"

interface PendingSong {
  id: string
  title: string
  artist: string
  genre: string
  submissionDate: string
  status: "pending" | "approved" | "rejected"
  comment?: string
}

export default function AdminPendingSongsPage() {
  const [pendingSongs, setPendingSongs] = useState<PendingSong[]>([
    {
      id: "ps001",
      title: "Sunrise Serenade",
      artist: "Aisha Khan",
      genre: "Afro Pop",
      submissionDate: "2024-07-20",
      status: "pending",
    },
    {
      id: "ps002",
      title: "City Lights",
      artist: "The Urban Echoes",
      genre: "Hip Hop",
      submissionDate: "2024-07-19",
      status: "pending",
    },
    {
      id: "ps003",
      title: "Whispering Winds",
      artist: "Lena Petrova",
      genre: "Classical",
      submissionDate: "2024-07-18",
      status: "pending",
    },
    {
      id: "ps004",
      title: "Rhythm of the Soul",
      artist: "Marcus 'Groove' Davis",
      genre: "R&B",
      submissionDate: "2024-07-17",
      status: "pending",
    },
    {
      id: "ps005",
      title: "Desert Bloom",
      artist: "Zara Al-Farsi",
      genre: "Traditional",
      submissionDate: "2024-07-16",
      status: "pending",
    },
  ])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSong, setSelectedSong] = useState<PendingSong | null>(null)
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const filteredSongs = pendingSongs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.genre.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleActionClick = (song: PendingSong, type: "approve" | "reject") => {
    setSelectedSong(song)
    setActionType(type)
    setComment(song.comment || "") // Pre-fill comment if exists
  }

  const handleConfirmAction = () => {
    if (!selectedSong || !actionType) return

    setIsSubmitting(true)
    setTimeout(() => {
      setPendingSongs((prevSongs) =>
        prevSongs.map((song) =>
          song.id === selectedSong.id ? { ...song, status: actionType, comment: comment.trim() || undefined } : song,
        ),
      )
      setSelectedSong(null)
      setActionType(null)
      setComment("")
      setIsSubmitting(false)
    }, 1000) // Simulate API call
  }

  const getStatusBadge = (status: PendingSong["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      case "approved":
        return <Badge className="bg-green-500 hover:bg-green-600">Approved</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return null
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Pending Songs</h1>
        <p className="text-muted-foreground">Review and manage music submissions awaiting approval.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Song Submissions</CardTitle>
          <CardDescription>List of songs submitted by members that require your review.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title, artist, or genre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4"
            />
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Artist</TableHead>
                  <TableHead>Genre</TableHead>
                  <TableHead>Submission Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSongs.length > 0 ? (
                  filteredSongs.map((song) => (
                    <TableRow key={song.id}>
                      <TableCell className="font-medium">{song.title}</TableCell>
                      <TableCell>{song.artist}</TableCell>
                      <TableCell>{song.genre}</TableCell>
                      <TableCell>{song.submissionDate}</TableCell>
                      <TableCell>{getStatusBadge(song.status)}</TableCell>
                      <TableCell className="text-right space-x-2">
                        {song.status === "pending" ? (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleActionClick(song, "approve")}
                              className="text-green-600 hover:text-green-700 hover:bg-green-50"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleActionClick(song, "reject")}
                              className="text-destructive hover:text-destructive/90 hover:bg-destructive/5"
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject
                            </Button>
                          </>
                        ) : (
                          <Button variant="outline" size="sm" disabled>
                            {song.status === "approved" ? "Approved" : "Rejected"}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      No pending songs found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Approval/Rejection Confirmation Dialog */}
      <AlertDialog open={!!selectedSong} onOpenChange={() => setSelectedSong(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{actionType === "approve" ? "Approve Song" : "Reject Song"}</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to {actionType} the song &quot;{selectedSong?.title}&quot; by {selectedSong?.artist}.
              {actionType === "reject" && (
                <div className="mt-2 flex items-center text-sm text-destructive"> {/* Changed <p> to <div> */}
                  <AlertCircle className="h-4 w-4 mr-1" />
                  Rejection is final and will notify the artist.
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="comment">Comment (Optional)</Label>
              <Textarea
                id="comment"
                placeholder="Add a comment for the artist (e.g., reasons for rejection, feedback for approval)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
            <Button
              onClick={handleConfirmAction}
              disabled={isSubmitting}
              className={actionType === "reject" ? "bg-destructive hover:bg-destructive/90" : ""}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                `Confirm ${actionType === "approve" ? "Approval" : "Rejection"}`
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  )
}
