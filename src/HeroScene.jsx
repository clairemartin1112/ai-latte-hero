import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function LatteArt() {
  return <group position={[0, 0.5, 0]}>
    <mesh rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[0.78, 64]} /><meshStandardMaterial color="#a96b40" roughness={0.58} /></mesh>
    {Array.from({ length: 10 }, (_, index) => {
      const angle = (index / 10) * Math.PI * 2
      return <mesh key={index} position={[Math.cos(angle) * 0.31, 0.055, Math.sin(angle) * 0.31]} rotation={[-Math.PI / 2, 0, -angle]}><sphereGeometry args={[0.19, 24, 24]} /><meshStandardMaterial color="#fffdf8" roughness={0.43} /></mesh>
    })}
    <mesh position={[0, 0.08, 0]} scale={[0.5, 0.19, 0.5]}><sphereGeometry args={[1, 32, 32]} /><meshStandardMaterial color="#fffdf8" roughness={0.45} /></mesh>
  </group>
}

function CoffeeCup() {
  const cup = useRef(); const ring = useRef()
  useFrame((state, delta) => { cup.current.rotation.y += delta * 0.24; cup.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.6) * 0.04 - 0.13; ring.current.rotation.z -= delta * 0.32 })
  return <group ref={cup} position={[0.2, -0.55, 0]} rotation={[-0.13, -0.3, 0]}>
    <mesh castShadow receiveShadow><cylinderGeometry args={[1.02, 0.84, 1.15, 64, 1, true]} /><meshStandardMaterial color="#f7f2e9" roughness={0.27} metalness={0.04} side={THREE.DoubleSide} /></mesh>
    <mesh position={[0, 0.58, 0]}><torusGeometry args={[0.98, 0.085, 20, 64]} /><meshStandardMaterial color="#fffaf1" roughness={0.22} /></mesh>
    <LatteArt />
    <mesh position={[1.0, -0.05, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.37, 0.1, 20, 48]} /><meshStandardMaterial color="#f7f2e9" roughness={0.25} /></mesh>
    <group ref={ring} position={[0, 0.58, 0]}>{[1.25, 1.48, 1.72].map((radius, index) => <mesh key={radius} rotation={[-Math.PI / 2, 0, index * 0.72]}><torusGeometry args={[radius, 0.012, 10, 96]} /><meshStandardMaterial color="#78a7c0" emissive="#547f9c" emissiveIntensity={0.9} transparent opacity={0.5 - index * 0.1} /></mesh>)}</group>
  </group>
}

export default function HeroScene() {
  return <Canvas dpr={[1, 1.75]} camera={{ position: [0, 1.15, 5], fov: 42 }} gl={{ antialias: true, alpha: true }}>
    <ambientLight intensity={1.55} /><directionalLight position={[3, 5, 4]} intensity={2.1} color="#fff4e5" castShadow /><pointLight position={[-3, 1, 2]} intensity={1.8} color="#8bb5cc" />
    <Float speed={1.35} rotationIntensity={0.14} floatIntensity={0.38}><CoffeeCup /></Float><Sparkles count={44} scale={[5, 4, 2]} size={2.2} speed={0.22} color="#dff5ff" /><ContactShadows position={[0, -1.25, 0]} opacity={0.33} scale={4.8} blur={2.2} far={4} color="#46677b" />
  </Canvas>
}
