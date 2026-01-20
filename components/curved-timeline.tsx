"use client"

import React, { useEffect, useRef, useState } from "react"


export function CurvedTimeline() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [height, setHeight] = useState(0)

    useEffect(() => {
        if (!containerRef.current) return
        const resizeObserver = new ResizeObserver(() => {
            setHeight(containerRef.current?.offsetHeight || 0)
        })
        resizeObserver.observe(containerRef.current)
        return () => resizeObserver.disconnect()
    }, [])

    return (
        <div ref={containerRef} className="absolute inset-0 pointer-events-none hidden md:block overflow-hidden">
            <svg
                width="100%"
                height="100%"
                viewBox={`0 0 200 ${height}`}
                preserveAspectRatio="none"
                className="absolute left-1/2 -translate-x-1/2 w-[200px] h-full"
            >
                {/* Maths Jungle Vine Gradient */}
                <defs>
                    <linearGradient id="vineGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
                        <stop offset="10%" stopColor="#10b981" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
                        <stop offset="90%" stopColor="#8b5cf6" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                    </linearGradient>
                    <pattern id="mathSymbols" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <text x="10" y="10" fontSize="10" fill="rgba(16,185,129,0.2)" fontFamily="monospace">∫</text>
                    </pattern>
                </defs>

                {/* The Curve Path */}
                {/* We use a sine wave generator for the path d */}
                <path
                    d={generateSinePath(height)}
                    fill="none"
                    stroke="url(#vineGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                />

                {/* Secondary decorative vines */}
                <path
                    d={generateSinePath(height, 30, 0.008, 50)}
                    fill="none"
                    stroke="rgba(16,185,129,0.2)"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                />
            </svg>
        </div>
    )
}

function generateSinePath(height: number, amplitude = 40, frequency = 0.005, phase = 0): string {
    if (height === 0) return ""

    const width = 200
    const center = width / 2

    let path = `M ${center} 0 `

    for (let y = 0; y <= height; y += 10) {
        const x = center + Math.sin(y * frequency + phase) * amplitude
        path += `L ${x} ${y} `
    }

    return path
}
