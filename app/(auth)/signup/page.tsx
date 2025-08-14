"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Music,
  User,
  Mail,
  Lock,
  Check,
  Phone,
  MapPin,
  Briefcase,
  FileText,
  CreditCard,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"

const TOTAL_STEPS = 6

const musicGenres = [
  "Afrobeat",
  "Blues",
  "Classical",
  "Country",
  "Electronic",
  "Folk",
  "Gospel",
  "Hip Hop",
  "Jazz",
  "Pop",
  "R&B",
  "Reggae",
  "Rock",
  "Traditional",
  "Other",
]

const musicRoles = ["Composer", "Lyricist", "Performer", "Producer", "Arranger", "Publisher", "Other"]

const nationalities = ["Namibian", "South African", "Botswanan", "Angolan", "Zambian", "Zimbabwean", "Other"]

export default function SignupPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    // Step 1 - Personal Details
    fullName: "",
    stageName: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",

    // Step 2 - Contact Details
    phoneNumber: "",
    email: "",
    physicalAddress: "",
    postalAddress: "",

    // Step 3 - Professional Details
    musicGenres: [] as string[],
    musicRoles: [] as string[],
    labelName: "",

    // Step 4 - Identification
    idNumber: "",
    idDocument: null as File | null,
    proofOfAddress: null as File | null,

    // Step 5 - Bank Information
    bankName: "",
    accountHolderName: "",
    accountNumber: "",
    branchCode: "",

    // Step 6 - Account Security
    password: "",
    confirmPassword: "",
    accountType: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }

    // Validate passwords in real-time
    if (name === "password" || name === "confirmPassword") {
      validatePasswords(name, value)
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleMultiSelectChange = (name: string, value: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked
        ? [...(prev[name as keyof typeof prev] as string[]), value]
        : (prev[name as keyof typeof prev] as string[]).filter((item) => item !== value),
    }))
  }

  const handleFileChange = (name: string, file: File | null) => {
    setFormData((prev) => ({ ...prev, [name]: file }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validatePasswords = (field: string, value: string) => {
    const newErrors = { ...errors }

    if (field === "password") {
      if (value.length < 8) {
        newErrors.password = "Password must be at least 8 characters"
      } else {
        newErrors.password = ""
      }

      if (formData.confirmPassword && value !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match"
      } else if (formData.confirmPassword) {
        newErrors.confirmPassword = ""
      }
    }

    if (field === "confirmPassword") {
      if (value !== formData.password) {
        newErrors.confirmPassword = "Passwords do not match"
      } else {
        newErrors.confirmPassword = ""
      }
    }

    setErrors(newErrors)
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!formData.fullName) newErrors.fullName = "Full name is required"
        if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"
        if (!formData.gender) newErrors.gender = "Gender is required"
        if (!formData.nationality) newErrors.nationality = "Nationality is required"
        break
      case 2:
        if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required"
        if (!formData.email) newErrors.email = "Email is required"
        if (!formData.physicalAddress) newErrors.physicalAddress = "Physical address is required"
        if (!formData.postalAddress) newErrors.postalAddress = "Postal address is required"
        break
      case 3:
        if (formData.musicGenres.length === 0) newErrors.musicGenres = "Select at least one music genre"
        if (formData.musicRoles.length === 0) newErrors.musicRoles = "Select at least one role in music"
        break
      case 4:
        if (!formData.idNumber) newErrors.idNumber = "ID/Passport number is required"
        if (!formData.idDocument) newErrors.idDocument = "ID document is required"
        if (!formData.proofOfAddress) newErrors.proofOfAddress = "Proof of address is required"
        break
      case 5:
        if (!formData.bankName) newErrors.bankName = "Bank name is required"
        if (!formData.accountHolderName) newErrors.accountHolderName = "Account holder name is required"
        if (!formData.accountNumber) newErrors.accountNumber = "Account number is required"
        if (!formData.branchCode) newErrors.branchCode = "Branch code is required"
        break
      case 6:
        if (!formData.password) newErrors.password = "Password is required"
        if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm password is required"
        if (!formData.accountType) newErrors.accountType = "Account type is required"
        if (formData.password && formData.password.length < 8)
          newErrors.password = "Password must be at least 8 characters"
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateStep(currentStep)) {
      return
    }

    setIsLoading(true)

    // Simulate form submission
    setTimeout(() => {
      console.log("Form Data Submitted:", formData)
      setIsLoading(false)
      router.push("/dashboard")
    }, 2000)
  }

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1:
        return User
      case 2:
        return Phone
      case 3:
        return Briefcase
      case 4:
        return FileText
      case 5:
        return CreditCard
      case 6:
        return Lock
      default:
        return User
    }
  }

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1:
        return "Personal Details"
      case 2:
        return "Contact Information"
      case 3:
        return "Professional Details"
      case 4:
        return "Identification"
      case 5:
        return "Bank Information"
      case 6:
        return "Account Security"
      default:
        return "Step"
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="John Doe"
                  className={`pl-10 ${errors.fullName ? "border-destructive" : ""}`}
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>
              {errors.fullName && <p className="text-destructive text-xs">{errors.fullName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="stageName">Stage Name (Optional)</Label>
              <div className="relative">
                <Music className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="stageName"
                  name="stageName"
                  placeholder="Artist Name"
                  className="pl-10"
                  value={formData.stageName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                className={errors.dateOfBirth ? "border-destructive" : ""}
                value={formData.dateOfBirth}
                onChange={handleInputChange}
              />
              {errors.dateOfBirth && <p className="text-destructive text-xs">{errors.dateOfBirth}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender *</Label>
              <Select onValueChange={(value) => handleSelectChange("gender", value)}>
                <SelectTrigger className={errors.gender ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && <p className="text-destructive text-xs">{errors.gender}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="nationality">Nationality *</Label>
              <Select onValueChange={(value) => handleSelectChange("nationality", value)}>
                <SelectTrigger className={errors.nationality ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select nationality" />
                </SelectTrigger>
                <SelectContent>
                  {nationalities.map((nationality) => (
                    <SelectItem key={nationality} value={nationality.toLowerCase()}>
                      {nationality}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.nationality && <p className="text-destructive text-xs">{errors.nationality}</p>}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="+264 81 123 4567"
                  className={`pl-10 ${errors.phoneNumber ? "border-destructive" : ""}`}
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
              {errors.phoneNumber && <p className="text-destructive text-xs">{errors.phoneNumber}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="physicalAddress">Physical Address *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Textarea
                  id="physicalAddress"
                  name="physicalAddress"
                  placeholder="123 Main Street, Windhoek, Namibia"
                  className={`pl-10 min-h-[80px] ${errors.physicalAddress ? "border-destructive" : ""}`}
                  value={formData.physicalAddress}
                  onChange={handleInputChange}
                />
              </div>
              {errors.physicalAddress && <p className="text-destructive text-xs">{errors.physicalAddress}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="postalAddress">Postal Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Textarea
                  id="postalAddress"
                  name="postalAddress"
                  placeholder="P.O. Box 123, Windhoek, Namibia"
                  className={`pl-10 min-h-[80px] ${errors.postalAddress ? "border-destructive" : ""}`}
                  value={formData.postalAddress}
                  onChange={handleInputChange}
                />
              </div>
              {errors.postalAddress && <p className="text-destructive text-xs">{errors.postalAddress}</p>}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Music Genre(s) *</Label>
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border rounded-md p-3">
                {musicGenres.map((genre) => (
                  <div key={genre} className="flex items-center space-x-2">
                    <Checkbox
                      id={`genre-${genre}`}
                      checked={formData.musicGenres.includes(genre)}
                      onCheckedChange={(checked) => handleMultiSelectChange("musicGenres", genre, checked as boolean)}
                    />
                    <Label htmlFor={`genre-${genre}`} className="text-sm">
                      {genre}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.musicGenres && <p className="text-destructive text-xs">{errors.musicGenres}</p>}
            </div>

            <div className="space-y-2">
              <Label>Role in Music *</Label>
              <div className="grid grid-cols-2 gap-2 border rounded-md p-3">
                {musicRoles.map((role) => (
                  <div key={role} className="flex items-center space-x-2">
                    <Checkbox
                      id={`role-${role}`}
                      checked={formData.musicRoles.includes(role)}
                      onCheckedChange={(checked) => handleMultiSelectChange("musicRoles", role, checked as boolean)}
                    />
                    <Label htmlFor={`role-${role}`} className="text-sm">
                      {role}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.musicRoles && <p className="text-destructive text-xs">{errors.musicRoles}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="labelName">Record Label (Optional)</Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="labelName"
                  name="labelName"
                  placeholder="Label Name"
                  className="pl-10"
                  value={formData.labelName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="idNumber">National ID / Passport Number *</Label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="idNumber"
                  name="idNumber"
                  placeholder="ID or Passport Number"
                  className={`pl-10 ${errors.idNumber ? "border-destructive" : ""}`}
                  value={formData.idNumber}
                  onChange={handleInputChange}
                />
              </div>
              {errors.idNumber && <p className="text-destructive text-xs">{errors.idNumber}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="idDocument">Upload ID Document *</Label>
              <Input
                id="idDocument"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className={errors.idDocument ? "border-destructive" : ""}
                onChange={(e) => handleFileChange("idDocument", e.target.files?.[0] || null)}
              />
              <p className="text-xs text-muted-foreground">Accepted formats: PDF, JPG, PNG</p>
              {errors.idDocument && <p className="text-destructive text-xs">{errors.idDocument}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="proofOfAddress">Upload Proof of Payment*</Label>
              <Input
                id="proofOfAddress"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className={errors.proofOfAddress ? "border-destructive" : ""}
                onChange={(e) => handleFileChange("proofOfAddress", e.target.files?.[0] || null)}
              />
              <p className="text-xs text-muted-foreground">Accepted formats: PDF, JPG, PNG</p>
              {errors.proofOfAddress && <p className="text-destructive text-xs">{errors.proofOfAddress}</p>}
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bankName">Bank Name *</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="bankName"
                  name="bankName"
                  placeholder="Bank of Namibia"
                  className={`pl-10 ${errors.bankName ? "border-destructive" : ""}`}
                  value={formData.bankName}
                  onChange={handleInputChange}
                />
              </div>
              {errors.bankName && <p className="text-destructive text-xs">{errors.bankName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountHolderName">Account Holder Name *</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="accountHolderName"
                  name="accountHolderName"
                  placeholder="Full name as on bank account"
                  className={`pl-10 ${errors.accountHolderName ? "border-destructive" : ""}`}
                  value={formData.accountHolderName}
                  onChange={handleInputChange}
                />
              </div>
              {errors.accountHolderName && <p className="text-destructive text-xs">{errors.accountHolderName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number *</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="accountNumber"
                  name="accountNumber"
                  placeholder="1234567890"
                  className={`pl-10 ${errors.accountNumber ? "border-destructive" : ""}`}
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                />
              </div>
              {errors.accountNumber && <p className="text-destructive text-xs">{errors.accountNumber}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="branchCode">Branch Code *</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="branchCode"
                  name="branchCode"
                  placeholder="123456"
                  className={`pl-10 ${errors.branchCode ? "border-destructive" : ""}`}
                  value={formData.branchCode}
                  onChange={handleInputChange}
                />
              </div>
              {errors.branchCode && <p className="text-destructive text-xs">{errors.branchCode}</p>}
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className={`pl-10 ${errors.password ? "border-destructive" : ""}`}
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              {errors.password && <p className="text-destructive text-xs">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <div className="relative">
                <Check className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className={`pl-10 ${errors.confirmPassword ? "border-destructive" : ""}`}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
              {errors.confirmPassword && <p className="text-destructive text-xs">{errors.confirmPassword}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountType">Account Type *</Label>
              <Select onValueChange={(value) => handleSelectChange("accountType", value)}>
                <SelectTrigger className={errors.accountType ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="artist">Artist</SelectItem>
                  <SelectItem value="composer">Composer</SelectItem>
                  <SelectItem value="publisher">Publisher</SelectItem>
                </SelectContent>
              </Select>
              {errors.accountType && <p className="text-destructive text-xs">{errors.accountType}</p>}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const StepIcon = getStepIcon(currentStep)

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-secondary/20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="border-border/50 shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <motion.div
                key={currentStep}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="rounded-full bg-primary/10 p-3"
              >
                <StepIcon className="h-8 w-8 text-primary" />
              </motion.div>
            </div>
            <CardTitle className="text-2xl font-bold">{getStepTitle(currentStep)}</CardTitle>
            <CardDescription>
              Step {currentStep} of {TOTAL_STEPS} - Join NASCAM to manage your music rights
            </CardDescription>

            {/* Progress Bar */}
            <div className="w-full mt-4">
              <Progress value={(currentStep / TOTAL_STEPS) * 100} className="w-full" />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>Progress</span>
                <span>
                  {currentStep}/{TOTAL_STEPS}
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={currentStep === TOTAL_STEPS ? handleSubmit : (e) => e.preventDefault()}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <div className="flex justify-between w-full gap-4">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="flex items-center gap-2 bg-transparent"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </Button>
              )}

              <div className="flex-1" />

              {currentStep < TOTAL_STEPS ? (
                <Button type="button" onClick={nextStep} className="glow-button flex items-center gap-2">
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" onClick={handleSubmit} className="glow-button" disabled={isLoading}>
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="mr-2 h-4 w-4 border-2 border-primary border-t-transparent rounded-full"
                    />
                  ) : null}
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              )}
            </div>

            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-primary underline-offset-4 hover:underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

