"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, Line, Loader } from "@react-three/drei"
import { type Mesh, type Group, MathUtils } from "three"
import { useAppStore } from "@/lib/store"

// Simulated blockchain data
const BLOCKS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  transactions: Math.floor(Math.random() * 10) + 1,
  timestamp: Date.now() - i * 60000,
  size: Math.random() * 0.5 + 0.5,
}))

function Node({ position, size, isActive }: { position: [number, number, number]; size: number; isActive: boolean }) {
  const meshRef = useRef<Mesh>(null)
  const { isTerminalMode } = useAppStore()

  useFrame((state) => {
    if (!meshRef.current) return

    // Pulse effect for active nodes
    if (isActive) {
      meshRef.current.scale.x = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.2
      meshRef.current.scale.y = meshRef.current.scale.x
      meshRef.current.scale.z = meshRef.current.scale.x
    }

    // Terminal mode effect
    if (isTerminalMode && meshRef.current.material) {
      ;(meshRef.current.material as any).color.set(0x00ff00)
      ;(meshRef.current.material as any).wireframe = true
    } else if (meshRef.current.material) {
      ;(meshRef.current.material as any).color.set(isActive ? 0xf59e0b : 0x22d3ee)
      ;(meshRef.current.material as any).wireframe = false
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={size}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial
        color={isTerminalMode ? 0x00ff00 : isActive ? 0xf59e0b : 0x22d3ee}
        metalness={0.3}
        roughness={0.7}
        emissive={isTerminalMode ? 0x003300 : isActive ? 0x663300 : 0x0a5060}
        emissiveIntensity={isActive ? 0.5 : 0.2}
        wireframe={isTerminalMode}
      />
    </mesh>
  )
}

function Connection({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
  const { isTerminalMode } = useAppStore()

  return (
    <Line
      points={[start, end]}
      color={isTerminalMode ? 0x00ff00 : 0x22d3ee}
      lineWidth={1}
      dashed={isTerminalMode}
      dashSize={0.2}
      dashOffset={0}
      dashScale={1}
      opacity={0.5}
    />
  )
}

function BlockchainVisualization() {
  const groupRef = useRef<Group>(null)
  const { isTerminalMode, isWeb3Connected } = useAppStore()
  const [activeNodeIndex, setActiveNodeIndex] = useState(0)

  // Position nodes in a circular pattern
  const radius = 3
  const nodePositions = BLOCKS.map((_, i) => {
    const angle = (i / BLOCKS.length) * Math.PI * 2
    return [Math.cos(angle) * radius, Math.sin(angle) * radius, 0] as [number, number, number]
  })

  // Create connections between nodes
  const connections = []
  for (let i = 0; i < BLOCKS.length; i++) {
    const nextIndex = (i + 1) % BLOCKS.length
    connections.push({
      start: nodePositions[i],
      end: nodePositions[nextIndex],
    })
  }

  // Simulate blockchain activity
  useEffect(() => {
    if (!isWeb3Connected) return

    const interval = setInterval(() => {
      setActiveNodeIndex((prev) => (prev + 1) % BLOCKS.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [isWeb3Connected])

  useFrame((state, delta) => {
    if (!groupRef.current) return

    // Rotate the group slowly
    groupRef.current.rotation.z += delta * 0.1

    // Mouse interaction
    const mouseX = state.mouse.x * 0.5
    const mouseY = state.mouse.y * 0.5

    groupRef.current.rotation.x = MathUtils.lerp(groupRef.current.rotation.x, mouseY, 0.05)

    groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, mouseX, 0.05)
  })

  return (
    <group ref={groupRef}>
      {/* Central node */}
      <Node position={[0, 0, 0]} size={1} isActive={isWeb3Connected} />

      {/* Blockchain nodes */}
      {BLOCKS.map((block, i) => (
        <Node
          key={block.id}
          position={nodePositions[i]}
          size={block.size}
          isActive={isWeb3Connected && i === activeNodeIndex}
        />
      ))}

      {/* Connections */}
      {connections.map((conn, i) => (
        <Connection key={i} start={conn.start} end={conn.end} />
      ))}

      {/* Central to nodes connections */}
      {nodePositions.map((pos, i) => (
        <Connection key={`central-${i}`} start={[0, 0, 0]} end={pos} />
      ))}

      {/* Text label */}
      <Text
        position={[0, -4, 0]}
        fontSize={0.5}
        color={isTerminalMode ? "#00ff00" : "#ffffff"}
        anchorX="center"
        anchorY="middle"
      >
        {isWeb3Connected ? "Connected to Ethereum" : "Connect Wallet to Activate"}
      </Text>
    </group>
  )
}

export default function Web3Visualizer() {
  const { isWeb3Connected, setWeb3Connected } = useAppStore()

  return (
    <div className="relative w-full h-full">
      <Canvas className="web3-visualizer-canvas">
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <BlockchainVisualization />
      </Canvas>
      <Loader />

      <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10">
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            isWeb3Connected
              ? "bg-amber-500 text-slate-900 hover:bg-amber-600"
              : "bg-slate-800 text-amber-500 border border-amber-500/30 hover:bg-slate-700"
          }`}
          onClick={() => setWeb3Connected(!isWeb3Connected)}
        >
          {isWeb3Connected ? "Disconnect Wallet" : "Connect Wallet"}
        </button>
      </div>
    </div>
  )
}
