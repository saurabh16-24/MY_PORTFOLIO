"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Environment, Box } from "@react-three/drei"
import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

function AnimatedSphere({
  position,
  color,
  size = 1,
}: { position: [number, number, number]; color: string; size?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[size, 100, 200]} position={position}>
        <MeshDistortMaterial color={color} attach="material" distort={0.3} speed={1.5} roughness={0.4} />
      </Sphere>
    </Float>
  )
}

function DataVisualization() {
  const groupRef = useRef<THREE.Group>(null)

  // Pre-generate positions to avoid hydration mismatch
  const nodeData = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      key: i,
      speed: 1 + (i * 0.1) % 1, // Deterministic speed based on index
      position: [
        ((i * 37) % 100 - 50) / 6.25, // Deterministic position based on index
        ((i * 73) % 100 - 50) / 6.25,
        ((i * 19) % 100 - 50) / 6.25,
      ] as [number, number, number]
    })), []
  )

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Data nodes */}
      {nodeData.map((node) => (
        <Float key={node.key} speed={node.speed} rotationIntensity={0.5} floatIntensity={1}>
          <Sphere
            args={[0.1, 16, 16]}
            position={node.position}
          >
            <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.2} />
          </Sphere>
        </Float>
      ))}
    </group>
  )
}

export function Hero3DScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#10b981" />

        <AnimatedSphere position={[-4, 2, -2]} color="#10b981" size={1.2} />
        <AnimatedSphere position={[4, -2, -1]} color="#6b7280" size={0.8} />
        <AnimatedSphere position={[2, 3, -3]} color="#ffffff" size={0.6} />

        <DataVisualization />

        <Environment preset="city" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}

export function Skills3DScene() {
  return (
    <div className="absolute inset-0 -z-10 opacity-30">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.8} />

        {/* Floating code symbols */}
        <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
          <Box args={[0.8, 0.8, 0.2]} position={[-2, 1, 0]}>
            <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.2} />
          </Box>
        </Float>

        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.5}>
          <Sphere args={[0.4, 16, 16]} position={[2, -1, -1]}>
            <meshStandardMaterial color="#6b7280" emissive="#6b7280" emissiveIntensity={0.1} />
          </Sphere>
        </Float>

        <Float speed={0.8} rotationIntensity={0.4} floatIntensity={0.8}>
          <Box args={[0.6, 0.6, 0.3]} position={[0, -2, 1]}>
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.1} />
          </Box>
        </Float>

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />
      </Canvas>
    </div>
  )
}

export function Contact3DScene() {
  // Pre-generate network node data to avoid hydration mismatch
  const networkNodes = useMemo(() =>
    Array.from({ length: 15 }, (_, i) => ({
      key: i,
      speed: 0.5 + (i * 0.05) % 0.5, // Deterministic speed
      position: [
        ((i * 41) % 100 - 50) / 8.33, // Deterministic position based on index
        ((i * 67) % 100 - 50) / 8.33,
        ((i * 23) % 100 - 50) / 16.67,
      ] as [number, number, number]
    })), []
  )

  return (
    <div className="absolute inset-0 -z-10 opacity-20">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[3, 3, 3]} intensity={0.6} />

        {/* Network connections */}
        {networkNodes.map((node) => (
          <Float key={node.key} speed={node.speed} rotationIntensity={0.2} floatIntensity={0.5}>
            <Sphere
              args={[0.05, 8, 8]}
              position={node.position}
            >
              <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.3} />
            </Sphere>
          </Float>
        ))}

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
      </Canvas>
    </div>
  )
}
