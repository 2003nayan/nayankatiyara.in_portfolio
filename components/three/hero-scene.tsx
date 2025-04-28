"use client"

import { Suspense, useRef, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  Text3D,
  Center,
  Float,
  Loader,
  PerformanceMonitor,
} from "@react-three/drei"
import { EffectComposer, Bloom, DepthOfField, Noise, Vignette } from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"
import type { Mesh, Group } from "three"
import { useAppStore } from "@/lib/store"
import { useDeviceCapabilities } from "@/hooks/use-device-capabilities"
import FloatingTechIcons from "./floating-tech-icons"

function HeroContent() {
  const { camera } = useThree()
  const groupRef = useRef<Group>(null)
  const textRef = useRef<Mesh>(null)
  const { isTerminalMode, batterySaverMode } = useAppStore()

  // Set initial camera position
  useEffect(() => {
    camera.position.set(0, 0, 5)
  }, [camera])

  useFrame((state, delta) => {
    if (!groupRef.current || !textRef.current) return

    // Rotate the group slowly
    groupRef.current.rotation.y += delta * 0.1

    // Make text face the camera
    textRef.current.lookAt(camera.position)

    // Terminal mode effect
    if (isTerminalMode && textRef.current.material) {
      textRef.current.material.color.set(0x00ff00)
    } else if (textRef.current.material) {
      textRef.current.material.color.set(0x22d3ee)
    }
  })

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Center>
          <Text3D
            ref={textRef}
            font="/fonts/Inter_Bold.json"
            size={0.8}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
          >
            NAYAN
            <meshStandardMaterial
              color={isTerminalMode ? 0x00ff00 : 0x22d3ee}
              metalness={0.8}
              roughness={0.2}
              emissive={isTerminalMode ? 0x003300 : 0x0a5060}
              emissiveIntensity={0.5}
            />
          </Text3D>
        </Center>
      </Float>

      <FloatingTechIcons />
    </group>
  )
}

export default function HeroScene() {
  const { batterySaverMode, toggleBatterySaverMode } = useAppStore()
  const capabilities = useDeviceCapabilities()

  // Determine if we should use high quality effects
  const useHighQuality = !batterySaverMode && capabilities.isHighPerformanceGPU && !capabilities.isMobile

  return (
    <>
      <Canvas className="hero-canvas">
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault fov={75} position={[0, 0, 5]} />

          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />

          <HeroContent />

          <Environment preset="city" />

          {useHighQuality && (
            <EffectComposer>
              <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={0.5} />
              <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
              <Noise opacity={0.02} blendFunction={BlendFunction.ADD} />
              <Vignette eskil={false} offset={0.1} darkness={0.5} />
            </EffectComposer>
          )}

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            rotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
        </Suspense>

        <PerformanceMonitor
          onDecline={() => {
            if (!batterySaverMode) toggleBatterySaverMode()
          }}
        />
      </Canvas>
      <Loader />
    </>
  )
}
