"use client"

import React, { useState, useEffect, Suspense, useMemo, useCallback } from "react"
import emailjs from '@emailjs/browser'
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Download,
  ExternalLink,
  BarChart3,
  Database,
  Brain,
  TrendingUp,
  Code,
  FileText,
  Menu,
  X,
  Award,
  Sun,
  Moon,
  Monitor,
} from "lucide-react"
import { Hero3DScene, Skills3DScene, Contact3DScene } from "@/components/3d-scene"
import { ScrollReveal } from "@/components/scroll-reveal"
import { MagneticButton } from "@/components/magnetic-button"

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min
const pickRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

const FloatingParticles = React.memo(() => {
  const [particles, setParticles] = useState<Array<{
    left: string;
    top: string;
    animationDelay: string;
    animationDuration: string;
  }>>([])

  useEffect(() => {
    // Detect device type for optimization
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    const particleCount = isMobile ? 8 : 15 // Reduced from 20
    
    // Generate particles only on client side to avoid hydration mismatch
    const newParticles = [...Array(particleCount)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 8}s`,
      animationDuration: `${8 + Math.random() * 4}s`,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-accent/20 rounded-full animate-particle-float"
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.animationDelay,
            animationDuration: particle.animationDuration,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  )
})

FloatingParticles.displayName = 'FloatingParticles'

const SpaceEnvironment = React.memo(({ enabled }: { enabled: boolean }) => {
  const isMobile =
    typeof navigator !== "undefined" &&
    /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  
  // Don't render if disabled
  if (!enabled) return null

  const [asteroids, setAsteroids] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    rotation: number;
    rotationSpeed: number;
    color: string;
    opacity: number;
  }>>([])

  const [fallingStars, setFallingStars] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    speed: number;
    angle: number;
    color: string;
    opacity: number;
    trail: Array<{ x: number; y: number; opacity: number }>;
  }>>([])

  const [stars, setStars] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    twinkle: number;
    color: string;
  }>>([])

  const [planets, setPlanets] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    rotation: number;
    rotationSpeed: number;
    color: string;
    rings: boolean;
    moons: Array<{ x: number; y: number; size: number; color: string }>;
  }>>([])

  const [satellites, setSatellites] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    rotation: number;
    rotationSpeed: number;
    color: string;
    type: 'satellite' | 'space-station' | 'probe';
  }>>([])

  const [nebulas, setNebulas] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    opacity: number;
    pulse: number;
  }>>([])

  const [astronauts, setAstronauts] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    rotation: number;
    color: string;
    type: 'astronaut' | 'cosmonaut';
    jetpack: boolean;
  }>>([])

  const [rockets, setRockets] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    rotation: number;
    color: string;
    type: 'rocket' | 'shuttle' | 'capsule';
    trail: Array<{ x: number; y: number; opacity: number }>;
  }>>([])

  useEffect(() => {
    if (!enabled) {
      // Clear existing objects when animations are disabled
      setAsteroids([])
      setFallingStars([])
      setStars([])
      setPlanets([])
      setSatellites([])
      setNebulas([])
      setAstronauts([])
      setRockets([])
      return
    }

    // Generate initial asteroids
    const generateAsteroids = () => {
      const colors = [
        '#10b981', // emerald
        '#3b82f6', // blue
        '#8b5cf6', // violet
        '#f59e0b', // amber
        '#ef4444', // red
        '#06b6d4', // cyan
        '#84cc16', // lime
        '#f97316', // orange
        '#ec4899', // pink
        '#6366f1', // indigo
      ]

      const newAsteroids = []
      
      for (let i = 0; i < asteroidCount; i++) {
        // Use grid-based distribution for better spread
        const gridSize = 5
        const gridX = i % gridSize
        const gridY = Math.floor(i / gridSize)
        const cellWidth = window.innerWidth / gridSize
        const cellHeight = window.innerHeight / gridSize
        
        newAsteroids.push({
          id: i,
          x: gridX * cellWidth + Math.random() * cellWidth * 0.8 + cellWidth * 0.1,
          y: gridY * cellHeight + Math.random() * cellHeight * 0.8 + cellHeight * 0.1,
          size: Math.random() * 4 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.6 + 0.2,
        })
      }
      setAsteroids(newAsteroids)
    }

    // Generate background stars
    const generateStars = () => {
      const starColors = [
        '#ffffff', '#f0f0f0', '#e0e0e0', '#d0d0d0', '#c0c0c0',
        '#ffeb3b', '#4caf50', '#2196f3', '#9c27b0', '#ff9800',
        '#e91e63', '#00bcd4', '#8bc34a', '#ff5722', '#3f51b5'
      ]
      const newStars = []
      for (let i = 0; i < starCount; i++) { // Mobile optimized count
        newStars.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 0.5, // Increased size range
          twinkle: Math.random() * 100,
          color: starColors[Math.floor(Math.random() * starColors.length)],
        })
      }
      setStars(newStars)
    }

    // Generate falling stars
    const generateFallingStar = () => {
      const colors = [
        '#ff6b6b', // red
        '#4ecdc4', // turquoise
        '#45b7d1', // blue
        '#96ceb4', // green
        '#feca57', // yellow
        '#ff9ff3', // pink
        '#54a0ff', // blue
        '#5f27cd', // purple
        '#00d2d3', // cyan
        '#ff9f43', // orange
        '#10b981', // emerald
        '#3b82f6', // blue
        '#8b5cf6', // violet
        '#ef4444', // red
        '#06b6d4', // cyan
        '#84cc16', // lime
        '#f97316', // orange
        '#ec4899', // pink
        '#6366f1', // indigo
        '#ffffff', // white
        '#fbbf24', // amber
        '#34d399', // emerald
        '#60a5fa', // blue
        '#a78bfa', // violet
        '#f87171', // red
        '#22d3ee', // cyan
        '#4ade80', // green
        '#fb923c', // orange
        '#f472b6', // pink
        '#818cf8', // indigo
      ]

      const angle = Math.random() * 60 + 15 // 15-75 degrees
      const speed = Math.random() * 3 + 2
      const size = Math.random() * 4 + 2

      const newStar = {
        id: Date.now() + Math.random(),
        x: Math.random() * window.innerWidth,
        y: -50,
        size,
        speed,
        angle: (angle * Math.PI) / 180,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 1,
        trail: [],
      }

      setFallingStars(prev => [...prev, newStar])
    }

    // Generate planets
    const generatePlanets = () => {
      const planetColors = [
        '#ff6b6b', // Mars-like red
        '#4ecdc4', // Neptune-like blue
        '#45b7d1', // Earth-like blue
        '#96ceb4', // Venus-like green
        '#feca57', // Jupiter-like yellow
        '#ff9ff3', // Pink gas giant
        '#54a0ff', // Uranus-like blue
        '#5f27cd', // Purple planet
        '#00d2d3', // Cyan planet
        '#ff9f43', // Orange planet
      ]

      const newPlanets = []
      
      for (let i = 0; i < planetCount; i++) {
        const hasRings = Math.random() > 0.7
        const moonCount = Math.floor(Math.random() * 3)
        const moons = []
        
        for (let j = 0; j < moonCount; j++) {
          moons.push({
            x: (Math.random() - 0.5) * 60,
            y: (Math.random() - 0.5) * 60,
            size: Math.random() * 3 + 1,
            color: ['#ffffff', '#f0f0f0', '#e0e0e0'][Math.floor(Math.random() * 3)],
          })
        }

        // Use grid-based distribution for better spread
        const gridSize = 4
        const gridX = i % gridSize
        const gridY = Math.floor(i / gridSize)
        const cellWidth = window.innerWidth / gridSize
        const cellHeight = window.innerHeight / gridSize
        
        newPlanets.push({
          id: i,
          x: gridX * cellWidth + Math.random() * cellWidth * 0.8 + cellWidth * 0.1,
          y: gridY * cellHeight + Math.random() * cellHeight * 0.8 + cellHeight * 0.1,
          size: Math.random() * 40 + 20,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 0.5,
          color: planetColors[Math.floor(Math.random() * planetColors.length)],
          rings: hasRings,
          moons,
        })
      }
      setPlanets(newPlanets)
    }

    // Generate satellites and space objects
    const generateSatellites = () => {
      const satelliteColors = [
        '#ffffff', // white
        '#f0f0f0', // light gray
        '#e0e0e0', // gray
        '#d0d0d0', // dark gray
        '#c0c0c0', // silver
      ]

      const types = ['satellite', 'space-station', 'probe']
      const newSatellites = []
      
      for (let i = 0; i < satelliteCount; i++) {
        // Use grid-based distribution for better spread
        const gridSize = 4
        const gridX = i % gridSize
        const gridY = Math.floor(i / gridSize)
        const cellWidth = window.innerWidth / gridSize
        const cellHeight = window.innerHeight / gridSize
        
        newSatellites.push({
          id: i,
          x: gridX * cellWidth + Math.random() * cellWidth * 0.8 + cellWidth * 0.1,
          y: gridY * cellHeight + Math.random() * cellHeight * 0.8 + cellHeight * 0.1,
          size: Math.random() * 8 + 4,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 1,
          color: satelliteColors[Math.floor(Math.random() * satelliteColors.length)],
          type: types[Math.floor(Math.random() * types.length)] as 'satellite' | 'space-station' | 'probe',
        })
      }
      setSatellites(newSatellites)
    }

    // Generate nebulas
    const generateNebulas = () => {
      const nebulaColors = [
        'rgba(255, 107, 107, 0.1)', // red nebula
        'rgba(78, 205, 196, 0.1)', // turquoise nebula
        'rgba(69, 183, 209, 0.1)', // blue nebula
        'rgba(150, 206, 180, 0.1)', // green nebula
        'rgba(254, 202, 87, 0.1)', // yellow nebula
        'rgba(255, 159, 243, 0.1)', // pink nebula
        'rgba(84, 160, 255, 0.1)', // blue nebula
        'rgba(95, 39, 205, 0.1)', // purple nebula
      ]

      const newNebulas = []
      
      for (let i = 0; i < nebulaCount; i++) {
        // Use grid-based distribution for better spread
        const gridSize = 3
        const gridX = i % gridSize
        const gridY = Math.floor(i / gridSize)
        const cellWidth = window.innerWidth / gridSize
        const cellHeight = window.innerHeight / gridSize
        
        newNebulas.push({
          id: i,
          x: gridX * cellWidth + Math.random() * cellWidth * 0.8 + cellWidth * 0.1,
          y: gridY * cellHeight + Math.random() * cellHeight * 0.8 + cellHeight * 0.1,
          size: Math.random() * 200 + 100,
          color: nebulaColors[Math.floor(Math.random() * nebulaColors.length)],
          opacity: Math.random() * 0.3 + 0.1,
          pulse: Math.random() * 100,
        })
      }
      setNebulas(newNebulas)
    }

    // Generate astronauts
    const generateAstronauts = () => {
      const astronautColors = [
        '#ffffff', // white suit
        '#f0f0f0', // light gray suit
        '#e0e0e0', // gray suit
        '#d0d0d0', // dark gray suit
      ]

      const types = ['astronaut', 'cosmonaut']
      const newAstronauts = []
      
      for (let i = 0; i < astronautCount; i++) {
        // Use grid-based distribution for better spread
        const gridSize = 3
        const gridX = i % gridSize
        const gridY = Math.floor(i / gridSize)
        const cellWidth = window.innerWidth / gridSize
        const cellHeight = window.innerHeight / gridSize
        
        newAstronauts.push({
          id: i,
          x: gridX * cellWidth + Math.random() * cellWidth * 0.8 + cellWidth * 0.1,
          y: gridY * cellHeight + Math.random() * cellHeight * 0.8 + cellHeight * 0.1,
          size: Math.random() * 20 + 15, // Increased size for better visibility
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: (Math.random() - 0.5) * 0.4,
          rotation: Math.random() * 360,
          color: astronautColors[Math.floor(Math.random() * astronautColors.length)],
          type: types[Math.floor(Math.random() * types.length)] as 'astronaut' | 'cosmonaut',
          jetpack: Math.random() > 0.5,
        })
      }
      setAstronauts(newAstronauts)
    }

    // Generate rockets
    const generateRockets = () => {
      const rocketColors = [
        '#ff6b6b', // red rocket
        '#4ecdc4', // turquoise rocket
        '#45b7d1', // blue rocket
        '#96ceb4', // green rocket
        '#feca57', // yellow rocket
        '#ff9ff3', // pink rocket
        '#54a0ff', // blue rocket
        '#ffffff', // white rocket
      ]

      const types = ['rocket', 'shuttle', 'capsule']
      const newRockets = []
      
      for (let i = 0; i < rocketCount; i++) {
        // Use grid-based distribution for better spread
        const gridSize = 4
        const gridX = i % gridSize
        const gridY = Math.floor(i / gridSize)
        const cellWidth = window.innerWidth / gridSize
        const cellHeight = window.innerHeight / gridSize
        
        newRockets.push({
          id: i,
          x: gridX * cellWidth + Math.random() * cellWidth * 0.8 + cellWidth * 0.1,
          y: gridY * cellHeight + Math.random() * cellHeight * 0.8 + cellHeight * 0.1,
          size: Math.random() * 20 + 15,
          speedX: (Math.random() - 0.5) * 0.6,
          speedY: (Math.random() - 0.5) * 0.6,
          rotation: Math.random() * 360,
          color: rocketColors[Math.floor(Math.random() * rocketColors.length)],
          type: types[Math.floor(Math.random() * types.length)] as 'rocket' | 'shuttle' | 'capsule',
          trail: [],
        })
      }
      setRockets(newRockets)
    }

    // Performance optimization for mobile devices
    // Significantly reduce object count for better performance
    const asteroidCount = isMobile ? 10 : 18 // Reduced from 15:25
    const starCount = isMobile ? 50 : 120 // Reduced from 100:200
    const planetCount = isMobile ? 4 : 6 // Reduced from 6:8
    const satelliteCount = isMobile ? 5 : 8 // Reduced from 8:12
    const nebulaCount = isMobile ? 3 : 4 // Reduced from 4:6
    const astronautCount = isMobile ? 3 : 4 // Reduced from 4:6
    const rocketCount = isMobile ? 4 : 6 // Reduced from 6:8

    generateAsteroids()
    generateStars()
    generatePlanets()
    generateSatellites()
    generateNebulas()
    generateAstronauts()
    generateRockets()

    // Generate falling stars periodically (mobile optimized)
    const fallingStarInterval = setInterval(generateFallingStar, isMobile ? 2000 : 1000) // Slower on mobile

    // Reduce animation complexity for better performance
    const animationInterval = isMobile ? 150 : 75 // Slower updates for better performance
    const maxFallingStars = isMobile ? 3 : 10 // Fewer falling stars on mobile
    const maxTrailPoints = isMobile ? 4 : 8 // Shorter trails on mobile

    // Animation loop
    const animate = () => {
      // Animate asteroids
      setAsteroids(prevAsteroids =>
        prevAsteroids.map(asteroid => {
          let newX = asteroid.x + asteroid.speedX
          let newY = asteroid.y + asteroid.speedY
          let newRotation = asteroid.rotation + asteroid.rotationSpeed

          // Wrap around screen edges
          if (newX < -50) newX = window.innerWidth + 50
          if (newX > window.innerWidth + 50) newX = -50
          if (newY < -50) newY = window.innerHeight + 50
          if (newY > window.innerHeight + 50) newY = -50

          return {
            ...asteroid,
            x: newX,
            y: newY,
            rotation: newRotation,
          }
        })
      )

      // Animate falling stars with mobile optimization
      setFallingStars(prevStars => {
        return prevStars
          .map(star => {
            const newX = star.x + Math.cos(star.angle) * star.speed
            const newY = star.y + Math.sin(star.angle) * star.speed

            // Add trail point with mobile optimization
            const newTrail = [
              { x: star.x, y: star.y, opacity: 0.8 },
              ...star.trail.slice(0, maxTrailPoints), // Reduced trail points on mobile
            ]

            return {
              ...star,
              x: newX,
              y: newY,
              trail: newTrail,
              opacity: star.opacity > 0.1 ? star.opacity - 0.01 : 0,
            }
          })
          .filter(star => star.y < window.innerHeight + 100 && star.opacity > 0)
          .slice(0, maxFallingStars) // Limit falling stars on mobile
      })

      // Animate background stars twinkling (reduced frequency on mobile)
      if (!isMobile || Math.random() > 0.5) { // Only update every other frame on mobile
        setStars(prevStars =>
          prevStars.map(star => ({
            ...star,
            twinkle: (star.twinkle + 1) % 100,
          }))
        )
      }

      // Animate planets (reduced frequency on mobile)
      if (!isMobile || Math.random() > 0.7) { // Only update 30% of frames on mobile
        setPlanets(prevPlanets =>
          prevPlanets.map(planet => ({
            ...planet,
            rotation: (planet.rotation + planet.rotationSpeed) % 360,
          }))
        )
      }

      // Animate satellites
      setSatellites(prevSatellites =>
        prevSatellites.map(satellite => {
          let newX = satellite.x + satellite.speedX
          let newY = satellite.y + satellite.speedY

          // Wrap around screen edges
          if (newX < -50) newX = window.innerWidth + 50
          if (newX > window.innerWidth + 50) newX = -50
          if (newY < -50) newY = window.innerHeight + 50
          if (newY > window.innerHeight + 50) newY = -50

          return {
            ...satellite,
            x: newX,
            y: newY,
            rotation: (satellite.rotation + satellite.rotationSpeed) % 360,
          }
        })
      )

      // Animate nebulas (reduced frequency on mobile)
      if (!isMobile || Math.random() > 0.8) { // Only update 20% of frames on mobile
        setNebulas(prevNebulas =>
          prevNebulas.map(nebula => ({
            ...nebula,
            pulse: (nebula.pulse + 1) % 100,
          }))
        )
      }

      // Animate astronauts
      setAstronauts(prevAstronauts =>
        prevAstronauts.map(astronaut => {
          let newX = astronaut.x + astronaut.speedX
          let newY = astronaut.y + astronaut.speedY

          // Wrap around screen edges
          if (newX < -50) newX = window.innerWidth + 50
          if (newX > window.innerWidth + 50) newX = -50
          if (newY < -50) newY = window.innerHeight + 50
          if (newY > window.innerHeight + 50) newY = -50

          return {
            ...astronaut,
            x: newX,
            y: newY,
            rotation: (astronaut.rotation + 0.5) % 360,
          }
        })
      )

      // Animate rockets with mobile optimization
      setRockets(prevRockets =>
        prevRockets.map(rocket => {
          let newX = rocket.x + rocket.speedX
          let newY = rocket.y + rocket.speedY

          // Add trail point with mobile optimization
          const newTrail = [
            { x: rocket.x, y: rocket.y, opacity: 0.8 },
            ...rocket.trail.slice(0, maxTrailPoints), // Reduced trail points on mobile
          ]

          // Wrap around screen edges
          if (newX < -100) newX = window.innerWidth + 100
          if (newX > window.innerWidth + 100) newX = -100
          if (newY < -100) newY = window.innerHeight + 100
          if (newY > window.innerHeight + 100) newY = -100

          return {
            ...rocket,
            x: newX,
            y: newY,
            trail: newTrail,
            rotation: (rocket.rotation + 1) % 360,
          }
        })
      )
    }

    const intervalId = setInterval(animate, animationInterval)

    // Handle window resize
    const handleResize = () => {
      generateAsteroids()
      generateStars()
      generatePlanets()
      generateSatellites()
      generateNebulas()
      generateAstronauts()
      generateRockets()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearInterval(intervalId)
      clearInterval(fallingStarInterval)
      window.removeEventListener('resize', handleResize)
    }
  }, [enabled])

  if (!enabled) {
    return null
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Nebulas - Background atmospheric effect */}
      {nebulas.map(nebula => (
        <div
          key={nebula.id}
          className="absolute animate-nebula-pulse"
          style={{
            left: nebula.x - nebula.size / 2,
            top: nebula.y - nebula.size / 2,
            width: nebula.size,
            height: nebula.size,
            background: `radial-gradient(circle, ${nebula.color} 0%, transparent 70%)`,
            borderRadius: '50%',
            opacity: nebula.opacity + 0.1 * Math.sin((nebula.pulse / 100) * Math.PI * 2),
            filter: 'blur(20px)',
          }}
        />
      ))}

      {/* Background stars */}
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute"
          style={{
            left: star.x,
            top: star.y,
            width: star.size,
            height: star.size,
            backgroundColor: star.color,
            borderRadius: '50%',
            opacity: 0.3 + 0.7 * Math.sin((star.twinkle / 100) * Math.PI * 2),
            boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
          }}
        />
      ))}

      {/* Planets */}
      {planets.map(planet => (
        <div key={planet.id} className="absolute">
          {/* Planet rings (if applicable) */}
          {planet.rings && (
            <div
              className="absolute animate-planet-rotate"
              style={{
                left: planet.x - planet.size * 0.8,
                top: planet.y - planet.size * 0.8,
                width: planet.size * 1.6,
                height: planet.size * 1.6,
                border: `2px solid rgba(255, 255, 255, 0.3)`,
                borderRadius: '50%',
                transform: `rotate(${planet.rotation}deg)`,
              }}
            />
          )}
          
          {/* Planet */}
          <div
            className="absolute animate-planet-rotate"
            style={{
              left: planet.x - planet.size / 2,
              top: planet.y - planet.size / 2,
              width: planet.size,
              height: planet.size,
              backgroundColor: planet.color,
              borderRadius: '50%',
              transform: `rotate(${planet.rotation}deg)`,
              boxShadow: `0 0 ${planet.size * 0.5}px ${planet.color}`,
              filter: 'blur(1px)',
            }}
          />

          {/* Planet moons */}
          {planet.moons.map((moon, moonIndex) => (
            <div
              key={moonIndex}
              className="absolute"
              style={{
                left: planet.x + moon.x - moon.size / 2,
                top: planet.y + moon.y - moon.size / 2,
                width: moon.size,
                height: moon.size,
                backgroundColor: moon.color,
                borderRadius: '50%',
                boxShadow: `0 0 ${moon.size * 2}px ${moon.color}`,
              }}
            />
          ))}
        </div>
      ))}

      {/* Satellites and Space Objects */}
      {satellites.map(satellite => (
        <div
          key={satellite.id}
          className="absolute animate-satellite-rotate"
          style={{
            left: satellite.x - satellite.size / 2,
            top: satellite.y - satellite.size / 2,
            width: satellite.size,
            height: satellite.size,
            backgroundColor: satellite.color,
            borderRadius: satellite.type === 'space-station' ? '4px' : '50%',
            transform: `rotate(${satellite.rotation}deg)`,
            boxShadow: `0 0 ${satellite.size * 2}px ${satellite.color}`,
            filter: 'blur(0.5px)',
          }}
        />
      ))}

      {/* Rockets with trails */}
      {rockets.map(rocket => (
        <div key={rocket.id}>
          {/* Rocket trail */}
          {rocket.trail.map((trailPoint, index) => (
            <div
              key={`rocket-trail-${rocket.id}-${index}`}
              className="absolute"
              style={{
                left: trailPoint.x - rocket.size * 0.3,
                top: trailPoint.y - rocket.size * 0.3,
                width: rocket.size * 0.6 * (1 - index * 0.08),
                height: rocket.size * 0.6 * (1 - index * 0.08),
                backgroundColor: rocket.color,
                borderRadius: rocket.type === 'shuttle' ? '4px' : '50%',
                opacity: trailPoint.opacity * (1 - index * 0.08),
                boxShadow: `0 0 ${rocket.size * 2}px ${rocket.color}`,
                filter: 'blur(2px)',
              }}
            />
          ))}
          {/* Main rocket */}
          <div
            className="absolute animate-rocket-move"
            style={{
              left: rocket.x - rocket.size / 2,
              top: rocket.y - rocket.size / 2,
              width: rocket.size,
              height: rocket.size,
              backgroundColor: rocket.color,
              borderRadius: rocket.type === 'shuttle' ? '4px' : rocket.type === 'capsule' ? '50%' : '2px',
              transform: `rotate(${rocket.rotation}deg)`,
              boxShadow: `0 0 ${rocket.size * 3}px ${rocket.color}`,
              filter: 'blur(0.5px)',
            }}
          />
        </div>
      ))}

      {/* Astronauts */}
      {astronauts.map(astronaut => (
        <div key={astronaut.id} className="absolute">
          {/* Jetpack flame (if applicable) */}
          {astronaut.jetpack && (
            <div
              className="absolute animate-jetpack-flame"
              style={{
                left: astronaut.x - astronaut.size * 0.3,
                top: astronaut.y + astronaut.size * 0.4,
                width: astronaut.size * 0.6,
                height: astronaut.size * 0.4,
                background: `linear-gradient(to bottom, #ff6b6b, #ff9f43, transparent)`,
                borderRadius: '50%',
                opacity: 0.8,
                filter: 'blur(1px)',
              }}
            />
          )}
          
          {/* Astronaut body */}
          <div
            className="absolute animate-astronaut-float"
            style={{
              left: astronaut.x - astronaut.size / 2,
              top: astronaut.y - astronaut.size / 2,
              width: astronaut.size,
              height: astronaut.size,
              backgroundColor: astronaut.color,
              borderRadius: '50%',
              transform: `rotate(${astronaut.rotation}deg)`,
              boxShadow: `0 0 ${astronaut.size * 3}px ${astronaut.color}, 0 0 ${astronaut.size * 6}px rgba(255, 255, 255, 0.3)`,
              filter: 'blur(0.5px)',
              border: `2px solid rgba(255, 255, 255, 0.5)`,
            }}
          />
          
          {/* Astronaut helmet */}
          <div
            className="absolute"
            style={{
              left: astronaut.x - astronaut.size * 0.3,
              top: astronaut.y - astronaut.size * 0.4,
              width: astronaut.size * 0.6,
              height: astronaut.size * 0.6,
              backgroundColor: astronaut.color,
              borderRadius: '50%',
              border: `3px solid rgba(255, 255, 255, 0.6)`,
              boxShadow: `0 0 ${astronaut.size * 2}px ${astronaut.color}, inset 0 0 10px rgba(255, 255, 255, 0.2)`,
            }}
          />
          
          {/* Astronaut visor */}
          <div
            className="absolute"
            style={{
              left: astronaut.x - astronaut.size * 0.2,
              top: astronaut.y - astronaut.size * 0.3,
              width: astronaut.size * 0.4,
              height: astronaut.size * 0.4,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '50%',
              border: `1px solid rgba(255, 255, 255, 0.4)`,
            }}
          />
        </div>
      ))}

      {/* Falling stars with trails */}
      {fallingStars.map(star => (
        <div key={star.id}>
          {/* Star trail */}
          {star.trail.map((trailPoint, index) => (
            <div
              key={`trail-${star.id}-${index}`}
              className="absolute"
              style={{
                left: trailPoint.x,
                top: trailPoint.y,
                width: star.size * (1 - index * 0.1),
                height: star.size * (1 - index * 0.1),
                backgroundColor: star.color,
                borderRadius: '50%',
                opacity: trailPoint.opacity * (1 - index * 0.1) * star.opacity,
                boxShadow: `0 0 ${star.size * 3}px ${star.color}`,
                filter: 'blur(1px)',
              }}
            />
          ))}
          {/* Main falling star */}
          <div
            className="absolute animate-falling-star"
            style={{
              left: star.x,
              top: star.y,
              width: star.size,
              height: star.size,
              backgroundColor: star.color,
              borderRadius: '50%',
              opacity: star.opacity,
              boxShadow: `0 0 ${star.size * 4}px ${star.color}`,
              filter: 'blur(0.5px)',
            }}
          />
        </div>
      ))}

      {/* Asteroids */}
      {asteroids.map(asteroid => (
        <div
          key={asteroid.id}
          className="absolute animate-asteroid-float animate-asteroid-glow"
          style={{
            left: asteroid.x,
            top: asteroid.y,
            width: asteroid.size,
            height: asteroid.size,
            backgroundColor: asteroid.color,
            borderRadius: '50%',
            opacity: asteroid.opacity,
            transform: `rotate(${asteroid.rotation}deg)`,
            boxShadow: `0 0 ${asteroid.size * 2}px ${asteroid.color}`,
            filter: 'blur(0.5px)',
            animationDelay: `${asteroid.id * 0.2}s`,
          }}
        />
      ))}
      
      {/* Additional floating particles for depth */}
      {asteroids.slice(0, 10).map(asteroid => (
        <div
          key={`particle-${asteroid.id}`}
          className="absolute animate-asteroid-trail"
          style={{
            left: asteroid.x + Math.sin(asteroid.rotation * Math.PI / 180) * 20,
            top: asteroid.y + Math.cos(asteroid.rotation * Math.PI / 180) * 20,
            width: asteroid.size * 0.3,
            height: asteroid.size * 0.3,
            backgroundColor: asteroid.color,
            borderRadius: '50%',
            opacity: asteroid.opacity * 0.5,
            filter: 'blur(1px)',
            animationDelay: `${asteroid.id * 0.3}s`,
          }}
        />
      ))}
    </div>
  )
})

