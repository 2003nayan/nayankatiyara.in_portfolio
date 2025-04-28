"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, Loader } from "@react-three/drei"
import { type Mesh, type Group, Vector3, MathUtils } from "three"
import { useAppStore } from "@/lib/store"
import { useMobile } from "@/hooks/use-mobile"

// Import gsap only on client side
const gsapPromise = typeof window !== "undefined" ? import("gsap") : null

const SKILLS = [
  // Frontend
  { name: "React", category: "frontend", level: 0.9 },
  { name: "Next.js", category: "frontend", level: 0.85 },
  { name: "TypeScript", category: "frontend", level: 0.8 },
  { name: "Tailwind", category: "frontend", level: 0.9 },
  { name: "GSAP", category: "frontend", level: 0.75 },
  { name: "Three.js", category: "frontend", level: 0.7 },
  { name: "Framer Motion", category: "frontend", level: 0.8 },

  // Backend
  { name: "Node.js", category: "backend", level: 0.85 },
  { name: "Express", category: "backend", level: 0.8 },
  { name: "MongoDB", category: "backend", level: 0.75 },
  { name: "PostgreSQL", category: "backend", level: 0.7 },
  { name: "Firebase", category: "backend", level: 0.8 },

  // Web3
  { name: "Solidity", category: "web3", level: 0.7 },
  { name: "Web3.js", category: "web3", level: 0.75 },
  { name: "Ethers.js", category: "web3", level: 0.7 },
  { name: "Hardhat", category: "web3", level: 0.65 },

  // Tools
  { name: "Git", category: "tools", level: 0.9 },
  { name: "Docker", category: "tools", level: 0.7 },
  { name: "CI/CD", category: "tools", level: 0.75 },
  { name: "Jest", category: "tools", level: 0.7 },
]

// Function to distribute points evenly on a sphere
function fibonacciSphere(samples: number, radius: number) {
  const points: Vector3[] = []
  const phi = Math.PI * (3 - Math.sqrt(5)) // Golden angle in radians

  for (let i = 0; i < samples; i++) {
    const y = 1 - (i / (samples - 1)) * 2 // y goes from 1 to -1
    const radiusAtY = Math.sqrt(1 - y * y) // Radius at y

    const theta = phi * i // Golden angle increment

    const x = Math.cos(theta) * radiusAtY
    const z = Math.sin(theta) * radiusAtY

    points.push(new Vector3(x * radius, y * radius, z * radius))
  }

  return points
}

type SkillNodeProps = {
  name: string
  position: Vector3
  level: number
  category: string
  index: number
}

function SkillNode({ name, position, level, category, index }: SkillNodeProps) {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const { isTerminalMode } = useAppStore()

  // Color based on category
  const getColor = () => {
    if (isTerminalMode) return 0x00ff00

    switch (category) {
      case "frontend":
        return 0x22d3ee // cyan
      case "backend":
        return 0x8b5cf6 // violet
      case "web3":
        return 0xf59e0b // amber
      case "tools":
        return 0x10b981 // emerald
      default:
        return 0xffffff
    }
  }

  // Size based on skill level
  const size = 0.1 + level * 0.1

  useFrame((state, delta) => {
    if (!meshRef.current) return

    // Pulse effect when hovered
    if (hovered) {
      meshRef.current.scale.x = 1 + Math.sin(state.clock.elapsedTime * 5) * 0.1
      meshRef.current.scale.y = meshRef.current.scale.x
      meshRef.current.scale.z = meshRef.current.scale.x
    } else {
      meshRef.current.scale.x = MathUtils.lerp(meshRef.current.scale.x, 1, 0.1)
      meshRef.current.scale.y = meshRef.current.scale.x
      meshRef.current.scale.z = meshRef.current.scale.x
    }

    // Terminal mode effect
    if (isTerminalMode && meshRef.current.material) {
      ;(meshRef.current.material as any).color.set(0x00ff00)
      ;(meshRef.current.material as any).wireframe = true
    } else if (meshRef.current.material) {
      ;(meshRef.current.material as any).color.set(getColor())
      ;(meshRef.current.material as any).wireframe = false
    }
  })

  return (
    <group position={position}>
      <mesh ref={meshRef} scale={size} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color={getColor()}
          metalness={0.3}
          roughness={0.7}
          emissive={getColor()}
          emissiveIntensity={hovered ? 0.5 : 0.2}
          wireframe={isTerminalMode}
        />
      </mesh>
      <Text
        position={[0, 0, 1.2 * size]}
        fontSize={0.15}
        color={isTerminalMode ? "#00ff00" : "#ffffff"}
        anchorX="center"
        anchorY="middle"
        depthOffset={-1}
        outlineWidth={0.01}
        outlineColor={isTerminalMode ? "#003300" : "#000000"}
      >
        {name}
      </Text>
    </group>
  )
}

