"use client"

import { useEffect } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { useAppStore } from "@/lib/store"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const { setScrollProgress } = useAppStore()

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      setScrollProgress(v)
    })

    return () => unsubscribe()
  }, [scrollYProgress, setScrollProgress])

  return <motion.div className="fixed top-0 left-0 right-0 h-1 bg-cyan-500 origin-left z-50" style={{ scaleX }} />
}
