"use client"

import React, { useRef, useEffect } from "react"

export function DataNetworkBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationFrameId: number
        let particles: Particle[] = []
        const particleCount = 60
        const connectionDistance = 150
        const mouseSafetyRadius = 150

        // Set canvas dimensions
        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        window.addEventListener("resize", resizeCanvas)
        resizeCanvas()

        // Mouse tracking
        const mouse = { x: -1000, y: -1000 }

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX
            mouse.y = e.clientY
        }

        window.addEventListener('mousemove', handleMouseMove)

        class Particle {
            x: number
            y: number
            vx: number
            vy: number
            size: number
            color: string

            constructor() {
                this.x = Math.random() * canvas!.width
                this.y = Math.random() * canvas!.height
                this.vx = (Math.random() - 0.5) * 1.5
                this.vy = (Math.random() - 0.5) * 1.5
                this.size = Math.random() * 2 + 1
                this.color = Math.random() > 0.5 ? "#10b981" : "#06b6d4" // Emerald or Cyan
            }

            update() {
                this.x += this.vx
                this.y += this.vy

                // Bounce off edges
                if (this.x < 0 || this.x > canvas!.width) this.vx *= -1
                if (this.y < 0 || this.y > canvas!.height) this.vy *= -1

                // Mouse interaction (repel)
                const dx = this.x - mouse.x
                const dy = this.y - mouse.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < mouseSafetyRadius) {
                    const angle = Math.atan2(dy, dx)
                    const force = (mouseSafetyRadius - distance) / mouseSafetyRadius
                    const push = force * 2

                    this.x += Math.cos(angle) * push
                    this.y += Math.sin(angle) * push
                }
            }

            draw() {
                if (!ctx) return
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fillStyle = this.color
                ctx.fill()
            }
        }

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle())
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Update and draw particles
            particles.forEach(p => {
                p.update()
                p.draw()
            })

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < connectionDistance) {
                        ctx.beginPath()
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        const opacity = 1 - distance / connectionDistance
                        ctx.strokeStyle = `rgba(16, 185, 129, ${opacity * 0.4})` // Greenish connections
                        ctx.lineWidth = 1
                        ctx.stroke()
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener("resize", resizeCanvas)
            window.removeEventListener('mousemove', handleMouseMove)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 bg-[#020617] pointer-events-none" // Deep dark blue background
        />
    )
}
