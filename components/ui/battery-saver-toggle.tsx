"use client"

import { motion } from "framer-motion"
import { Battery, BatteryCharging } from "lucide-react"
import { useAppStore } from "@/lib/store"

export function BatterySaverToggle() {
  const { batterySaverMode, toggleBatterySaverMode } = useAppStore()

  return (
    <motion.button
      className="fixed bottom-4 right-16 z-50 p-3 rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-700 text-slate-300 hover:text-cyan-400 transition-colors"
      onClick={toggleBatterySaverMode}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1 }}
    >
      {batterySaverMode ? <BatteryCharging className="h-5 w-5" /> : <Battery className="h-5 w-5" />}
    </motion.button>
  )
}
