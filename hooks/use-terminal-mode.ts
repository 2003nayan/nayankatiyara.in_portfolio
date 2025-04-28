"use client"

import { useEffect } from "react"
import { useAppStore } from "@/lib/store"

export function useTerminalMode() {
  const { isTerminalMode, toggleTerminalMode } = useAppStore()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle terminal mode when ~ key is pressed
      if (e.key === "`" || e.key === "~") {
        toggleTerminalMode()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleTerminalMode])

  return { isTerminalMode, toggleTerminalMode }
}
