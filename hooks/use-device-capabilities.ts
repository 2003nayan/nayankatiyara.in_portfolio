"use client"

import { useState, useEffect } from "react"

export function useDeviceCapabilities() {
  const [capabilities, setCapabilities] = useState({
    isWebGLSupported: false,
    isHighPerformanceGPU: false,
    isMobile: false,
    isTouchDevice: false,
    isLowPowerMode: false,
    browserName: "",
    preferReducedMotion: false,
  })

  useEffect(() => {
    // Check WebGL support
    const canvas = document.createElement("canvas")
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    const isWebGLSupported = !!gl

    // Check if device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

    // Check if device has touch capabilities
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0

    // Check for reduced motion preference
    const preferReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // Detect browser
    const userAgent = navigator.userAgent
    let browserName = "Unknown"

    if (userAgent.match(/chrome|chromium|crios/i)) {
      browserName = "Chrome"
    } else if (userAgent.match(/firefox|fxios/i)) {
      browserName = "Firefox"
    } else if (userAgent.match(/safari/i)) {
      browserName = "Safari"
    } else if (userAgent.match(/opr\//i)) {
      browserName = "Opera"
    } else if (userAgent.match(/edg/i)) {
      browserName = "Edge"
    }

    // Estimate GPU performance (very rough heuristic)
    // In a real app, you'd want to use more sophisticated detection
    let isHighPerformanceGPU = false
    if (isWebGLSupported && gl) {
      // Cast gl to WebGLRenderingContext to fix TypeScript errors
      const webGLContext = gl as WebGLRenderingContext
      const debugInfo = webGLContext.getExtension("WEBGL_debug_renderer_info")
      if (debugInfo) {
        const renderer = webGLContext.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        isHighPerformanceGPU = !(renderer.includes("Intel") || renderer.includes("AMD") || isMobile)
      }
    }

    // Battery status (if available)
    let isLowPowerMode = false
    if ("getBattery" in navigator) {
      // Use a proper type assertion for the Battery API
      (navigator as any).getBattery().then((battery: any) => {
        isLowPowerMode = battery.level < 0.2 && !battery.charging
        setCapabilities((prev) => ({ ...prev, isLowPowerMode }))
      })
    }

    setCapabilities({
      isWebGLSupported,
      isHighPerformanceGPU,
      isMobile,
      isTouchDevice,
      isLowPowerMode,
      browserName,
      preferReducedMotion,
    })
  }, [])

  return capabilities
}