"use client"

import React, { useEffect, useRef } from "react"

export function MultiColorNetwork() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        console.log("MultiColorNetwork: Initializing...")

        let animationFrameId: number
        let particles: Particle[] = []

        // Configuration
        // Calculate particle count based on area (roughly 1 particle per 9000px^2)
        // Default to 150 if calculation fails or is too small
        let particleCount = 150
        const connectionDistance = 180 // Increased distance for better connectivity
        const colors = [
            "255, 100, 50",   // Bright Orange
            "50, 255, 150",   // Bright Green
            "50, 200, 255",   // Bright Cyan
            "255, 80, 80",    // Bright Red
            "255, 255, 100"   // Yellow (Bonus for variety)
        ]

        const resizeCanvas = () => {
            if (!canvas) return
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight

            // Dynamic density: dense enough to be visible, sparse enough to perform
            const area = canvas.width * canvas.height
            particleCount = Math.floor(area / 9000)
            if (particleCount < 100) particleCount = 100

            initParticles()
        }

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
                this.vx = (Math.random() - 0.5) * 0.8 // Slightly faster
                this.vy = (Math.random() - 0.5) * 0.8
                this.size = Math.random() * 2.5 + 1.5 // Larger
                this.color = colors[Math.floor(Math.random() * colors.length)]
            }

            update() {
                this.x += this.vx
                this.y += this.vy

                // Bounce
                if (this.x < 0 || this.x > canvas!.width) this.vx *= -1
                if (this.y < 0 || this.y > canvas!.height) this.vy *= -1
            }

            draw() {
                if (!ctx) return
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(${this.color}, 0.9)` // Higher opacity
                ctx.fill()
            }
        }


        const initParticles = () => {
            particles = []
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle())
            }
            console.log("MultiColorNetwork: Particles initialized", particles.length)
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Draw Connections first (behind nodes)
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const dist = Math.sqrt(dx * dx + dy * dy)

                    if (dist < connectionDistance) {
                        const opacity = 1 - (dist / connectionDistance)
                        ctx.beginPath()
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)

                        // Gradient connection
                        const gradient = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y)
                        gradient.addColorStop(0, `rgba(${particles[i].color}, ${opacity * 0.4})`)
                        gradient.addColorStop(1, `rgba(${particles[j].color}, ${opacity * 0.4})`)

                        ctx.strokeStyle = gradient
                        ctx.lineWidth = 1
                        ctx.stroke()
                    }
                }
            }

            // Draw Nodes
            particles.forEach(p => {
                p.update()
                p.draw()
            })

            animationFrameId = requestAnimationFrame(draw)
        }

        resizeCanvas()
        window.addEventListener("resize", resizeCanvas)
        draw()

        return () => {
            window.removeEventListener("resize", resizeCanvas)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <div className="absolute inset-0 pointer-events-none z-0">
            <canvas ref={canvasRef} className="w-full h-full" />
        </div>
    )
}
