"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

// We'll dynamically import ScrollTrigger only on the client side
let ScrollTrigger: any

// Initialize ScrollTrigger only on the client side
if (typeof window !== "undefined") {
  // Dynamic import for ScrollTrigger
  import("gsap/ScrollTrigger").then((module) => {
    ScrollTrigger = module.default
    gsap.registerPlugin(ScrollTrigger)
  })
}

type ScrollAnimationOptions = {
  trigger?: string | Element
  start?: string
  end?: string
  scrub?: boolean | number
  markers?: boolean
  pin?: boolean
  anticipatePin?: boolean
  onEnter?: () => void
  onLeave?: () => void
  onEnterBack?: () => void
  onLeaveBack?: () => void
  onUpdate?: (self: any) => void
  animation?: gsap.core.Timeline | gsap.core.Tween
}

export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const animationRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null)
  const scrollTriggerRef = useRef<any | null>(null)

  useEffect(() => {
    // Skip on server-side rendering
    if (typeof window === "undefined" || !ScrollTrigger) return

    // Create a new timeline if animation is not provided
    if (!options.animation) {
      animationRef.current = gsap.timeline()
    } else {
      animationRef.current = options.animation
    }

    // Create ScrollTrigger
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: options.trigger || ".scroll-trigger",
      start: options.start || "top center",
      end: options.end || "bottom center",
      scrub: options.scrub !== undefined ? options.scrub : true,
      markers: options.markers || false,
      pin: options.pin || false,
      anticipatePin: options.anticipatePin || false,
      onEnter: options.onEnter,
      onLeave: options.onLeave,
      onEnterBack: options.onEnterBack,
      onLeaveBack: options.onLeaveBack,
      onUpdate: options.onUpdate,
      animation: animationRef.current,
    })

    // Cleanup
    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill()
      }
      if (animationRef.current) {
        animationRef.current.kill()
      }
    }
  }, [options])

  return {
    animation: animationRef.current,
    scrollTrigger: scrollTriggerRef.current,
  }
}