function SkillCloudContent() {
  const groupRef = useRef<Group>(null)
  const { isTerminalMode, isSkillCloudActive } = useAppStore()
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  // Generate positions on a sphere
  const positions = fibonacciSphere(SKILLS.length, 3)

  useFrame((state, delta) => {
    if (!groupRef.current) return

    // Rotate the group slowly
    groupRef.current.rotation.y += delta * 0.1

    // Mouse interaction
    const mouseX = state.mouse.x * 0.5
    const mouseY = state.mouse.y * 0.5

    groupRef.current.rotation.x = MathUtils.lerp(groupRef.current.rotation.x, mouseY, 0.05)

    groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, mouseX, 0.05)
  })

  // Filter skills by category if active
  const filteredSkills = activeCategory ? SKILLS.filter((skill) => skill.category === activeCategory) : SKILLS

  // Reorganize positions when category changes
  useEffect(() => {
    if (!groupRef.current) return

    const newPositions = fibonacciSphere(filteredSkills.length, 3)

    // Update positions of skill nodes using direct manipulation instead of GSAP
    // We'll use a simple animation approach that doesn't require GSAP
    const startTime = Date.now()
    const duration = 1000 // 1 second
    const initialPositions = groupRef.current.children.map((child) => ({
      x: child.position.x,
      y: child.position.y,
      z: child.position.z,
    }))

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Ease function (cubic ease out)
      const easeProgress = 1 - Math.pow(1 - progress, 3)

      groupRef.current?.children.forEach((child, index) => {
        if (index < newPositions.length) {
          const initial = initialPositions[index]
          const target = newPositions[index]

          child.position.x = initial.x + (target.x - initial.x) * easeProgress
          child.position.y = initial.y + (target.y - initial.y) * easeProgress
          child.position.z = initial.z + (target.z - initial.z) * easeProgress
        }
      })

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }, [activeCategory, filteredSkills.length])

  return (
    <group ref={groupRef}>
      {filteredSkills.map((skill, index) => (
        <SkillNode
          key={skill.name}
          name={skill.name}
          position={positions[index]}
          level={skill.level}
          category={skill.category}
          index={index}
        />
      ))}
    </group>
  )
}

export default function SkillCloud() {
  const isMobile = useMobile()
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  return (
    <>
      <Canvas className="skill-cloud-canvas">
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <SkillCloudContent />
      </Canvas>
      <Loader />

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        <button
          className="px-3 py-1 bg-slate-800/80 backdrop-blur-sm rounded-full text-xs text-cyan-400 border border-cyan-500/30 hover:bg-slate-700"
          onClick={() => setActiveCategory(null)}
        >
          All
        </button>
        <button
          className="px-3 py-1 bg-slate-800/80 backdrop-blur-sm rounded-full text-xs text-cyan-400 border border-cyan-500/30 hover:bg-slate-700"
          onClick={() => setActiveCategory("frontend")}
        >
          Frontend
        </button>
        <button
          className="px-3 py-1 bg-slate-800/80 backdrop-blur-sm rounded-full text-xs text-cyan-400 border border-cyan-500/30 hover:bg-slate-700"
          onClick={() => setActiveCategory("backend")}
        >
          Backend
        </button>
        <button
          className="px-3 py-1 bg-slate-800/80 backdrop-blur-sm rounded-full text-xs text-cyan-400 border border-cyan-500/30 hover:bg-slate-700"
          onClick={() => setActiveCategory("web3")}
        >
          Web3
        </button>
        <button
          className="px-3 py-1 bg-slate-800/80 backdrop-blur-sm rounded-full text-xs text-cyan-400 border border-cyan-500/30 hover:bg-slate-700"
          onClick={() => setActiveCategory("tools")}
        >
          Tools
        </button>
      </div>
    </>
  )
}
