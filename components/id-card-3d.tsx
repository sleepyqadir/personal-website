"use client"

import { useRef, useState, useEffect, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Text, Environment, Float, PresentationControls, RoundedBox } from "@react-three/drei"
import type { Group } from "three"
import { useTheme } from "next-themes"

// Separate the Card component to allow for better error handling
function Card({ isDarkMode }: { isDarkMode: boolean }) {
  const group = useRef<Group>(null)
  const { viewport } = useThree()
  const isMobile = viewport.width < 5

  // Optimize the animation to be less resource-intensive
  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.getElapsedTime()
    group.current.rotation.x = Math.sin(t / 6) / 10
    group.current.rotation.y = Math.sin(t / 4) / 10
  })

  return (
    <group ref={group}>
      {/* Card base - using RoundedBox from drei */}
      <RoundedBox args={[3, 4, 0.2]} radius={0.1} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color={isDarkMode ? "#111" : "#000"} />
      </RoundedBox>

      {/* ID CARD text */}
      <group position={[1.2, 1.8, 0.11]} rotation={[0, 0, Math.PI / 2]}>
        <Text
          fontSize={0.15}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          position={[0, 0, 0]}
          font="/fonts/Inter_Bold.json"
        >
          ID CARD
        </Text>
      </group>

      {/* Name text */}
      <group position={[0, -1.2, 0.11]}>
        <Text
          fontSize={0.4}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          position={[0, 0, 0]}
          font="/fonts/Inter_Bold.json"
        >
          YOUR
        </Text>
        <Text
          fontSize={0.4}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          position={[0, -0.5, 0]}
          font="/fonts/Inter_Bold.json"
        >
          NAME
        </Text>
      </group>

      {/* Tagline */}
      <Text
        fontSize={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        position={[0, -1.9, 0.11]}
        font="/fonts/Inter_Regular.json"
      >
        I like building cool stuff
      </Text>

      {/* Dots pattern - reduced number for better performance */}
      <group position={[0.8, -1.5, 0.11]}>
        {[...Array(15)].map((_, i) => (
          <mesh key={i} position={[(i % 5) * 0.15, -Math.floor(i / 5) * 0.15, 0]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color="#ffffff" opacity={0.7} transparent />
          </mesh>
        ))}
      </group>

      {/* Floating particles - reduced number for better performance */}
      {[...Array(10)].map((_, i) => (
        <Float key={i} speed={1} rotationIntensity={1} floatIntensity={1}>
          <mesh position={[(Math.random() - 0.5) * 4, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 2 - 1]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial
              color={isDarkMode ? "#ffffff" : "#ffffff"}
              emissive={isDarkMode ? "#333333" : "#666666"}
              emissiveIntensity={0.5}
              transparent
              opacity={0.7}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

// Fallback component for when the 3D card is loading
function CardFallback() {
  return (
    <mesh>
      <boxGeometry args={[3, 4, 0.2]} />
      <meshStandardMaterial color="#000000" />
    </mesh>
  )
}

export function IDCard3D() {
  const { theme } = useTheme()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      setIsDarkMode(theme === "dark")
    }
  }, [theme, mounted])

  if (!mounted) {
    return (
      <div className="relative w-full max-w-[300px] aspect-[3/4] bg-black rounded-lg overflow-hidden">
        <div className="absolute top-0 right-0 bg-black text-white py-1 px-3 rotate-90 origin-bottom-right translate-y-[-100%] uppercase text-xs tracking-widest">
          ID CARD
        </div>
        <div className="absolute bottom-0 left-0 w-full p-6 text-white">
          <h3 className="text-3xl font-bold">YOUR</h3>
          <h3 className="text-3xl font-bold">NAME</h3>
          <p className="text-sm mt-1">I like building cool stuff</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <PresentationControls
          global
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
          config={{ mass: 2, tension: 400 }}
          snap={{ mass: 4, tension: 400 }}
        >
          <Suspense fallback={<CardFallback />}>
            <Card isDarkMode={isDarkMode} />
          </Suspense>
        </PresentationControls>
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
