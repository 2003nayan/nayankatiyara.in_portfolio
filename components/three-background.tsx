"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 30

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 2000

    const posArray = new Float32Array(particlesCount * 3)
    const scaleArray = new Float32Array(particlesCount)

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position
      posArray[i] = (Math.random() - 0.5) * 60
      posArray[i + 1] = (Math.random() - 0.5) * 60
      posArray[i + 2] = (Math.random() - 0.5) * 60

      // Scale
      scaleArray[i / 3] = Math.random()
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
    particlesGeometry.setAttribute("scale", new THREE.BufferAttribute(scaleArray, 1))

    // Material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    })

    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Mouse interaction
    const mouse = {
      x: 0,
      y: 0,
    }

    window.addEventListener("mousemove", (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    })

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)

      particlesMesh.rotation.x += 0.0005
      particlesMesh.rotation.y += 0.0005

      // Follow mouse
      particlesMesh.rotation.x += mouse.y * 0.0005
      particlesMesh.rotation.y += mouse.x * 0.0005

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", () => {})
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement)
      }
      scene.remove(particlesMesh)
      particlesGeometry.dispose()
      particlesMaterial.dispose()
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0 -z-10" />
}
