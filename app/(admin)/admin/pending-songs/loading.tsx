"use client"

import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"

export default function Loading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] text-muted-foreground"
    >
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="mt-4 text-lg">Loading pending songs...</p>
    </motion.div>
  )
}
