"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Environment, Box, Points, PointMaterial } from "@react-three/drei"
import { useRef, useMemo, useState, useEffect } from "react"
import * as THREE from "three"

function DataSphere({ count = 2000 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 3
      // Deterministic random-like values
      const theta = ((i * 13.5) % 360) * (Math.PI / 180)
      const phi = ((i * 17.2) % 360) * (Math.PI / 180)

      const x = r * Math.sin(theta) * Math.cos(phi)
      const y = r * Math.sin(theta) * Math.sin(phi)
      const z = r * Math.cos(theta)

      p[i * 3] = x
      p[i * 3 + 1] = y
      p[i * 3 + 2] = z
    }
    return p
  }, [count])

  const ref = useRef<THREE.Points>(null!)

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10
      ref.current.rotation.y -= delta / 15
    }
  })

  return (
    <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#10b981"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  )

}


function BinaryBlock({ position, text }: { position: [number, number, number], text: string }) {
  // Note: Creating actual 3D text might be heavy, using abstract boxes for now representing data packets
  const meshRef = useRef<THREE.Mesh>(null!)
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <Box ref={meshRef} args={[0.5, 0.5, 0.5]} position={position}>
        <meshStandardMaterial color="#06b6d4" wireframe />
      </Box>
    </Float>
  )
}

export function Hero3DScene() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, isMobile ? 12 : 8], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#10b981" />

        <DataSphere />

        <BinaryBlock position={[-3, 2, -2]} text="1" />
        <BinaryBlock position={[3, -2, -1]} text="0" />
        <BinaryBlock position={[2, 3, -3]} text="1" />

        <Environment preset="city" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}

export function Skills3DScene() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <div className="absolute inset-0 -z-10 opacity-30">
      <Canvas camera={{ position: [0, 0, isMobile ? 10 : 8], fov: 50 }}>
        <ambientLight intensity={0.5} />

        {/* Abstract Data Structures */}
        <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
          <mesh position={isMobile ? [0, 2, 0] : [-2, 0, 0]}>
            <icosahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#10b981" wireframe />
          </mesh>
        </Float>

        <Float speed={1} rotationIntensity={1} floatIntensity={1}>
          <mesh position={isMobile ? [0, -2, 0] : [2, 1, -1]}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#06b6d4" wireframe />
          </mesh>
        </Float>

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}

export function Contact3DScene() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const nodes = useMemo(() =>
    Array.from({ length: isMobile ? 6 : 10 }, (_, i) => {
      // Deterministic random-like distribution
      const x = ((i * 7.5 + 3) % 10) - 5
      const y = ((i * 3.2 + 1) % 10) - 5
      const z = ((i * 5.7 + 2) % 5) - 2.5
      return {
        pos: [x, y, z] as [number, number, number],
        key: i
      }
    })
    , [isMobile])

  return (
    <div className="absolute inset-0 -z-10 opacity-20">
      <Canvas camera={{ position: [0, 0, isMobile ? 9 : 6], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} />

        {nodes.map((node) => (
          <Float key={node.key} speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
            <Sphere args={[0.1, 8, 8]} position={node.pos}>
              <meshStandardMaterial color="#10b981" emissive="#10b981" />
            </Sphere>
          </Float>
        ))}

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
      </Canvas>
    </div>
  )
}
