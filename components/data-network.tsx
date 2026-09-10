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
                this.size = Math.random() * 3 + 1
                const colors = ["#ff007f", "#00f0ff", "#7000ff", "#ffea00", "#10b981"]
                this.color = colors[Math.floor(Math.random() * colors.length)]
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
                        ctx.strokeStyle = `rgba(160, 100, 255, ${opacity * 0.3})` // Purple-ish connections
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
        <div className="fixed inset-0 z-0 bg-vibrant-mesh pointer-events-none overflow-hidden mix-blend-multiply opacity-90 dark:opacity-40">
            {/* Colorful Glassmorphic Blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/50 rounded-full blur-[120px] animate-pulse mix-blend-screen" style={{ animationDuration: '8s' }}></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/50 rounded-full blur-[120px] animate-pulse mix-blend-screen" style={{ animationDuration: '10s' }}></div>
            <div className="absolute top-[40%] left-[50%] w-[30%] h-[30%] bg-pink-600/40 rounded-full blur-[100px] animate-pulse mix-blend-screen" style={{ animationDuration: '12s' }}></div>
            
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full mix-blend-plus-lighter" />
        </div>
    )
}
