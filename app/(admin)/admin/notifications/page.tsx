"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, CheckCircle, XCircle, Search, MoreHorizontal, Send } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Notification {
  id: string
  type: "approval" | "rejection" | "system" | "message"
  title: string
  message: string
  recipient: string
  date: string
  read: boolean
}

export default function NotificationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [showNewMessageDialog, setShowNewMessageDialog] = useState(false)
  const [selectedRecipient, setSelectedRecipient] = useState("")
  const [messageSubject, setMessageSubject] = useState("")
  const [messageContent, setMessageContent] = useState("")
  const [isSending, setIsSending] = useState(false)

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "approval",
      title: "Song Approved: Desert Rose",
      message: "You have approved 'Desert Rose' by John Doe. The artist has been notified.",
      recipient: "Admin",
      date: "2023-05-08T10:30:00",
      read: false,
    },
    {
      id: "2",
      type: "rejection",
      title: "Song Rejected: Mountain Echo",
      message:
        "You have rejected 'Mountain Echo' by David Nujoma due to copyright concerns. The artist has been notified.",
      recipient: "Admin",
      date: "2023-05-07T14:15:00",
      read: false,
    },
    {
      id: "3",
      type: "system",
      title: "New Song Submission",
      message: "A new song 'Tribal Drums' has been submitted by Victoria Ndongo and is awaiting your review.",
      recipient: "Admin",
      date: "2023-05-06T09:45:00",
      read: true,
    },
    {
      id: "4",
      type: "message",
      title: "Message to John Doe",
      message: "Your song 'Desert Rose' has been approved and is now registered in our system. Congratulations!",
      recipient: "John Doe",
      date: "2023-05-08T10:35:00",
      read: true,
    },
    {
      id: "5",
      type: "message",
      title: "Message to David Nujoma",
      message:
        "Your song 'Mountain Echo' has been rejected due to copyright concerns. Please review our guidelines and resubmit if appropriate.",
      recipient: "David Nujoma",
      date: "2023-05-07T14:20:00",
      read: true,
    },
  ])

  const users = [
    { id: "1", name: "John Doe" },
    { id: "2", name: "Maria Nangolo" },
    { id: "3", name: "Thomas Shilongo" },
    { id: "4", name: "Sarah Amukwaya" },
    { id: "5", name: "Peter Nakashona" },
    { id: "6", name: "David Nujoma" },
    { id: "7", name: "Victoria Ndongo" },
  ]

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.recipient.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "unread") return matchesSearch && !notification.read
    if (activeTab === "sent") return matchesSearch && notification.type === "message"
    if (activeTab === "system") return matchesSearch && notification.type === "system"

    return matchesSearch
  })

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const sendMessage = () => {
    if (!selectedRecipient || !messageSubject || !messageContent) return

    setIsSending(true)

    // Simulate API call
    setTimeout(() => {
      const newNotification: Notification = {
        id: crypto.randomUUID(),
        type: "message",
        title: `Message to ${selectedRecipient}: ${messageSubject}`,
        message: messageContent,
        recipient: selectedRecipient,
        date: new Date().toISOString(),
        read: true,
      }

      setNotifications((prev) => [newNotification, ...prev])
      setIsSending(false)
      setShowNewMessageDialog(false)
      setSelectedRecipient("")
      setMessageSubject("")
      setMessageContent("")

      // Play notification sound
      const audio = new Audio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/notification_o14egLP-cpjJRo3ZRaY1cMojHqzHBvBAe78gG6.mp3")
      audio.play().catch((err) => console.error("Error playing audio:", err))
    }, 1500)
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "approval":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "rejection":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "system":
        return <Bell className="h-5 w-5 text-amber-500" />
      case "message":
        return <Send className="h-5 w-5 text-blue-500" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground">Manage system notifications and messages to users.</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread ({notifications.filter((n) => !n.read).length})</TabsTrigger>
            <TabsTrigger value="sent">Sent Messages</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notifications..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Bell className="h-4 w-4" />
            Mark All as Read
          </Button>
          <Dialog open={showNewMessageDialog} onOpenChange={setShowNewMessageDialog}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Send className="h-4 w-4" />
                New Message
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Send New Message</DialogTitle>
                <DialogDescription>Send a notification message to a user in the system.</DialogDescription>
              </DialogHeader>

              <div className="py-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recipient">Recipient</Label>
                  <Select value={selectedRecipient} onValueChange={setSelectedRecipient}>
                    <SelectTrigger id="recipient">
                      <SelectValue placeholder="Select a user" />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.name}>
                          {user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Message subject"
                    value={messageSubject}
                    onChange={(e) => setMessageSubject(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Type your message here..."
                    rows={5}
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowNewMessageDialog(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={sendMessage}
                  disabled={isSending || !selectedRecipient || !messageSubject || !messageContent}
                >
                  {isSending ? (
                    <motion.div
                      className="h-4 w-4 rounded-full border-2 border-white border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium">No notifications found</p>
              <p className="text-sm text-muted-foreground">
                {searchTerm ? "Try a different search term" : "You're all caught up!"}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Card className={notification.read ? "" : "border-primary"}>
                <CardHeader className="pb-2 flex flex-row items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                    <div>
                      <CardTitle className="text-base">{notification.title}</CardTitle>
                      <CardDescription className="text-xs">
                        {notification.type === "message"
                          ? `To: ${notification.recipient}`
                          : `For: ${notification.recipient}`}{" "}
                        • {new Date(notification.date).toLocaleString()}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!notification.read && (
                      <Badge variant="default" className="bg-primary">
                        New
                      </Badge>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {!notification.read && (
                          <DropdownMenuItem onClick={() => markAsRead(notification.id)}>Mark as Read</DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => deleteNotification(notification.id)}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{notification.message}</p>
                </CardContent>
                {notification.type === "message" && (
                  <CardFooter className="pt-0">
                    <Button variant="outline" size="sm" className="ml-auto">
                      <Send className="mr-2 h-3 w-3" />
                      Send Follow-up
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
