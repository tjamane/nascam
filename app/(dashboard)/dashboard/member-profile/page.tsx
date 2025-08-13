"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { User, Camera, Save, Edit, Building } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MemberProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  const memberInfo = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+264 81 234 5678",
    membershipId: "NAM-2023-1234",
    joinDate: "January 15, 2023",
    status: "Active",
    address: "123 Independence Ave, Windhoek",
    genres: ["Afro Pop", "Traditional", "Jazz"],
    instruments: ["Guitar", "Piano", "Vocals"],
    bankDetails: {
      bankName: "Bank Windhoek",
      accountNumber: "****1234",
      branchCode: "483772",
    },
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
          <h1 className="text-3xl font-bold tracking-tight">Member Profile</h1>
          <p className="text-muted-foreground">Manage your NASCAM membership information</p>
        </div>
        <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? "outline" : "default"}>
          <Edit className="mr-2 h-4 w-4" />
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-6 md:grid-cols-2">
        {/* Personal Information */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg" alt={memberInfo.name} />
                  <AvatarFallback>
                    {memberInfo.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button variant="outline" size="sm">
                    <Camera className="mr-2 h-4 w-4" />
                    Change Photo
                  </Button>
                )}
              </div>

              <div className="grid gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={memberInfo.name}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-muted" : ""}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={memberInfo.email}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-muted" : ""}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={memberInfo.phone}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-muted" : ""}
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={memberInfo.address}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-muted" : ""}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Membership Information */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>Membership Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Membership ID</span>
                <Badge variant="outline">{memberInfo.membershipId}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Join Date</span>
                <span className="text-sm text-muted-foreground">{memberInfo.joinDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <Badge variant="default">{memberInfo.status}</Badge>
              </div>

              <Separator />

              <div>
                <Label className="text-sm font-medium">Musical Genres</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {memberInfo.genres.map((genre) => (
                    <Badge key={genre} variant="secondary">
                      {genre}
                    </Badge>
                  ))}
                  {isEditing && (
                    <Button variant="outline" size="sm">
                      Add Genre
                    </Button>
                  )}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Instruments</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {memberInfo.instruments.map((instrument) => (
                    <Badge key={instrument} variant="outline">
                      {instrument}
                    </Badge>
                  ))}
                  {isEditing && (
                    <Button variant="outline" size="sm">
                      Add Instrument
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Banking Information */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Banking Information
              </CardTitle>
              <CardDescription>For royalty payments and fee deductions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="bank">Bank Name</Label>
                <Select disabled={!isEditing}>
                  <SelectTrigger>
                    <SelectValue placeholder={memberInfo.bankDetails.bankName} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank-windhoek">Bank Windhoek</SelectItem>
                    <SelectItem value="fnb">First National Bank</SelectItem>
                    <SelectItem value="standard-bank">Standard Bank</SelectItem>
                    <SelectItem value="nedbank">Nedbank</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="account">Account Number</Label>
                <Input
                  id="account"
                  value={memberInfo.bankDetails.accountNumber}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-muted" : ""}
                />
              </div>
              <div>
                <Label htmlFor="branch">Branch Code</Label>
                <Input
                  id="branch"
                  value={memberInfo.bankDetails.branchCode}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-muted" : ""}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 bg-green-500 rounded-full mt-2" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Profile Updated</p>
                    <p className="text-sm text-muted-foreground">Updated banking information</p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 bg-blue-500 rounded-full mt-2" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Log Sheet Submitted</p>
                    <p className="text-sm text-muted-foreground">Radio Kudu performance data</p>
                    <p className="text-xs text-muted-foreground">1 week ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 bg-amber-500 rounded-full mt-2" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Royalty Payment</p>
                    <p className="text-sm text-muted-foreground">N$1,245.50 deposited</p>
                    <p className="text-xs text-muted-foreground">2 weeks ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {isEditing && (
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsEditing(false)}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      )}
    </div>
  )
}
