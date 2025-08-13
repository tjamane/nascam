"use client"

import { Textarea } from "@/components/ui/textarea"

import { useState } from "react"
import { motion } from "framer-motion"
import { Save, Shield, Mail, Users, Lock, Database, Globe } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminSettingsPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [emailSettings, setEmailSettings] = useState({
    sendApprovalEmails: true,
    sendRejectionEmails: true,
    sendSystemUpdates: true,
    emailSignature: "NASCAM Administration Team\nNamibian Society of Composers and Authors of Music\nWindhoek, Namibia",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    newSubmissionAlert: true,
    approvalNotifications: true,
    rejectionNotifications: true,
    systemUpdates: false,
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: "30",
    ipRestriction: false,
    passwordExpiry: "90",
  })

  const handleEmailSettingChange = (key: keyof typeof emailSettings, value: boolean | string) => {
    setEmailSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleNotificationSettingChange = (key: keyof typeof notificationSettings, value: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSecuritySettingChange = (key: keyof typeof securitySettings, value: boolean | string) => {
    setSecuritySettings((prev) => ({ ...prev, [key]: value }))
  }

  const saveSettings = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)

      // Play notification sound
      const audio = new Audio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/notification_o14egLP-cpjJRo3ZRaY1cMojHqzHBvBAe78gG6.mp3")
      audio.play().catch((err) => console.error("Error playing audio:", err))
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Admin Settings</h1>
        <p className="text-muted-foreground">Configure your admin account and system preferences.</p>
      </div>

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Update your admin account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <div className="relative h-24 w-24 rounded-full bg-muted flex items-center justify-center">
                    <Shield className="h-12 w-12 text-muted-foreground" />
                    <div className="absolute -bottom-2 -right-2">
                      <Button size="sm" variant="outline" className="rounded-full h-8 w-8 p-0">
                        <span className="sr-only">Change avatar</span>
                        <span className="text-xs">+</span>
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Profile Picture</h3>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Upload
                      </Button>
                      <Button size="sm" variant="outline" className="text-destructive">
                        Remove
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max size of 2MB.</p>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="fullName" name="fullName" defaultValue="Admin User" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="email" name="email" type="email" defaultValue="admin@nascam.org" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select defaultValue="admin">
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="reviewer">Content Reviewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="africa-windhoek">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="africa-windhoek">Africa/Windhoek (GMT+2)</SelectItem>
                        <SelectItem value="africa-johannesburg">Africa/Johannesburg (GMT+2)</SelectItem>
                        <SelectItem value="europe-london">Europe/London (GMT+0/+1)</SelectItem>
                        <SelectItem value="america-new_york">America/New_York (GMT-5/-4)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={saveSettings} disabled={isSaving}>
                  {isSaving ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="mr-2 h-4 w-4 border-2 border-primary border-t-transparent rounded-full"
                    />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="email">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>Email Settings</CardTitle>
                <CardDescription>Configure email notifications and templates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Notifications</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="send-approval-emails">Song Approval Emails</Label>
                      <p className="text-sm text-muted-foreground">
                        Send email notifications to artists when their songs are approved
                      </p>
                    </div>
                    <Switch
                      id="send-approval-emails"
                      checked={emailSettings.sendApprovalEmails}
                      onCheckedChange={(checked) => handleEmailSettingChange("sendApprovalEmails", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="send-rejection-emails">Song Rejection Emails</Label>
                      <p className="text-sm text-muted-foreground">
                        Send email notifications to artists when their songs are rejected
                      </p>
                    </div>
                    <Switch
                      id="send-rejection-emails"
                      checked={emailSettings.sendRejectionEmails}
                      onCheckedChange={(checked) => handleEmailSettingChange("sendRejectionEmails", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="send-system-updates">System Update Emails</Label>
                      <p className="text-sm text-muted-foreground">
                        Send email notifications about system updates and maintenance
                      </p>
                    </div>
                    <Switch
                      id="send-system-updates"
                      checked={emailSettings.sendSystemUpdates}
                      onCheckedChange={(checked) => handleEmailSettingChange("sendSystemUpdates", checked)}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="email-signature">Email Signature</Label>
                  <Textarea
                    id="email-signature"
                    rows={4}
                    value={emailSettings.emailSignature}
                    onChange={(e) => handleEmailSettingChange("emailSignature", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">This signature will be added to all outgoing emails.</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={saveSettings} disabled={isSaving}>
                  {isSaving ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="mr-2 h-4 w-4 border-2 border-primary border-t-transparent rounded-full"
                    />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="notifications">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Configure in-app notification settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Types</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="new-submission-alert">New Song Submissions</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when new songs are submitted for review
                      </p>
                    </div>
                    <Switch
                      id="new-submission-alert"
                      checked={notificationSettings.newSubmissionAlert}
                      onCheckedChange={(checked) => handleNotificationSettingChange("newSubmissionAlert", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="approval-notifications">Song Approvals</Label>
                      <p className="text-sm text-muted-foreground">Get notified when songs are approved</p>
                    </div>
                    <Switch
                      id="approval-notifications"
                      checked={notificationSettings.approvalNotifications}
                      onCheckedChange={(checked) => handleNotificationSettingChange("approvalNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="rejection-notifications">Song Rejections</Label>
                      <p className="text-sm text-muted-foreground">Get notified when songs are rejected</p>
                    </div>
                    <Switch
                      id="rejection-notifications"
                      checked={notificationSettings.rejectionNotifications}
                      onCheckedChange={(checked) => handleNotificationSettingChange("rejectionNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="system-updates">System Updates</Label>
                      <p className="text-sm text-muted-foreground">Get notified about system updates and maintenance</p>
                    </div>
                    <Switch
                      id="system-updates"
                      checked={notificationSettings.systemUpdates}
                      onCheckedChange={(checked) => handleNotificationSettingChange("systemUpdates", checked)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={saveSettings} disabled={isSaving}>
                  {isSaving ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="mr-2 h-4 w-4 border-2 border-primary border-t-transparent rounded-full"
                    />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="security">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure security and authentication options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="two-factor-auth">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Require a verification code in addition to your password
                      </p>
                    </div>
                    <Switch
                      id="two-factor-auth"
                      checked={securitySettings.twoFactorAuth}
                      onCheckedChange={(checked) => handleSecuritySettingChange("twoFactorAuth", checked)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input
                      id="session-timeout"
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => handleSecuritySettingChange("sessionTimeout", e.target.value)}
                      min="5"
                      max="120"
                    />
                    <p className="text-xs text-muted-foreground">
                      Automatically log out after this period of inactivity
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="ip-restriction">IP Address Restriction</Label>
                      <p className="text-sm text-muted-foreground">Restrict admin access to specific IP addresses</p>
                    </div>
                    <Switch
                      id="ip-restriction"
                      checked={securitySettings.ipRestriction}
                      onCheckedChange={(checked) => handleSecuritySettingChange("ipRestriction", checked)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                    <Input
                      id="password-expiry"
                      type="number"
                      value={securitySettings.passwordExpiry}
                      onChange={(e) => handleSecuritySettingChange("passwordExpiry", e.target.value)}
                      min="30"
                      max="365"
                    />
                    <p className="text-xs text-muted-foreground">Require password change after this many days</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Change Password</h3>
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="current-password" type="password" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="new-password" type="password" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="confirm-password" type="password" className="pl-10" />
                    </div>
                  </div>
                  <Button className="mt-2" variant="outline">
                    Change Password
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={saveSettings} disabled={isSaving}>
                  {isSaving ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="mr-2 h-4 w-4 border-2 border-primary border-t-transparent rounded-full"
                    />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="system">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure global system settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Database Settings</h3>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Database className="h-5 w-5 text-muted-foreground" />
                      <h4 className="font-medium">Database Connection</h4>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="db-host">Database Host</Label>
                        <Input id="db-host" defaultValue="localhost" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="db-port">Database Port</Label>
                        <Input id="db-port" defaultValue="5432" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="db-name">Database Name</Label>
                        <Input id="db-name" defaultValue="nascam_production" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="db-user">Database User</Label>
                        <Input id="db-user" defaultValue="nascam_admin" />
                      </div>
                    </div>
                    <Button className="mt-4" variant="outline">
                      Test Connection
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Site Settings</h3>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Globe className="h-5 w-5 text-muted-foreground" />
                      <h4 className="font-medium">Site Configuration</h4>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="site-name">Site Name</Label>
                        <Input id="site-name" defaultValue="NASCAM Music Rights Management" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="site-url">Site URL</Label>
                        <Input id="site-url" defaultValue="https://nascam.org" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                        <Select defaultValue="off">
                          <SelectTrigger id="maintenance-mode">
                            <SelectValue placeholder="Select mode" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="off">Off</SelectItem>
                            <SelectItem value="on">On</SelectItem>
                            <SelectItem value="scheduled">Scheduled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={saveSettings} disabled={isSaving}>
                  {isSaving ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="mr-2 h-4 w-4 border-2 border-primary border-t-transparent rounded-full"
                    />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
