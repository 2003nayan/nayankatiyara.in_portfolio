"use client"

import { useRef, useState, useEffect } from "react"
import { useMotionValue, useSpring } from "framer-motion"

export function useMagnetic(strength = 50, duration = 0.5) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 150 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current || !isHovered) return

      const { clientX, clientY } = e
      const { left, top, width, height } = ref.current.getBoundingClientRect()

      const centerX = left + width / 2
      const centerY = top + height / 2

      const deltaX = clientX - centerX
      const deltaY = clientY - centerY

      x.set(deltaX / 2)
      y.set(deltaY / 2)
    }

    const handleMouseEnter = () => {
      setIsHovered(true)
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
      x.set(0)
      y.set(0)
    }

    window.addEventListener("mousemove", handleMouseMove)
    ref.current.addEventListener("mouseenter", handleMouseEnter)
    ref.current.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (ref.current) {
        ref.current.removeEventListener("mouseenter", handleMouseEnter)
        ref.current.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [isHovered, x, y])

  return { ref, x: springX, y: springY, isHovered }
}
