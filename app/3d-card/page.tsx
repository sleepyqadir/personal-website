"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { IDCard3D } from "@/components/id-card-3d"

export default function ThreeDCardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Simulate loading time and check for errors
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    const errorHandler = (event: ErrorEvent) => {
      console.error("Error in 3D rendering:", event.error)
      setHasError(true)
      setIsLoading(false)
    }

    window.addEventListener("error", errorHandler)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("error", errorHandler)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">3D ID Card</h1>
          <p className="text-muted-foreground">An interactive 3D version of my ID card. Click and drag to rotate.</p>
        </div>

        <div className="flex justify-center">
          {isLoading ? (
            <div className="w-[300px] aspect-[3/4] bg-muted rounded-lg flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground"></div>
            </div>
          ) : hasError ? (
            <div className="w-[300px] aspect-[3/4] bg-muted rounded-lg flex flex-col items-center justify-center p-6 text-center">
              <div className="text-4xl mb-4">😕</div>
              <h3 className="text-xl font-medium mb-2">Rendering Error</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Sorry, we couldn't load the 3D card. Your device might not support WebGL or 3D rendering.
              </p>
              <Link href="/">
                <Button>Return Home</Button>
              </Link>
            </div>
          ) : (
            <div className="w-[300px] h-[400px]">
              <IDCard3D />
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            This 3D card is rendered using Three.js and React Three Fiber. It may not work on all devices or browsers.
          </p>
        </div>
      </div>
    </div>
  )
}
