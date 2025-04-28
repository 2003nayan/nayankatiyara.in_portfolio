"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Float } from "@react-three/drei"
import { type Group, type Mesh, MathUtils } from "three"
import { useAppStore } from "@/lib/store"

const ICONS = [
  { name: "Next.js", position: [1, 0, 0], scale: 0.5 },
  { name: "React", position: [-1, 0.5, -1], scale: 0.5 },
  { name: "TypeScript", position: [0, -1, -2], scale: 0.5 },
  { name: "Web3", position: [2, 1, -1], scale: 0.5 },
  { name: "Node.js", position: [-2, -0.5, -1], scale: 0.5 },
  { name: "MongoDB", position: [0, 1.5, -2], scale: 0.5 },
  { name: "Tailwind", position: [-1.5, -1.5, -1], scale: 0.5 },
  { name: "GSAP", position: [1.5, -1, -2], scale: 0.5 },
]

type FloatingIconProps = {
  name: string
  position: [number, number, number]
  scale: number
}

function FloatingIcon({ name, position, scale }: FloatingIconProps) {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const { isTerminalMode } = useAppStore()

  // Randomize initial rotation
  const initialRotation = useRef([Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI])

  useFrame((state, delta) => {
    if (!meshRef.current) return

    // Rotate slowly
    meshRef.current.rotation.x += delta * 0.1
    meshRef.current.rotation.y += delta * 0.15

    // Scale up when hovered
    meshRef.current.scale.x = MathUtils.lerp(meshRef.current.scale.x, hovered ? scale * 1.2 : scale, 0.1)
    meshRef.current.scale.y = meshRef.current.scale.x
    meshRef.current.scale.z = meshRef.current.scale.x

    // Terminal mode effect
    if (isTerminalMode) {
      meshRef.current.material.wireframe = true
      meshRef.current.material.color.set(0x00ff00)
    } else {
      meshRef.current.material.wireframe = false
      meshRef.current.material.color.set(hovered ? 0x22d3ee : 0xffffff)
    }
  })

  return (
    <Float
      speed={2} // Animation speed
      rotationIntensity={0.5} // XYZ rotation intensity
      floatIntensity={1} // Up/down float intensity
    >
      <mesh
        ref={meshRef}
        position={position}
        scale={scale}
        rotation={[initialRotation.current[0], initialRotation.current[1], initialRotation.current[2]]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color={0xffffff} />
        <Text
          position={[0, 0, 1.1]}
          fontSize={0.3}
          color={isTerminalMode ? "#00ff00" : "#22d3ee"}
          anchorX="center"
          anchorY="middle"
        >
          {name}
        </Text>
      </mesh>
    </Float>
  )
}

export default function FloatingTechIcons() {
  const groupRef = useRef<Group>(null)
  const { scrollProgress, isTerminalMode } = useAppStore()

  useFrame((state) => {
    if (!groupRef.current) return

    // Rotate the entire group based on mouse position
    const mouseX = state.mouse.x * 0.1
    const mouseY = state.mouse.y * 0.1

    groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, mouseX, 0.05)

    groupRef.current.rotation.x = MathUtils.lerp(groupRef.current.rotation.x, mouseY, 0.05)

    // Move the group based on scroll progress
    groupRef.current.position.y = MathUtils.lerp(groupRef.current.position.y, -scrollProgress * 5, 0.05)
  })

  return (
    <group ref={groupRef}>
      {ICONS.map((icon, index) => (
        <FloatingIcon key={icon.name} name={icon.name} position={icon.position} scale={icon.scale} />
      ))}
    </group>
  )
}
