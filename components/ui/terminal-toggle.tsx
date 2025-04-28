"use client"

import { motion } from "framer-motion"
import { Terminal, Sun } from "lucide-react"
import { useTerminalMode } from "@/hooks/use-terminal-mode"

export function TerminalToggle() {
  const { isTerminalMode, toggleTerminalMode } = useTerminalMode()

  return (
    <motion.button
      className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-700 text-slate-300 hover:text-cyan-400 transition-colors"
      onClick={toggleTerminalMode}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      {isTerminalMode ? <Sun className="h-5 w-5" /> : <Terminal className="h-5 w-5" />}
    </motion.button>
  )
}