SpaceEnvironment.displayName = 'SpaceEnvironment'

const MatrixRain = React.memo(() => {
  const [rainDrops, setRainDrops] = useState<Array<{
    left: string;
    animationDelay: string;
    animationDuration: string;
    character: string;
  }>>([])

  useEffect(() => {
    // Generate rain drops only on client side to avoid hydration mismatch
    const newRainDrops = [...Array(50)].map(() => ({
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${3 + Math.random() * 2}s`,
      character: Math.random() > 0.5 ? "1" : "0",
    }))
    setRainDrops(newRainDrops)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      {rainDrops.map((drop, i) => (
        <div
          key={i}
          className="absolute text-accent font-mono text-sm animate-matrix-rain"
          style={{
            left: drop.left,
            animationDelay: drop.animationDelay,
            animationDuration: drop.animationDuration,
          }}
        >
          {drop.character}
        </div>
      ))}
    </div>
  )
})

MatrixRain.displayName = 'MatrixRain'

const TypingEffect = React.memo(({ text, className = "" }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text])

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  )
})

TypingEffect.displayName = 'TypingEffect'

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [enableAnimations, setEnableAnimations] = useState(true)

  useEffect(() => {
    setMounted(true)
    
    // Initialize EmailJS (commented out for testing)
    // emailjs.init('YOUR_PUBLIC_KEY') // Replace with your EmailJS public key
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const connection = (navigator as any)?.connection
    const deviceMemory = (navigator as any)?.deviceMemory

    const shouldDisable =
      prefersReducedMotion.matches ||
      (connection && (connection.saveData || ["slow-2g", "2g", "3g"].includes(connection.effectiveType))) ||
      (typeof deviceMemory === "number" && deviceMemory < 4)

    if (shouldDisable) {
      setEnableAnimations(false)
    }

    const handleChange = () => {
      setEnableAnimations(!prefersReducedMotion.matches)
    }

    prefersReducedMotion.addEventListener?.("change", handleChange)

    return () => {
      prefersReducedMotion.removeEventListener?.("change", handleChange)
    }
  }, [])

  // Throttle function for performance
  const throttle = useCallback((func: Function, limit: number) => {
    let inThrottle: boolean
    return function(this: any, ...args: any[]) {
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
      }
    }
  }, [])

  useEffect(() => {
    setIsVisible(true)

    const handleScroll = throttle(() => {
      const sections = [
        "hero",
        "about",
        "skills",
        "education",
        "experience",
        "projects",
        "resume",
        "achievements",
        "activities",
        "contact",
      ]
      
      const scrollPosition = window.scrollY
      const offset = 150

      let currentSection = "hero"
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          const sectionTop = offsetTop - offset
          const sectionBottom = offsetTop + offsetHeight - offset
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = section
            break
          }
        }
      }
      
      setActiveSection(currentSection)
    }, 100) // Throttle to 100ms

    const handleMouseMove = throttle((e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }, 16) // Throttle to ~60fps

    window.addEventListener("scroll", handleScroll as any)
    window.addEventListener("mousemove", handleMouseMove as any)
    handleScroll() // Initial call
    
    return () => {
      window.removeEventListener("scroll", handleScroll as any)
      window.removeEventListener("mousemove", handleMouseMove as any)
    }
  }, [throttle])

  const toggleTheme = () => {
    if (theme === "light") setTheme("dark")
    else if (theme === "dark") setTheme("system")
    else setTheme("light")
  }

  const getThemeIcon = () => {
    if (!mounted) return <Monitor className="w-5 h-5" />
    if (theme === "light") return <Sun className="w-5 h-5" />
    if (theme === "dark") return <Moon className="w-5 h-5" />
    return <Monitor className="w-5 h-5" />
  }

  const skills = useMemo(() => [
    { name: "Python", level: 95, icon: Code, category: "Programming" },
    { name: "SQL", level: 90, icon: Database, category: "Database" },
    { name: "NoSQL", level: 85, icon: Database, category: "Database" },
    { name: "MongoDB", level: 83, icon: Database, category: "Database" },
    { name: "MySQL", level: 88, icon: Database, category: "Database" },
    { name: "MS Office 365", level: 92, icon: FileText, category: "Productivity" },
    { name: "Data Science", level: 90, icon: TrendingUp, category: "Analytics" },
    { name: "Machine Learning", level: 85, icon: Brain, category: "ML" },
    { name: "Data Visualization", level: 88, icon: BarChart3, category: "Visualization" },
    { name: "Statistical Analysis", level: 87, icon: TrendingUp, category: "Statistics" },
  ], [])

  const education = [
    {
      degree: "Bachelor of Engineering (B.E.) in Computer Science & Engineering",
      institution: "SVCE, Bengaluru",
      year: "2022-2026",
      description: "Currently pursuing with focus on programming, data structures, and software engineering",
    },
    {
      degree: "12th Grade (Intermediate)",
      institution: "Gyanada International Sr Sec School, Gopalganj, Bihar",
      year: "2020-2022",
      description: "Completed higher secondary education with science stream",
    },
    {
      degree: "10th Grade",
      institution: "DAV Public School, Thawe, Gopalganj, Bihar",
      year: "2020",
      description: "Completed secondary education with strong academic foundation",
    },
  ]

  const experience = [
    {
      title: "Data Visualization Associate Internship",
      company: "Excelerate - Remote",
      period: "04/2025 - 05/2025",
      description: "Worked on comprehensive data visualization projects focusing on business intelligence and analytics",
      achievements: [
        "Developed comprehensive dashboards for tracking key performance indicators and trends",
        "Conducted in-depth data analysis for forecasting market shifts and identifying opportunities",
        "Optimized supply chain operations with regression and clustering techniques",
        "Enhanced data-driven decision-making processes",
      ],
      link: "https://drive.google.com/file/d/1v4PqjYHbEn6JpCz3sYEbUy8jiMhZJH07/view?usp=sharing",
    },
    {
      title: "Event Coordinator - Foosball Event",
      company: "KalaVaibhava 2024, SVCE Bangalore",
      period: "11/2024",
      description: "Led event coordination for college cultural festival foosball tournament",
      achievements: [
        "Led planning, marketing, and budget management for campus sporting event",
        "Coordinated event logistics, promotions, and refereeing",
        "Oversaw refereeing and participant engagement to enhance event quality",
      ],
    },
  ]

  const certifications = [
    {
      name: "Second 2nd Prize in Python Workshop",
      issuer: "SVCE Bangalore",
      year: "2024",
      icon: Award,
      link: "https://drive.google.com/file/d/1fR9p65pczxQFEKqgeevuS1R8qsEdnAQ9/view?usp=sharing",
    },
    {
    name: "3rd Prize in Debugging Session",
      issuer: "SVCE Bangalore",
      year: "2024",
      icon: Award,
      link: "https://drive.google.com/file/d/1ltCoN1L1kPPJiMLJPa8-FKXn7TzmQzoe/view?usp=sharing",
    },
    {
      name: "Participated in CyberQuest Hackathon at DSATM",
      issuer: "DSATM",
      year: "2024",
      icon: Award,
      link: "https://drive.google.com/file/d/1QrYqkHC3WmwPges--nzxI3w8t9RvRfwW/view?usp=sharing",
    },
  ]

  const activities = [
    {
      title: "Sports Activities - Cricket and Kabaddi",
      organization: "SVCE Bangalore",
      period: "2022-Present",
      description: "Engaged in sports: Cricket and Kabaddi tournaments and college sports events",
    },
    {
      title: "Volunteered with NSS in cleanliness drives supporting Swachh Bharat",
      organization: "NSS (National Service Scheme)",
      period: "2023-2024",
      description: "Assisted in peer teaching and learning programs for school students",
    },
    {
      title: "Participated in organic farming initiatives promoting sustainability",
      organization: "NSS (National Service Scheme)",
      period: "2023-2024",
      description: "Participated in sustainable agriculture initiatives and organic farming awareness programs",
    },
  ]

  const projects = [
    {
      title: "Sales Prediction and Market Basket Analysis for Retail Chains",
      description: "Built machine learning models to predict seasonal sales and identify cross-selling opportunities at product level",
      tech: ["Python", "Machine Learning", "Data Analysis", "Retail Analytics"],
      link: "#",
      image: "/sales-prediction-dashboard.png",
    },
    {
      title: "AI-Powered Demand Forecasting and Dynamic Pricing in E-Commerce",
      description: "Developed interactive forecasting models integrating pricing, demand, and inventory dynamics",
      tech: ["Python", "AI", "Forecasting", "E-Commerce"],
      link: "#",
      image: "/demand-forecasting-interface.png",
    },
    {
      title: "Sports Sponsorship and Market Analysis Using AI",
      description: "Created AI models analyzing social media sentiment and merchandise sales for sponsorship optimization",
      tech: ["Python", "AI", "Social Media Analytics", "Market Analysis"],
      link: "#",
      image: "/sports-analysis-dashboard.png",
    },
  ]

  const scrollToSection = useCallback((sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    setIsMobileMenuOpen(false)
  }, [])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Initialize EmailJS with your public key
      emailjs.init('bWD_MtP07mtTCW2RK')

      // Using EmailJS for client-side email sending
      const templateParams = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        from_name: formData.name,
        from_email: formData.email,
      }

      // Send email using EmailJS directly
      const result = await emailjs.send(
        'service_h4cdbjc',
        'template_sng6qol',
        templateParams,
        'bWD_MtP07mtTCW2RK'
      )

      if (result.status === 200) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 relative overflow-x-hidden">
      {/* Space Environment Background */}
      <SpaceEnvironment enabled={enableAnimations} />
      
      {/* Enhanced 3D Mouse Cursor */}
      <div
        className="fixed w-6 h-6 bg-accent/40 rounded-full pointer-events-none z-50 transition-all duration-200 ease-out backdrop-blur-sm"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${mousePosition.x > 0 ? 1 : 0}) rotate(${mousePosition.x * 0.1}deg)`,
          boxShadow: `0 0 20px rgba(16, 185, 129, 0.3)`,
        }}
      />
      <div
        className="fixed w-2 h-2 bg-accent rounded-full pointer-events-none z-50 transition-all duration-100 ease-out"
        style={{
          left: mousePosition.x - 4,
          top: mousePosition.y - 4,
          transform: `scale(${mousePosition.x > 0 ? 1 : 0})`,
        }}
      />

      <nav className="fixed top-0 w-full glass z-50 border-b border-border/50 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div 
              className="font-montserrat font-bold text-xl gradient-text animate-fade-in-up cursor-pointer hover:scale-110 transition-all duration-300 hover:rotate-1 transform-3d"
              onClick={() => scrollToSection("hero")}
              style={{
                textShadow: "0 0 20px rgba(16, 185, 129, 0.3)",
              }}
            >
              Saurabh Kumar Singh
            </div>
            <div className="hidden lg:flex space-x-6 items-center">
              {[
                "About",
                "Skills",
                "Education",
                "Experience",
                "Projects",
                "Resume",
                "Achievements",
                "Activities",
                "Contact",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-all duration-300 hover:text-accent hover:scale-110 hover:rotate-1 relative group transform-3d ${
                    activeSection === item.toLowerCase() ? "text-accent font-semibold" : "text-muted-foreground"
                  }`}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="ml-4 hover:bg-accent/10 transition-all duration-300 hover:rotate-180"
              >
                {getThemeIcon()}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEnableAnimations((prev) => !prev)}
                className="ml-2 px-3"
              >
                {enableAnimations ? "Disable Effects" : "Enable Effects"}
              </Button>
            </div>
            <div className="flex items-center lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="mr-2 hover:bg-accent/10 transition-all duration-300 hover:rotate-180"
              >
                {getThemeIcon()}
              </Button>
              <button
                className="p-2 text-muted-foreground hover:text-accent transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
          {isMobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-border/50 animate-fade-in-up glass">
              <div className="flex flex-col space-y-3">
                {[
                  "About",
                  "Skills",
                  "Education",
                  "Experience",
                  "Projects",
                  "Resume",
                  "Achievements",
                  "Activities",
                  "Contact",
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`text-left px-4 py-2 text-sm font-medium transition-colors hover:text-accent ${
                      activeSection === item.toLowerCase() ? "text-accent font-semibold" : "text-muted-foreground"
                    }`}
                  >
                    {item}
                  </button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEnableAnimations((prev) => !prev)
                    setIsMobileMenuOpen(false)
                  }}
                  className="mx-4 mt-2"
                >
                  {enableAnimations ? "Disable Effects" : "Enable Effects"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <Suspense fallback={null}>
          <Hero3DScene />
        </Suspense>
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/80 to-accent/10 dark:from-background/98 dark:via-background/90 dark:to-accent/15"></div>
        <FloatingParticles />
                  <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-20 h-20 bg-accent/10 rounded-full animate-float transform-3d rotate-y-12 hover-glow animate-pulse-3d"></div>
            <div
              className="absolute top-40 right-20 w-16 h-16 bg-accent/5 rounded-full animate-float-delayed transform-3d rotate-x-12 hover-glow animate-bounce-soft"
            ></div>
            <div
              className="absolute bottom-40 left-20 w-12 h-12 bg-accent/15 rounded-full animate-float-slow transform-3d hover-glow animate-rotate-3d"
            ></div>
            <div className="absolute top-60 left-1/4 w-8 h-8 bg-accent/20 rounded-full animate-float transform-3d hover-glow animate-shimmer"></div>
            <div className="absolute bottom-60 right-1/4 w-10 h-10 bg-accent/8 rounded-full animate-float-delayed transform-3d hover-glow animate-pulse-3d"></div>
          </div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="mb-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-accent/40 rounded-full blur-xl animate-pulse-glow group-hover:blur-2xl transition-all duration-500"></div>
                <img
                  src="/saurabh-profile.jpg"
                  alt="Saurabh Kumar Singh"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="relative w-48 h-48 rounded-full mx-auto mb-6 border-4 border-accent animate-pulse-glow shadow-2xl object-cover object-top transform-3d hover:rotate-y-12 transition-all duration-500 hover-lift hover:scale-110"
                  style={{ 
                    objectPosition: "50% 15%",
                    filter: "drop-shadow(0 0 20px rgba(16, 185, 129, 0.3))"
                  }}
                />
              </div>
            </div>
            <h1 className="font-montserrat font-black text-4xl sm:text-6xl lg:text-7xl gradient-text mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Saurabh Kumar Singh
            </h1>
            <div className="mb-8 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <p className="text-xl sm:text-2xl text-accent font-semibold mb-2">
                <TypingEffect text="Python Data Analyst" />
              </p>
              <p className="text-lg text-muted-foreground">Computer Science Engineering Student</p>
            </div>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
              A passionate Data Enthusiast with a solid foundation in programming, data analysis, and problem-solving. Proficient
              in Python, SQL, and data visualization tools, with hands-on experience in uncovering insights and supporting informed
              decision-making. Skilled in machine learning and statistical analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
              <MagneticButton
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold hover:shadow-lg hover:shadow-accent/25 transform-3d hover:scale-110 hover:rotate-1 transition-all duration-300"
                onClick={() => scrollToSection("projects")}
              >
                View My Work
              </MagneticButton>
              <MagneticButton
                variant="outline"
                size="lg"
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent hover:shadow-lg hover:shadow-accent/25 transform-3d hover:scale-110 hover:rotate-1 transition-all duration-300"
                onClick={() => scrollToSection("contact")}
              >
                Get In Touch
              </MagneticButton>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-accent rounded-full flex justify-center">
            <div className="w-1 h-3 bg-accent rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      <ScrollReveal>
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* 3D Background Elements for About Section */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-16 h-16 bg-accent/5 rounded-full animate-float transform-3d rotate-y-12 hover-glow animate-pulse-3d"></div>
            <div className="absolute top-32 right-16 w-12 h-12 bg-accent/8 rounded-full animate-float-delayed transform-3d rotate-x-12 hover-glow animate-bounce-soft"></div>
            <div className="absolute bottom-20 left-1/3 w-14 h-14 bg-accent/10 rounded-full animate-float-slow transform-3d hover-glow animate-rotate-3d"></div>
            <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-accent/15 rounded-full animate-float transform-3d hover-glow animate-shimmer"></div>
          </div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="book-container inline-block">
                <div className="book-cover px-8 py-4 animate-book-open">
                  <h2 className="font-montserrat font-bold text-3xl sm:text-4xl text-white mb-4">About Me</h2>
                  <div className="w-20 h-1 bg-white/80 mx-auto animate-gradient-shift"></div>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-in-left">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  A passionate Data Enthusiast with a strong foundation in programming, data analysis, and
                  problem-solving. Currently pursuing B.E. in Computer Science & Engineering at SVCE, Bengaluru, with
                  proven experience in data manipulation, automation, and AI development.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Skilled in leveraging Python, SQL, and visualization tools like Power BI to uncover insights and drive
                  informed decision-making. My approach combines technical proficiency with practical application,
                  demonstrated through various projects and hands-on experience in data analytics simulations.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                  <div>
                    <p>
                      <strong>Email:</strong> saurabhks102@gmail.com
                    </p>
                    <p>
                      <strong>Phone:</strong> 9380328640
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Location:</strong> Bengaluru
                    </p>
                    <p>
                      <strong>DOB:</strong> 10-02-2004
                    </p>
                  </div>
                </div>
                <div className="flex space-x-4 mt-8">
                  <MagneticButton
                    variant="outline"
                    size="icon"
                    className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
                    onClick={() => window.open("https://github.com/saurabh16-24", "_blank")}
                  >
                    <Github className="w-5 h-5" />
                  </MagneticButton>
                  <MagneticButton
                    variant="outline"
                    size="icon"
                    className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
                    onClick={() => window.open("https://linkedin.com/in/saurabh-singh", "_blank")}
                  >
                    <Linkedin className="w-5 h-5" />
                  </MagneticButton>
                  <MagneticButton
                    variant="outline"
                    size="icon"
                    className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
                    onClick={() => window.open("mailto:saurabhks102@gmail.com", "_blank")}
                  >
                    <Mail className="w-5 h-5" />
                  </MagneticButton>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: BarChart3, title: "Data Visualization", desc: "Creating compelling visual stories" },
                  { icon: Brain, title: "Machine Learning", desc: "Predictive modeling & algorithms" },
                  { icon: Database, title: "Data Engineering", desc: "ETL processes & data pipelines" },
                  { icon: TrendingUp, title: "Statistical Analysis", desc: "Advanced statistical methods" },
                ].map((service, index) => (
                  <ScrollReveal key={service.title} delay={index * 100}>
                    <div className="book-container">
                      <div className="book-page text-center p-6 hover:shadow-lg transition-all duration-300 hover:scale-110 group hover-lift transform-3d hover:rotate-y-6 animate-book-shadow">
                        <div className="relative">
                          <service.icon className="w-12 h-12 text-accent mx-auto mb-4 group-hover:animate-scale-pulse group-hover:animate-rotate-3d" />
                          <div className="absolute inset-0 bg-accent/10 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                        </div>
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-accent transition-colors duration-300">{service.title}</h3>
                        <p className="text-sm text-muted-foreground group-hover:text-accent/80 transition-colors duration-300">{service.desc}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 relative overflow-hidden">
          <Suspense fallback={null}>
            <Skills3DScene />
          </Suspense>
          {/* 3D Background Elements for Skills Section */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-16 left-1/4 w-20 h-20 bg-accent/8 rounded-full animate-float transform-3d rotate-y-12 hover-glow animate-pulse-3d"></div>
            <div className="absolute top-40 right-1/3 w-16 h-16 bg-accent/5 rounded-full animate-float-delayed transform-3d rotate-x-12 hover-glow animate-bounce-soft"></div>
            <div className="absolute bottom-32 left-1/2 w-12 h-12 bg-accent/12 rounded-full animate-float-slow transform-3d hover-glow animate-rotate-3d"></div>
            <div className="absolute top-2/3 right-1/5 w-10 h-10 bg-accent/15 rounded-full animate-float transform-3d hover-glow animate-shimmer"></div>
            <div className="absolute bottom-16 right-1/4 w-14 h-14 bg-accent/6 rounded-full animate-float-delayed transform-3d hover-glow animate-pulse-3d"></div>
          </div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="book-container inline-block">
                <div className="book-cover px-8 py-4 animate-book-open">
                  <h2 className="font-montserrat font-bold text-3xl sm:text-4xl text-white mb-4">Technical Skills</h2>
                  <div className="w-20 h-1 bg-white/80 mx-auto animate-gradient-shift"></div>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {skills.map((skill, index) => (
                <ScrollReveal key={skill.name} delay={index * 50}>
                  <div className="book-container">
                    <div className="book-page p-6 hover:shadow-lg transition-all duration-300 hover:scale-110 hover-glow transform-3d hover:rotate-y-3 animate-book-shadow group">
                      <div className="flex items-center mb-4">
                        <div className="relative">
                          <skill.icon className="w-8 h-8 text-accent mr-3 animate-scale-pulse group-hover:animate-rotate-3d" />
                          <div className="absolute inset-0 bg-accent/10 rounded-full blur-md group-hover:blur-lg transition-all duration-300"></div>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold text-lg group-hover:text-accent transition-colors duration-300">{skill.name}</h3>
                            <span className="text-sm text-muted-foreground group-hover:text-accent/80 transition-colors duration-300">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-2 group-hover:bg-accent/20 transition-colors duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* 3D Background Elements for Education Section */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-12 left-1/5 w-18 h-18 bg-accent/6 rounded-full animate-float transform-3d rotate-y-12 hover-glow animate-pulse-3d"></div>
            <div className="absolute top-36 right-1/6 w-14 h-14 bg-accent/9 rounded-full animate-float-delayed transform-3d rotate-x-12 hover-glow animate-bounce-soft"></div>
            <div className="absolute bottom-24 left-2/3 w-16 h-16 bg-accent/7 rounded-full animate-float-slow transform-3d hover-glow animate-rotate-3d"></div>
            <div className="absolute top-1/2 left-1/4 w-10 h-10 bg-accent/12 rounded-full animate-float transform-3d hover-glow animate-shimmer"></div>
          </div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="book-container inline-block">
                <div className="book-cover px-8 py-4 animate-book-open">
                  <h2 className="font-montserrat font-bold text-3xl sm:text-4xl text-white mb-4">Education</h2>
                  <div className="w-20 h-1 bg-white/80 mx-auto animate-gradient-shift"></div>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              {education.map((edu, index) => (
                <ScrollReveal key={edu.degree} delay={index * 200}>
                  <div className="book-container">
                    <div className="book-page p-6 hover:shadow-lg transition-all duration-300 hover:scale-110 hover-lift transform-3d hover:rotate-y-3 animate-book-shadow group">
                      <CardHeader>
                        <CardTitle className="text-xl">{edu.degree}</CardTitle>
                        <CardDescription className="text-base leading-relaxed">
                          <span className="font-semibold">{edu.institution}</span> - {edu.year}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-lg text-muted-foreground mb-4">{edu.description}</p>
                      </CardContent>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 relative overflow-hidden">
          {/* 3D Background Elements for Experience Section */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-1/3 w-16 h-16 bg-accent/8 rounded-full animate-float transform-3d rotate-y-12 hover-glow animate-pulse-3d"></div>
            <div className="absolute top-44 right-1/4 w-12 h-12 bg-accent/5 rounded-full animate-float-delayed transform-3d rotate-x-12 hover-glow animate-bounce-soft"></div>
            <div className="absolute bottom-28 left-1/4 w-14 h-14 bg-accent/10 rounded-full animate-float-slow transform-3d hover-glow animate-rotate-3d"></div>
            <div className="absolute top-2/3 right-1/3 w-8 h-8 bg-accent/15 rounded-full animate-float transform-3d hover-glow animate-shimmer"></div>
            <div className="absolute bottom-12 right-1/5 w-18 h-18 bg-accent/6 rounded-full animate-float-delayed transform-3d hover-glow animate-pulse-3d"></div>
          </div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="book-container inline-block">
                <div className="book-cover px-8 py-4 animate-book-open">
                  <h2 className="font-montserrat font-bold text-3xl sm:text-4xl text-white mb-4">Work Experience</h2>
                  <div className="w-20 h-1 bg-white/80 mx-auto animate-gradient-shift"></div>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              {experience.map((exp, index) => (
                <ScrollReveal key={exp.title} delay={index * 200}>
                  <div className="book-container">
                    <div className="book-page p-6 hover:shadow-lg transition-all duration-300 hover:scale-110 hover-lift transform-3d hover:rotate-y-3 animate-book-shadow group">
                      <CardHeader>
                        <CardTitle className="text-xl">{exp.title}</CardTitle>
                        <CardDescription className="text-base leading-relaxed">
                          <span className="font-semibold">{exp.company}</span> - {exp.period}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-lg text-muted-foreground mb-4">{exp.description}</p>
                        <ul className="list-disc list-inside text-lg text-muted-foreground mb-4">
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx}>{achievement}</li>
                          ))}
                        </ul>
                        {exp.link && (
                          <MagneticButton
                            variant="outline"
                            size="sm"
                            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
                            onClick={() => window.open(exp.link, "_blank")}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Certificate
                          </MagneticButton>
                        )}
                      </CardContent>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* 3D Background Elements for Projects Section */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-16 left-1/6 w-20 h-20 bg-accent/7 rounded-full animate-float transform-3d rotate-y-12 hover-glow animate-pulse-3d"></div>
            <div className="absolute top-48 right-1/5 w-14 h-14 bg-accent/9 rounded-full animate-float-delayed transform-3d rotate-x-12 hover-glow animate-bounce-soft"></div>
            <div className="absolute bottom-20 left-1/2 w-16 h-16 bg-accent/8 rounded-full animate-float-slow transform-3d hover-glow animate-rotate-3d"></div>
            <div className="absolute top-1/3 right-1/6 w-12 h-12 bg-accent/11 rounded-full animate-float transform-3d hover-glow animate-shimmer"></div>
            <div className="absolute bottom-8 right-1/3 w-10 h-10 bg-accent/6 rounded-full animate-float-delayed transform-3d hover-glow animate-pulse-3d"></div>
          </div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="book-container inline-block">
                <div className="book-cover px-8 py-4 animate-book-open">
                  <h2 className="font-montserrat font-bold text-3xl sm:text-4xl text-white mb-4">Featured Projects</h2>
                  <div className="w-20 h-1 bg-white/80 mx-auto animate-gradient-shift"></div>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <ScrollReveal key={project.title} delay={index * 100}>
                  <div className="book-container">
                    <div className="book-page overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-110 group hover-lift transform-3d hover:rotate-y-3 animate-book-shadow">
                      <div className="relative overflow-hidden">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <MagneticButton variant="secondary" size="sm">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Project
                          </MagneticButton>
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl">{project.title}</CardTitle>
                        <CardDescription className="text-base leading-relaxed">{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <Badge key={tech} variant="secondary" className="bg-accent/10 text-accent hover-glow">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="resume" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* 3D Background Elements for Resume Section */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-14 left-1/4 w-18 h-18 bg-accent/8 rounded-full animate-float transform-3d rotate-y-12 hover-glow animate-pulse-3d"></div>
            <div className="absolute top-52 right-1/4 w-12 h-12 bg-accent/6 rounded-full animate-float-delayed transform-3d rotate-x-12 hover-glow animate-bounce-soft"></div>
            <div className="absolute bottom-16 left-1/3 w-14 h-14 bg-accent/10 rounded-full animate-float-slow transform-3d hover-glow animate-rotate-3d"></div>
            <div className="absolute top-1/2 right-1/5 w-10 h-10 bg-accent/12 rounded-full animate-float transform-3d hover-glow animate-shimmer"></div>
          </div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="book-container inline-block">
                <div className="book-cover px-8 py-4 animate-book-open">
                  <h2 className="font-montserrat font-bold text-3xl sm:text-4xl text-white mb-4">Resume</h2>
                  <div className="w-20 h-1 bg-white/80 mx-auto animate-gradient-shift"></div>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-semibold text-xl mb-6">Professional Summary</h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  A passionate Data Enthusiast with a strong foundation in programming, data analysis, and
                  problem-solving. Proven experience in data manipulation, automation, and AI with hands-on projects and
                  practical applications.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-6">Download Resume</h3>
                <MagneticButton
                  variant="outline"
                  size="lg"
                  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent hover:shadow-lg hover:shadow-accent/25"
                  onClick={() => window.open("https://drive.google.com/file/d/1_CjuJfAa_RULMZTQuCgGSufeB7NDe2dj/view?usp=sharing", "_blank")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </MagneticButton>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="achievements" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* 3D Background Elements for Achievements Section */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-18 left-1/5 w-16 h-16 bg-accent/9 rounded-full animate-float transform-3d rotate-y-12 hover-glow animate-pulse-3d"></div>
            <div className="absolute top-56 right-1/6 w-14 h-14 bg-accent/7 rounded-full animate-float-delayed transform-3d rotate-x-12 hover-glow animate-bounce-soft"></div>
            <div className="absolute bottom-20 left-2/3 w-12 h-12 bg-accent/11 rounded-full animate-float-slow transform-3d hover-glow animate-rotate-3d"></div>
            <div className="absolute top-1/3 left-1/4 w-8 h-8 bg-accent/15 rounded-full animate-float transform-3d hover-glow animate-shimmer"></div>
            <div className="absolute bottom-8 right-1/4 w-18 h-18 bg-accent/6 rounded-full animate-float-delayed transform-3d hover-glow animate-pulse-3d"></div>
          </div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="book-container inline-block">
                <div className="book-cover px-8 py-4 animate-book-open">
                  <h2 className="font-montserrat font-bold text-3xl sm:text-4xl text-white mb-4">Achievements</h2>
                  <div className="w-20 h-1 bg-white/80 mx-auto animate-gradient-shift"></div>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              {certifications.map((cert, index) => (
                <ScrollReveal key={cert.name} delay={index * 200}>
                  <div className="book-container">
                    <div className="book-page p-6 hover:shadow-lg transition-all duration-300 hover:scale-110 hover-lift transform-3d hover:rotate-y-3 animate-book-shadow group">
                      <div className="flex items-center mb-4">
                        <cert.icon className="w-8 h-8 text-accent mr-3 animate-scale-pulse" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{cert.name}</h3>
                          <p className="text-base text-muted-foreground mb-2">
                            Awarded by <span className="font-semibold">{cert.issuer}</span> in {cert.year}
                          </p>
                        </div>
                      </div>
                      {cert.link && (
                        <MagneticButton
                          variant="outline"
                          size="sm"
                          className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
                          onClick={() => window.open(cert.link, "_blank")}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Certificate
                        </MagneticButton>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="activities" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 relative overflow-hidden">
          {/* 3D Background Elements for Activities Section */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-22 left-1/6 w-18 h-18 bg-accent/7 rounded-full animate-float transform-3d rotate-y-12 hover-glow animate-pulse-3d"></div>
            <div className="absolute top-60 right-1/5 w-12 h-12 bg-accent/9 rounded-full animate-float-delayed transform-3d rotate-x-12 hover-glow animate-bounce-soft"></div>
            <div className="absolute bottom-24 left-1/2 w-16 h-16 bg-accent/8 rounded-full animate-float-slow transform-3d hover-glow animate-rotate-3d"></div>
            <div className="absolute top-2/3 right-1/6 w-10 h-10 bg-accent/12 rounded-full animate-float transform-3d hover-glow animate-shimmer"></div>
            <div className="absolute bottom-10 right-1/3 w-14 h-14 bg-accent/6 rounded-full animate-float-delayed transform-3d hover-glow animate-pulse-3d"></div>
          </div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="book-container inline-block">
                <div className="book-cover px-8 py-4 animate-book-open">
                  <h2 className="font-montserrat font-bold text-3xl sm:text-4xl text-white mb-4">
                    Co-Curricular Activities
                  </h2>
                  <div className="w-20 h-1 bg-white/80 mx-auto animate-gradient-shift"></div>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              {activities.map((activity, index) => (
                <ScrollReveal key={activity.title} delay={index * 100}>
                  <div className="book-container">
                    <div className="book-page p-6 hover:shadow-lg transition-all duration-300 hover:scale-110 hover-lift transform-3d hover:rotate-y-3 animate-book-shadow group">
                      <CardHeader>
                        <CardTitle className="text-xl">{activity.title}</CardTitle>
                        <CardDescription className="text-base leading-relaxed">
                          <span className="font-semibold">{activity.organization}</span> - {activity.period}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-lg text-muted-foreground">{activity.description}</p>
                      </CardContent>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 relative overflow-hidden">
          <Suspense fallback={null}>
            <Contact3DScene />
          </Suspense>
          {/* 3D Background Elements for Contact Section */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-24 left-1/4 w-16 h-16 bg-accent/8 rounded-full animate-float transform-3d rotate-y-12 hover-glow animate-pulse-3d"></div>
            <div className="absolute top-64 right-1/4 w-12 h-12 bg-accent/6 rounded-full animate-float-delayed transform-3d rotate-x-12 hover-glow animate-bounce-soft"></div>
            <div className="absolute bottom-28 left-1/3 w-14 h-14 bg-accent/10 rounded-full animate-float-slow transform-3d hover-glow animate-rotate-3d"></div>
            <div className="absolute top-1/2 right-1/5 w-10 h-10 bg-accent/12 rounded-full animate-float transform-3d hover-glow animate-shimmer"></div>
            <div className="absolute bottom-12 right-1/3 w-18 h-18 bg-accent/7 rounded-full animate-float-delayed transform-3d hover-glow animate-pulse-3d"></div>
          </div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="book-container inline-block">
                <div className="book-cover px-8 py-4 animate-book-open">
                  <h2 className="font-montserrat font-bold text-3xl sm:text-4xl text-white mb-4">Get In Touch</h2>
                  <div className="w-20 h-1 bg-white/80 mx-auto animate-gradient-shift"></div>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-semibold text-xl mb-6">Let's Connect</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  I'm always interested in discussing new opportunities, collaborations, or just chatting about data
                  science and analytics. Feel free to reach out!
                </p>
                <div className="space-y-4">
                  <div className="flex items-center hover-glow p-2 rounded transition-all duration-300 transform-3d hover:rotate-y-1 hover:scale-105">
                    <Mail className="w-5 h-5 text-accent mr-3 animate-scale-pulse" />
                    <span>saurabhks102@gmail.com</span>
                  </div>
                  <div className="flex items-center hover-glow p-2 rounded transition-all duration-300 transform-3d hover:rotate-y-1 hover:scale-105">
                    <Phone className="w-5 h-5 text-accent mr-3 animate-scale-pulse" />
                    <span>9380328640 / 9973705441</span>
                  </div>
                  <div className="flex items-center hover-glow p-2 rounded transition-all duration-300 transform-3d hover:rotate-y-1 hover:scale-105">
                    <MapPin className="w-5 h-5 text-accent mr-3 animate-scale-pulse" />
                    <span>Bengaluru, India</span>
                  </div>
                </div>
                <div className="flex space-x-4 mt-8">
                  <MagneticButton
                    variant="outline"
                    size="icon"
                    className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
                    onClick={() => window.open("https://github.com/saurabh16-24", "_blank")}
                  >
                    <Github className="w-5 h-5" />
                  </MagneticButton>
                  <MagneticButton
                    variant="outline"
                    size="icon"
                    className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
                    onClick={() => window.open("https://linkedin.com/in/saurabh-singh", "_blank")}
                  >
                    <Linkedin className="w-5 h-5" />
                  </MagneticButton>
                  <MagneticButton
                    variant="outline"
                    size="icon"
                    className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
                    onClick={() => window.open("mailto:saurabhks102@gmail.com", "_blank")}
                  >
                    <Mail className="w-5 h-5" />
                  </MagneticButton>
                </div>
              </div>
              <div className="book-container">
                <div className="book-page p-6 glass hover-glow transform-3d hover:rotate-y-2 transition-all duration-300 animate-book-shadow">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your Name" 
                        className="border-accent/20 focus:border-accent hover-glow" 
                        required
                      />
                    </div>
                    <div>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Your Email"
                        className="border-accent/20 focus:border-accent hover-glow"
                        required
                      />
                    </div>
                    <div>
                      <Input 
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Subject" 
                        className="border-accent/20 focus:border-accent hover-glow" 
                        required
                      />
                    </div>
                    <div>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Your Message"
                        rows={5}
                        className="border-accent/20 focus:border-accent resize-none hover-glow"
                        required
                      />
                    </div>
                    <MagneticButton 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </MagneticButton>
                    
                    {submitStatus === 'success' && (
                      <div className="text-green-600 text-sm text-center animate-fade-in-up">
                        Message sent successfully! I'll get back to you soon.
                      </div>
                    )}
                    
                    {submitStatus === 'error' && (
                      <div className="text-red-600 text-sm text-center animate-fade-in-up">
                        Failed to send message. Please try again or contact me directly.
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border glass">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">© 2024 Saurabh Kumar Singh. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
