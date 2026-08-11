import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, Float, Lightformer, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

/**
 * The Gaze Optics 3D centerpiece — a stylized pair of round glasses
 * in champagne gold with glass lenses, floating above a soft shadow.
 *
 * Built entirely from primitives: no external models or textures,
 * so it works offline. Reflections come from Lightformers rendered
 * into a local environment map (no network HDR downloads).
 */

function Glasses({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null)

  // Gentle mouse parallax — the glasses "look" at the cursor.
  useFrame((state) => {
    if (reduced || !group.current) return
    const g = group.current
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, state.pointer.x * 0.45, 0.06)
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -state.pointer.y * 0.28, 0.06)
  })

  const groupNode = (
    <group ref={group} scale={1.05}>
      {/* Lens glass (transmission material) */}
      {[-1.12, 1.12].map((x) => (
        <mesh key={x} position={[x, 0, 0]}>
          <circleGeometry args={[0.97, 64]} />
          <meshPhysicalMaterial
            transmission={1}
            thickness={0.7}
            roughness={0.06}
            ior={1.5}
            clearcoat={1}
            clearcoatRoughness={0.12}
            color="#f6efe0"
          />
        </mesh>
      ))}

      {/* Champagne-gold rims */}
      {[-1.12, 1.12].map((x) => (
        <mesh key={x} position={[x, 0, 0]}>
          <torusGeometry args={[0.99, 0.05, 24, 96]} />
          <meshStandardMaterial color="#c9a24b" metalness={1} roughness={0.24} envMapIntensity={1.3} />
        </mesh>
      ))}

      {/* Bridge */}
      <mesh position={[0, 0.98, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 2.28, 20]} />
        <meshStandardMaterial color="#c9a24b" metalness={1} roughness={0.24} envMapIntensity={1.3} />
      </mesh>

      {/* Temples — slight outward flare + gentle droop */}
      <mesh position={[-1.72, -0.2, -1.15]} rotation={[0, 0.3, -0.08]}>
        <boxGeometry args={[0.1, 0.045, 2.4]} />
        <meshStandardMaterial color="#b8963f" metalness={1} roughness={0.28} envMapIntensity={1.2} />
      </mesh>
      <mesh position={[1.72, -0.2, -1.15]} rotation={[0, -0.3, -0.08]}>
        <boxGeometry args={[0.1, 0.045, 2.4]} />
        <meshStandardMaterial color="#b8963f" metalness={1} roughness={0.28} envMapIntensity={1.2} />
      </mesh>
    </group>
  )

  return reduced ? groupNode : <Float speed={1.7} rotationIntensity={0.3} floatIntensity={0.7}>{groupNode}</Float>
}

export default function Scene3D({ reduced }: { reduced: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.15, 5.6], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
      aria-label="Floating gold glasses"
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 4]} intensity={0.9} color="#fff6e5" />

      {/* Soft ivory backdrop so the glass lenses have something to transmit */}
      <mesh position={[0, 0, -3]}>      
        <planeGeometry args={[30, 30]} />
        <meshBasicMaterial color="#f2eee6" />
      </mesh>

      <Glasses reduced={reduced} />

      {!reduced && (
        <>
          {/* Faint gold orbit ring for depth */}
          <mesh position={[0, 0.1, -1.9]} rotation={[0.55, 0.35, 0]}>
            <torusGeometry args={[2.35, 0.014, 8, 120]} />
            <meshStandardMaterial color="#c9a24b" metalness={1} roughness={0.4} transparent opacity={0.32} />
          </mesh>
          <Sparkles count={55} scale={[7, 5, 3]} size={1.6} speed={0.25} opacity={0.4} color="#c9a24b" />
        </>
      )}

      <ContactShadows position={[0, -2.5, 0]} opacity={0.32} scale={9.5} blur={2.3} far={3.4} resolution={256} color="#2b2419" />

      {/* Studio lighting baked into a local environment map — no network HDRs */}
      <Environment resolution={256}>
        <Lightformer intensity={1.4} position={[0, 4, 4]} scale={[10, 6, 1]} color="#fffaf0" />
        <Lightformer intensity={0.7} position={[-5, 0, 3]} scale={[6, 8, 1]} color="#e9d5ac" />
        <Lightformer intensity={0.5} position={[5, -2, 2]} scale={[6, 8, 1]} color="#ffffff" />
      </Environment>
    </Canvas>
  )
}
