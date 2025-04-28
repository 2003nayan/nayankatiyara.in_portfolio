"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { useMagnetic } from "@/hooks/use-magnetic"
import { cn } from "@/lib/utils"

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  strength?: number
}

export function MagneticButton({
  children,
  className,
  onClick,
  variant = "default",
  size = "default",
  strength = 50,
}: MagneticButtonProps) {
  const { ref, x, y, isHovered } = useMagnetic(strength)

  const getVariantClasses = () => {
    switch (variant) {
      case "outline":
        return "border border-cyan-500/30 text-cyan-400 hover:bg-slate-800/80"
      case "ghost":
        return "text-slate-300 hover:text-white hover:bg-slate-800/80"
      default:
        return "bg-cyan-500 hover:bg-cyan-600 text-white"
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "h-9 px-3 text-sm"
      case "lg":
        return "h-12 px-6 text-lg"
      default:
        return "h-10 px-4 text-base"
    }
  }

  return (
    <motion.div ref={ref} style={{ x, y }} className="relative inline-block">
      <motion.button
        className={cn(
          "relative rounded-full font-medium transition-colors duration-300",
          getVariantClasses(),
          getSizeClasses(),
          className,
        )}
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: isHovered ? `0 0 20px 2px rgba(34, 211, 238, 0.3)` : `0 0 0px 0px rgba(34, 211, 238, 0)`,
        }}
      >
        {children}
      </motion.button>
    </motion.div>
  )
}
