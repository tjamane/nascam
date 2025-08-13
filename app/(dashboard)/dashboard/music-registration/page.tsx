"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash2, Save, ArrowLeft, ArrowRight, Upload, Check, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface SongEntry {
  id: string
  title: string
  genre: string
  composer: string
  description: string
  file: File | null
}

interface FormData {
  fullName: string
  stageName: string
  address: string
  idDocument: File | null
  email: string
  phone: string
  songs: SongEntry[]
}

const genres = [
  "Afro Pop",
  "Traditional",
  "Jazz",
  "Hip Hop",
  "R&B",
  "Gospel",
  "Rock",
  "Electronic",
  "Classical",
  "Other",
]

export default function MusicRegistrationPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    stageName: "",
    address: "",
    idDocument: null,
    email: "",
    phone: "",
    songs: [
      {
        id: crypto.randomUUID(),
        title: "",
        genre: "",
        composer: "",
        description: "",
        file: null,
      },
    ],
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submissionState, setSubmissionState] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const notificationSoundRef = useRef<HTMLAudioElement | null>(null)
  const errorAudioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Initialize audio elements
    notificationSoundRef.current = new Audio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/notification_o14egLP-cpjJRo3ZRaY1cMojHqzHBvBAe78gG6.mp3")
    errorAudioRef.current = new Audio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/notification_o14egLP-cpjJRo3ZRaY1cMojHqzHBvBAe78gG6.mp3")

    // Redirect to dashboard after successful submission
    if (submissionState === "success") {
      // Play notification sound
      if (notificationSoundRef.current) {
        notificationSoundRef.current.play().catch((err) => console.error("Error playing audio:", err))
      }

      const timer = setTimeout(() => {
        router.push("/dashboard")
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [submissionState, router])

  // Real-time validation
  useEffect(() => {
    if (currentStep === 1) {
      const newErrors: Record<string, string> = {}

      if (formData.fullName && formData.fullName.length < 3) {
        newErrors.fullName = "Name must be at least 3 characters"
      }

      if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address"
      }

      if (formData.phone && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formData.phone)) {
        newErrors.phone = "Please enter a valid phone number"
      }

      setErrors((prev) => ({
        ...prev,
        ...newErrors,
      }))
    }
  }, [formData.fullName, formData.email, formData.phone, currentStep])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "idDocument" | null = null,
    songId: string | null = null,
  ) => {
    if (!e.target.files?.length) return

    if (field === "idDocument") {
      setFormData({ ...formData, idDocument: e.target.files[0] })
      if (errors.idDocument) {
        setErrors({ ...errors, idDocument: "" })
      }
    } else if (songId) {
      const updatedSongs = formData.songs.map((song) => {
        if (song.id === songId) {
          return { ...song, file: e.target.files![0] }
        }
        return song
      })
      setFormData({ ...formData, songs: updatedSongs })
    }
  }

  const handleSongChange = (songId: string, field: keyof SongEntry, value: string) => {
    const updatedSongs = formData.songs.map((song) => {
      if (song.id === songId) {
        return { ...song, [field]: value }
      }
      return song
    })

    setFormData({ ...formData, songs: updatedSongs })

    // Clear error
    const errorKey = `songs.${songId}.${field}`
    if (errors[errorKey]) {
      const newErrors = { ...errors }
      delete newErrors[errorKey]
      setErrors(newErrors)
    }
  }

  const addSong = () => {
    setFormData({
      ...formData,
      songs: [
        ...formData.songs,
        {
          id: crypto.randomUUID(),
          title: "",
          genre: "",
          composer: "",
          description: "",
          file: null,
        },
      ],
    })
  }

  const removeSong = (id: string) => {
    if (formData.songs.length === 1) return

    const updatedSongs = formData.songs.filter((song) => song.id !== id)
    setFormData({ ...formData, songs: updatedSongs })

    // Remove any errors for this song
    const newErrors = { ...errors }
    Object.keys(newErrors).forEach((key) => {
      if (key.includes(id)) {
        delete newErrors[key]
      }
    })
    setErrors(newErrors)
  }

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = "Name must be at least 3 characters"
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required"
    } else if (formData.address.length < 10) {
      newErrors.address = "Please provide a complete address"
    }

    if (!formData.idDocument) {
      newErrors.idDocument = "ID document is required"
    }

    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (formData.phone && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}

    formData.songs.forEach((song) => {
      if (!song.title.trim()) {
        newErrors[`songs.${song.id}.title`] = "Title is required"
      } else if (song.title.length < 2) {
        newErrors[`songs.${song.id}.title`] = "Title is too short"
      }

      if (!song.genre) {
        newErrors[`songs.${song.id}.genre`] = "Genre is required"
      }

      if (!song.composer.trim()) {
        newErrors[`songs.${song.id}.composer`] = "Composer name is required"
      } else if (song.composer.length < 3) {
        newErrors[`songs.${song.id}.composer`] = "Composer name is too short"
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2)
    } else if (currentStep === 2 && validateStep2()) {
      setShowConfirmDialog(true)
    }
  }

  const submitForm = () => {
    setSubmissionState("submitting")
    setUploadProgress(0)

    // Simulate file upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = prev + Math.random() * 15
        return newProgress >= 100 ? 100 : newProgress
      })
    }, 300)

    // Simulate API call with a delay
    setTimeout(() => {
      clearInterval(progressInterval)
      setUploadProgress(100)

      // 95% chance of success, 5% chance of error (for demo purposes)
      const isSuccess = Math.random() > 0.05

      if (isSuccess) {
        setSubmissionState("success")
      } else {
        setSubmissionState("error")
        // Play error sound
        if (errorAudioRef.current) {
          errorAudioRef.current.play().catch((err) => console.error("Error playing audio:", err))
        }
      }
    }, 3000)
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const saveDraft = () => {
    // In a real app, you would save the current state to localStorage or backend
    console.log("Draft saved:", formData)

    // Play notification sound
    if (notificationSoundRef.current) {
      notificationSoundRef.current.play().catch((err) => console.error("Error playing audio:", err))
    }
  }

  const getSongError = (songId: string, field: keyof SongEntry) => {
    return errors[`songs.${songId}.${field}`]
  }

  const retrySubmission = () => {
    setSubmissionState("idle")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Music Registration</h1>
        <p className="text-muted-foreground">Register your music with NASCAM to protect your rights</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Registration Form</CardTitle>
              <CardDescription>{currentStep === 1 ? "Personal Information" : "Song Registration"}</CardDescription>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full ${currentStep === 1 ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                1
              </span>
              <span>→</span>
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full ${currentStep === 2 ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                2
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">
                      Full Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={errors.fullName ? "border-destructive" : ""}
                    />
                    {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stageName">Stage Name</Label>
                    <Input id="stageName" name="stageName" value={formData.stageName} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">
                    Address <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={errors.address ? "border-destructive" : ""}
                    rows={3}
                  />
                  {errors.address && <p className="text-xs text-destructive">{errors.address}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="idDocument">
                    Upload ID Document (PDF or Image) <span className="text-destructive">*</span>
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="idDocument"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, "idDocument")}
                      className={`${errors.idDocument ? "border-destructive" : ""} file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90`}
                    />
                  </div>
                  {errors.idDocument && <p className="text-xs text-destructive">{errors.idDocument}</p>}
                  {formData.idDocument && (
                    <p className="text-xs text-muted-foreground">Selected: {formData.idDocument.name}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email (optional)</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (optional)</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={errors.phone ? "border-destructive" : ""}
                    />
                    {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[250px]">Song Title</TableHead>
                        <TableHead>Genre</TableHead>
                        <TableHead>Composer</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {formData.songs.map((song, index) => (
                        <TableRow key={song.id}>
                          <TableCell>
                            <Input
                              value={song.title}
                              onChange={(e) => handleSongChange(song.id, "title", e.target.value)}
                              placeholder="Song title"
                              className={getSongError(song.id, "title") ? "border-destructive" : ""}
                            />
                            {getSongError(song.id, "title") && (
                              <p className="text-xs text-destructive mt-1">{getSongError(song.id, "title")}</p>
                            )}
                          </TableCell>
                          <TableCell>
                            <Select
                              value={song.genre}
                              onValueChange={(value) => handleSongChange(song.id, "genre", value)}
                            >
                              <SelectTrigger className={getSongError(song.id, "genre") ? "border-destructive" : ""}>
                                <SelectValue placeholder="Select genre" />
                              </SelectTrigger>
                              <SelectContent>
                                {genres.map((genre) => (
                                  <SelectItem key={genre} value={genre}>
                                    {genre}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {getSongError(song.id, "genre") && (
                              <p className="text-xs text-destructive mt-1">{getSongError(song.id, "genre")}</p>
                            )}
                          </TableCell>
                          <TableCell>
                            <Input
                              value={song.composer}
                              onChange={(e) => handleSongChange(song.id, "composer", e.target.value)}
                              placeholder="Composer name"
                              className={getSongError(song.id, "composer") ? "border-destructive" : ""}
                            />
                            {getSongError(song.id, "composer") && (
                              <p className="text-xs text-destructive mt-1">{getSongError(song.id, "composer")}</p>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeSong(song.id)}
                              disabled={formData.songs.length === 1}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                              <span className="sr-only">Remove song</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <Button type="button" variant="outline" size="sm" className="mt-2 bg-transparent" onClick={addSong}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Another Song
                </Button>

                <div className="space-y-4">
                  {formData.songs.map((song) => (
                    <Card key={song.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{song.title || "New Song"}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor={`description-${song.id}`}>Song Description</Label>
                          <Textarea
                            id={`description-${song.id}`}
                            value={song.description}
                            onChange={(e) => handleSongChange(song.id, "description", e.target.value)}
                            placeholder="Describe your song..."
                            rows={2}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`file-${song.id}`}>Upload Song File (MP3/WAV)</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id={`file-${song.id}`}
                              type="file"
                              accept=".mp3,.wav"
                              onChange={(e) => handleFileChange(e, null, song.id)}
                              className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                            />
                          </div>
                          {song.file && <p className="text-xs text-muted-foreground">Selected: {song.file.name}</p>}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>
            {currentStep > 1 && submissionState === "idle" && (
              <Button type="button" variant="outline" onClick={prevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            {submissionState === "idle" && (
              <>
                <Button type="button" variant="outline" onClick={saveDraft}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Draft
                </Button>
                <Button type="button" onClick={nextStep}>
                  {currentStep < 2 ? (
                    <>
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Submit
                    </>
                  )}
                </Button>
              </>
            )}

            {submissionState === "submitting" && (
              <div className="flex flex-col items-center gap-2 min-w-[200px]">
                <div className="w-full bg-secondary rounded-full h-2 mb-1">
                  <motion.div
                    className="bg-primary h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ ease: "easeInOut" }}
                  />
                </div>
                <Button disabled className="min-w-[100px]">
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="h-5 w-5 rounded-full border-2 border-primary border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                  </motion.div>
                  <span className="opacity-0">Submitting...</span>
                </Button>
                <p className="text-xs text-muted-foreground">Uploading... {Math.round(uploadProgress)}%</p>
              </div>
            )}

            {submissionState === "success" && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                <Button variant="default" className="bg-green-600 hover:bg-green-700 min-w-[200px]">
                  <motion.div
                    className="rounded-full bg-white p-1 mr-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                  >
                    <Check className="h-3 w-3 text-green-600" />
                  </motion.div>
                  Submitted Successfully!
                </Button>
              </motion.div>
            )}

            {submissionState === "error" && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="flex flex-col items-center gap-2"
              >
                <Alert variant="destructive" className="mb-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>There was an error submitting your form. Please try again.</AlertDescription>
                </Alert>
                <Button variant="destructive" onClick={retrySubmission}>
                  Retry Submission
                </Button>
              </motion.div>
            )}
          </div>
        </CardFooter>
      </Card>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Submission</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to submit your music registration? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={submitForm}>Submit</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
