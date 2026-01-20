"use client"

import React, { useEffect, useState } from "react"
import { Database, Binary, BarChart3, PieChart, Brain, Server, Wifi, FileCode, Cpu } from "lucide-react"

export function DataIntroScreen({ onComplete }: { onComplete: () => void }) {
    const [isVisible, setIsVisible] = useState(true)
    const [typedText, setTypedText] = useState("")
    const fullText = "WELCOME TO THE WORLD OF DATA"

    useEffect(() => {
        // Typing effect
        let currentIndex = 0
        const typingInterval = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setTypedText(fullText.slice(0, currentIndex))
                currentIndex++
            } else {
                clearInterval(typingInterval)
                // Fade out after typing + slight delay
                setTimeout(() => {
                    setIsVisible(false)
                    setTimeout(onComplete, 800) // Call onComplete after fade out animation
                }, 1500)
            }
        }, 100)

        return () => clearInterval(typingInterval)
    }, [onComplete])

    if (!isVisible) return null

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#020617] transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
        >
            <div className="relative w-full h-full overflow-hidden">
                {/* Floating Data Stickers */}
                <div className="absolute inset-0">
                    {[
                        { Icon: Database, color: "#10b981", top: "10%", left: "10%", delay: "0s" },
                        { Icon: Binary, color: "#00f2ff", top: "20%", right: "15%", delay: "1s" },
                        { Icon: BarChart3, color: "#a855f7", bottom: "30%", left: "20%", delay: "0.5s" },
                        { Icon: PieChart, color: "#f59e0b", top: "40%", right: "25%", delay: "1.5s" },
                        { Icon: Brain, color: "#ec4899", bottom: "15%", right: "10%", delay: "2s" },
                        { Icon: Server, color: "#3b82f6", top: "15%", left: "40%", delay: "0.8s" },
                        { Icon: Wifi, color: "#ef4444", bottom: "40%", left: "5%", delay: "1.2s" },
                        { Icon: FileCode, color: "#8b5cf6", top: "60%", right: "5%", delay: "0.3s" },
                        { Icon: Cpu, color: "#06b6d4", bottom: "20%", left: "35%", delay: "1.8s" },
                    ].map((sticker, index) => (
                        <div
                            key={index}
                            className="absolute animate-float"
                            style={{
                                top: sticker.top,
                                left: sticker.left,
                                right: sticker.right,
                                bottom: sticker.bottom,
                                animationDelay: sticker.delay,
                            }}
                        >
                            <sticker.Icon
                                size={64}
                                color={sticker.color}
                                className="opacity-20 animate-pulse"
                            />
                        </div>
                    ))}
                </div>

                {/* Central Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="font-mono text-3xl sm:text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 tracking-tighter text-center px-4">
                        {typedText}
                        <span className="animate-blink">|</span>
                    </h1>
                </div>

                {/* Matrix/Code Rain Effect (Simulated with simple vertical lines for now) */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-[1px] bg-emerald-500/50 animate-matrix-rain"
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDuration: `${Math.random() * 2 + 1}s`,
                                top: `-${Math.random() * 20}%`,
                                height: `${Math.random() * 20 + 10}%`
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
