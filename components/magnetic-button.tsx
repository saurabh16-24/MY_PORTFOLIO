"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

export function MagneticButton({
  children,
  className = "",
  onClick,
  variant = "default",
  size = "default",
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      const distance = Math.sqrt(x * x + y * y)
      const maxDistance = 50

      if (distance < maxDistance) {
        const strength = (maxDistance - distance) / maxDistance
        const moveX = x * strength * 0.3
        const moveY = y * strength * 0.3

        button.style.transform = `translate(${moveX}px, ${moveY}px)`
      }
    }

    const handleMouseLeave = () => {
      button.style.transform = "translate(0px, 0px)"
    }

    button.addEventListener("mousemove", handleMouseMove)
    button.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      button.removeEventListener("mousemove", handleMouseMove)
      button.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <Button
      ref={buttonRef}
      variant={variant}
      size={size}
      className={`magnetic-button transition-transform duration-200 ease-out ${className}`}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}
