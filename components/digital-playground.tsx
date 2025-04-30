"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { useTheme } from "next-themes"

interface Raindrop {
  x: number
  y: number
  speed: number
  value: string
  size: number
  opacity: number
  hue: number
}

export function DigitalPlayground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const raindrops = useRef<Raindrop[]>([])
  const animationRef = useRef<number>(0)
  const { theme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)
  const [isAudioEnabled, setIsAudioEnabled] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Check if we're on the client side
  useEffect(() => {
    setIsClient(true)
    setIsMounted(true)
  }, [])

  // Initialize audio context - only on client side
  const initAudio = () => {
    if (!isClient) return

    try {
      if (!audioContextRef.current) {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext
        if (AudioContext) {
          audioContextRef.current = new AudioContext()
        }
      }
    } catch (error) {
      console.error("Web Audio API not supported:", error)
    }
  }

  // Play a tone based on the binary value - only on client side
  const playTone = (value: string, x: number, y: number) => {
    if (!isClient || !audioContextRef.current || !isAudioEnabled) return

    try {
      // Convert binary to decimal for frequency
      const decimal = Number.parseInt(value, 2) || 1
      const normalizedX = x / (canvasRef.current?.width || 1)

      // Create oscillator
      const oscillator = audioContextRef.current.createOscillator()
      const gainNode = audioContextRef.current.createGain()

      // Set frequency based on binary value and position
      const baseFreq = 200 + (decimal % 10) * 50
      oscillator.type = "sine"
      oscillator.frequency.value = baseFreq + normalizedX * 300

      // Set volume and connect
      gainNode.gain.value = 0.1
      oscillator.connect(gainNode)
      gainNode.connect(audioContextRef.current.destination)

      // Quick fade out
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 0.5)

      // Start and stop
      oscillator.start()
      oscillator.stop(audioContextRef.current.currentTime + 0.5)
    } catch (error) {
      console.error("Error playing tone:", error)
      setIsAudioEnabled(false)
    }
  }

  // Initialize the canvas and start the animation - only on client side
  useEffect(() => {
    if (!isClient) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const updateCanvasSize = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
      }
    }

    // Initialize raindrops
    const initRaindrops = () => {
      raindrops.current = []
      const count = Math.floor(canvas.width / 20) // One raindrop every ~20px

      for (let i = 0; i < count; i++) {
        raindrops.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speed: 1 + Math.random() * 3,
          value: Math.random() > 0.5 ? "1" : "0",
          size: 20 + Math.floor(Math.random() * 6),
          opacity: 0.7 + Math.random() * 0.3,
          hue: Math.random() * 60 + 120, // Cyan to blue hues
        })
      }
    }

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return

      // Clear canvas with slight opacity for trail effect
      ctx.fillStyle = theme === "dark" ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw raindrops
      raindrops.current.forEach((drop, index) => {
        // Update position
        drop.y += drop.speed

        // Reset if off screen
        if (drop.y > canvas.height) {
          drop.y = 0
          drop.x = Math.random() * canvas.width
          drop.value = Math.random() > 0.5 ? "1" : "0"

          // Play sound when a drop resets if hovering
          if (isHovering && index % 5 === 0) {
            playTone(drop.value, drop.x, drop.y)
          }
        }

        // Randomly change values
        if (Math.random() > 0.95) {
          drop.value = Math.random() > 0.5 ? "1" : "0"
        }

        // Draw the binary digit
        ctx.font = `${drop.size}px monospace`
        ctx.fillStyle =
          theme === "dark"
            ? `hsla(${drop.hue}, 100%, 70%, ${drop.opacity})`
            : `hsla(${drop.hue}, 100%, 40%, ${drop.opacity})`
        ctx.fillText(drop.value, drop.x, drop.y)
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    // Set up and start animation
    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)
    initRaindrops()
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateCanvasSize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [theme, isHovering, isAudioEnabled, isClient])

  // Handle mouse interaction
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isClient || !canvasRef.current || !isAudioEnabled) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Find closest raindrop and change its value
    let closest = null
    let minDist = Number.POSITIVE_INFINITY

    raindrops.current.forEach((drop) => {
      const dist = Math.sqrt(Math.pow(drop.x - x, 2) + Math.pow(drop.y - y, 2))
      if (dist < minDist && dist < 50) {
        minDist = dist
        closest = drop
      }
    })

    if (closest) {
      closest.value = closest.value === "1" ? "0" : "1"
      closest.opacity = 1
      closest.size += 2
      setTimeout(() => {
        if (closest) {
          closest.size -= 2
          closest.opacity = 0.7 + Math.random() * 0.3
        }
      }, 200)

      playTone(closest.value, closest.x, closest.y)
    }
  }

  const toggleAudio = () => {
    if (!isAudioEnabled) {
      initAudio()
    }
    setIsAudioEnabled(!isAudioEnabled)
  }

  // Show a loading state until client-side code is ready
  if (!isMounted) {
    return <div className="w-full h-[450px] bg-muted rounded-lg animate-pulse"></div>
  }

  return (
    <div className="relative w-full rounded-lg overflow-hidden bg-card">
      <div className="absolute top-3 right-3 z-10 flex gap-2">
        {isClient && (
          <button
            onClick={toggleAudio}
            className="bg-background/80 backdrop-blur-sm text-foreground px-3 py-1.5 rounded-md text-xs font-medium hover:bg-background/90 transition-colors"
          >
            {isAudioEnabled ? "🔊 Sound On" : "🔇 Sound Off"}
          </button>
        )}
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="text-center bg-background/30 backdrop-blur-sm p-4 rounded-lg">
        </div>
      </div>

      <canvas
        ref={canvasRef}
        className="w-full h-full"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      ></canvas>
    </div>
  )
}
